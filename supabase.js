const SUPABASE_URL = "https://skllwkaweqapijcrsfgq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lyAp6rSGT0FxPpIKfA49HQ_VqYq4rlx";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =========================================================
// Supabase Data Fetching & Sync
// =========================================================

// 1. Fetch a student only after both login credentials match.
async function fetchStudentByUsername(username, secretCode) {
  const cleanUsername = username.trim().toLowerCase();

  const { data: profile, error } = await db
    .from("profiles")
    .select("id, username, cumulative_points")
    .ilike("username", cleanUsername)
    .eq("secret_code", secretCode)
    .eq("status", true)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  // Query relational tables in parallel
  const [levelsRes, purchasesRes, historyRes] = await Promise.all([
    db.from("user_subtopic_levels").select("*").eq("user_id", profile.id),
    db
      .from("purchases")
      .select("*")
      .eq("user_id", profile.id)
      .order("purchased_at", { ascending: true }),
    db
      .from("points_history")
      .select("*")
      .eq("user_id", profile.id)
      .order("recorded_at", { ascending: true }),
  ]);

  // Rebuild the in-memory subtopicProgress structure
  const subtopicProgress = {};
  (levelsRes.data || []).forEach((row) => {
    if (!subtopicProgress[row.subtopic_id]) {
      subtopicProgress[row.subtopic_id] = {
        currentLevel: row.current_level,
        levelStats: {},
      };
    }
    // Update highest currentLevel if varied
    if (row.current_level > subtopicProgress[row.subtopic_id].currentLevel) {
      subtopicProgress[row.subtopic_id].currentLevel = row.current_level;
    }
    subtopicProgress[row.subtopic_id].levelStats[row.level_number] = {
      previousTime: row.previous_time ? parseFloat(row.previous_time) : null,
      bestTime: row.best_time ? parseFloat(row.best_time) : null,
      attempts: row.attempts || 0,
    };
  });

  return {
    id: profile.id,
    code: profile.username,
    cumulativePoints: profile.cumulative_points || 0,
    purchases: (purchasesRes.data || []).map((p) => ({
      itemId: p.item_id,
      name: p.name,
      cost: p.cost,
      timestamp: new Date(p.purchased_at).getTime(),
    })),
    subtopicProgress: subtopicProgress,
    pointsHistory: (historyRes.data || []).map((h) => ({
      timestamp: new Date(h.recorded_at).getTime(),
      points: h.points,
    })),
  };
}

// 2. Save progress after a round
async function syncRoundToSupabase(
  student,
  subtopicKey,
  levelIdx,
  elapsed,
  newBestTime,
  roundPts,
  currentLevel,
) {
  // Update cumulative points on profiles
  await db
    .from("profiles")
    .update({ cumulative_points: Math.round(student.cumulativePoints) })
    .eq("id", student.id);

  // Insert point history record
  await db.from("points_history").insert({
    user_id: student.id,
    points: Math.round(student.cumulativePoints),
    recorded_at: new Date().toISOString(),
  });

  // Upsert user subtopic levels
  const progress = student.subtopicProgress[subtopicKey];
  const stat = progress.levelStats[levelIdx];

  await db.from("user_subtopic_levels").upsert(
    {
      user_id: student.id,
      subtopic_id: subtopicKey,
      level_number: levelIdx,
      current_level: currentLevel,
      previous_time: elapsed,
      best_time: newBestTime,
      attempts: stat.attempts,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,subtopic_id,level_number" },
  );
}

// 3. Record purchases in Supabase
async function syncPurchaseToSupabase(student, item) {
  // Deduct points on profile
  await db
    .from("profiles")
    .update({ cumulative_points: Math.round(student.cumulativePoints) })
    .eq("id", student.id);

  // Insert purchase entry
  await db.from("purchases").insert({
    user_id: student.id,
    item_id: item.id,
    name: item.name,
    cost: item.cost,
    purchased_at: new Date().toISOString(),
  });
}

// 4. Fetch all profiles from Supabase
async function fetchAllProfiles() {
  const { data, error } = await db
    .from("profiles")
    .select(
      "id, created_at, cumulative_points, monthly_spend_limit, secret_code, status, username",
    );
  if (error) throw new Error(error.message);
  return data;
}

// 5. Add new profiles to Supabase
async function addProfiles(profiles) {
  const { data, error } = await db.from("profiles").insert(profiles);
  if (error) throw new Error(error.message);
  return data;
}

// 6. delete a profile from Supabase
async function deleteProfile(profileId) {
  const { data, error } = await db
    .from("profiles")
    .delete()
    .eq("id", profileId)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data)
    throw new Error("Student profile was not found or could not be deleted.");
  return data;
}

// 7. Update a secret code in Supabase
async function updateSecretCode(profileId, newSecretCode) {
  const { data, error } = await db
    .from("profiles")
    .update({ secret_code: newSecretCode })
    .eq("id", profileId)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data)
    throw new Error("Student profile was not found or could not be updated.");
  return data;
}

// 8. Update a monthly spend limit in Supabase
async function updateMonthlySpendLimit(profileId, newLimit) {
  const { data, error } = await db
    .from("profiles")
    .update({ monthly_spend_limit: newLimit })
    .eq("id", profileId)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data)
    throw new Error("Student profile was not found or could not be updated.");
  return data;
}

//9. Update a profile's status in Supabase
async function updateProfileStatus(profileId, newStatus) {
  const { data, error } = await db
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", profileId)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data)
    throw new Error("Student profile was not found or could not be updated.");
  return data;
}
