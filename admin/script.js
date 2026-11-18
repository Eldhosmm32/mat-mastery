// ===== DEMO PREVIEW: profile additions, updates, and deletions are saved =====
const BACKEND_URL = "demo";
window.mmAdminDemoReady = (async function () {
  const profiles = await fetchAllProfiles();
  const day = 864e5,
    now = Date.now(),
    mk = (n) => new Date(now - n * day).toISOString();
  const toKid = (profile) => ({
    key: profile.id,
    name: profile.username,
    code: profile.secret_code,
    active: profile.status === true,
    earned: Number(profile.cumulative_points) || 0,
    limit: Number(profile.monthly_spend_limit) || 0,
    created: profile.created_at,
  });
  const kids = profiles.map(toKid);
  const R = (id, child, item, cost, value, status, ago) => ({
    id,
    child,
    itemName: item,
    itemId: id,
    cost,
    value,
    status,
    timestamp: mk(ago),
    handledAt: "",
  });
  const reqs = [
    R("a1", "amelia", "Children's book voucher", 5000, "£5", "Pending", 0),
    R("a2", "sophia", "LEGO or toy gift", 8000, "£8", "Pending", 0),
    R("a3", "isla", "Happy Meal treat", 6000, "£6", "Pending", 1),
    R("a4", "oliver", "Smyths toy voucher", 5000, "£5", "Approved", 2),
    R("a5", "noah", "Small surprise toy", 3000, "£3", "Fulfilled", 3),
    R("a6", "sophia", "Big toy surprise", 10000, "£10", "Fulfilled", 4),
    R("a7", "leo", "Happy Meal treat", 6000, "£6", "Declined", 5),
    R("a8", "mia", "Small surprise toy", 3000, "£3", "Fulfilled", 45),
  ];
  const thisMonth = (d) => {
    const a = new Date(d),
      b = new Date();
    return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  };
  function list() {
    const children = kids.map((k) => {
      const mine = reqs.filter(
        (r) => r.child === k.key && r.status !== "Declined",
      );
      const spent = mine.reduce((s, r) => s + r.cost, 0),
        month = mine
          .filter((r) => thisMonth(r.timestamp))
          .reduce((s, r) => s + r.cost, 0);
      return {
        key: k.key,
        name: k.name,
        code: k.code,
        created: k.created,
        active: k.active,
        earned: k.earned,
        spent: spent,
        balance: k.earned - spent,
        monthSpent: month,
        limit: k.limit,
      };
    });
    const names = {};
    kids.forEach((k) => (names[k.key] = k.name));
    return {
      ok: true,
      children: children,
      requests: reqs
        .map((r) =>
          Object.assign({}, r, { childName: names[r.child] || r.child }),
        )
        .reverse(),
      month: new Date().toISOString().slice(0, 7),
    };
  }
  const nativeFetch = window.fetch.bind(window);
  window.fetch = function (u, o) {
    if (u !== BACKEND_URL) return nativeFetch(u, o);
    const q = JSON.parse(o.body);
    let r = { ok: true };
    if (q.action === "admin_list") {
      return fetchAllProfiles().then((currentProfiles) => {
        kids.splice(0, kids.length, ...currentProfiles.map(toKid));
        return { json: () => Promise.resolve(list()) };
      });
    } else if (q.action === "admin_update") {
      const x = reqs.find((v) => v.id === q.id);
      if (x) x.status = q.status;
    }
    return Promise.resolve({ json: () => Promise.resolve(r) });
  };
  window.addEventListener("DOMContentLoaded", () => {
    const b = document.createElement("div");
    b.textContent =
      "Demo preview \u2013 profile additions, updates, and deletions are saved; reward-request changes are temporary";
    b.style.cssText =
      "position:fixed;right:16px;bottom:16px;background:#1e2a3b;color:#fff;padding:8px 14px;border-radius:99px;font:600 12px system-ui;opacity:.9;z-index:99;pointer-events:none";
    document.body.appendChild(b);
  });
})();

(function () {
  const root = document.getElementById("root");
  sessionStorage.removeItem("mm_admin_pw");
  let pw = "",
    data = null,
    view = "students",
    err = "",
    seen = null;
  let q = "",
    sf = "All",
    sortKey = "name",
    sortDir = 1,
    rf = "Pending",
    showCodes = false,
    showAdd = false,
    last = "";
  let toastTimer;
  const notify = (message, type) => {
    let toast = document.getElementById("adminToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "adminToast";
      document.body.appendChild(toast);
    }
    toast.className = "admin-toast " + (type || "success");
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.setAttribute("aria-live", type === "error" ? "assertive" : "polite");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
  };
  const esc = (s) =>
    String(s == null ? "" : s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const fmt = (n) => Number(n || 0).toLocaleString();
  const api = (action, p) =>
    Promise.resolve(window.mmAdminDemoReady)
      .then(() =>
        fetch(BACKEND_URL, {
          method: "POST",
          body: JSON.stringify(
            Object.assign({ action, password: pw }, p || {}),
          ),
        }),
      )
      .then((r) => r.json());
  const saveProfiles = async (profiles) => {
    try {
      await addProfiles(profiles);
      showAdd = false;
      last = "";
      await load();
      return true;
    } catch (error) {
      notify(
        "Could not add student(s): " +
          (error && error.message ? error.message : String(error)),
        "error",
      );
      return false;
    }
  };
  const refreshAfterProfileUpdate = async (
    update,
    errorLabel,
    successMessage,
  ) => {
    let error = null;
    try {
      await update;
    } catch (e) {
      error = e;
    }
    if (document.activeElement) document.activeElement.blur();
    last = "";
    await load();
    if (error) {
      notify(
        errorLabel +
          ": " +
          (error && error.message ? error.message : String(error)),
        "error",
      );
    } else notify(successMessage);
  };
  const updateAllMonthlySpendLimits = async (limit) => {
    const results = await Promise.allSettled(
      data.children.map((student) =>
        updateMonthlySpendLimit(student.key, limit),
      ),
    );
    const failed = results.filter((result) => result.status === "rejected");
    last = "";
    await load();
    if (failed.length) {
      const firstError = failed[0].reason;
      notify(
        "Could not update the monthly spend limit for " +
          failed.length +
          " of " +
          results.length +
          " students. " +
          (firstError && firstError.message
            ? firstError.message
            : String(firstError)),
        "error",
      );
    } else
      notify(
        "Monthly spend limits updated for " + results.length + " students.",
      );
  };
  const animals = [
    "tiger",
    "panda",
    "koala",
    "rocket",
    "dolphin",
    "falcon",
    "otter",
    "comet",
    "lion",
    "owl",
    "fox",
    "star",
  ];
  const genCode = () =>
    animals[Math.floor(Math.random() * animals.length)] +
    (10 + Math.floor(Math.random() * 90));
  function beep() {
    try {
      const c = new (window.AudioContext || window.webkitAudioContext)(),
        o = c.createOscillator(),
        g = c.createGain();
      o.connect(g);
      g.connect(c.destination);
      o.frequency.value = 880;
      g.gain.value = 0.15;
      o.start();
      o.stop(c.currentTime + 0.25);
    } catch (e) {}
  }
  const typing = () => {
    const a = document.activeElement;
    return (
      a &&
      (a.tagName === "INPUT" || a.tagName === "TEXTAREA") &&
      a.type !== "checkbox"
    );
  };

  function load() {
    if (!BACKEND_URL) {
      root.innerHTML =
        '<div class="panel login">Set <b>BACKEND_URL</b> at the top of this file first (see SETUP.md).</div>';
      return Promise.resolve();
    }
    return api("admin_list")
      .then((res) => {
        if (!res.ok) {
          if (res.error === "badadmin") {
            pw = "";
            err = "Wrong password.";
          } else err = "Could not connect.";
          data = null;
          draw();
          return;
        }
        const pend = res.requests.filter((r) => r.status === "Pending");
        document.title =
          (pend.length ? "(" + pend.length + ") " : "") + "Mastery Admin";
        if (seen) {
          const fresh = pend.filter((r) => !seen.has(r.id));
          if (fresh.length) {
            beep();
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            )
              new Notification("New reward request", {
                body: fresh
                  .map((r) => r.childName + ": " + r.itemName)
                  .join(", "),
              });
          }
        }
        seen = new Set(pend.map((r) => r.id));
        const sig = JSON.stringify(res);
        const changed = sig !== last;
        last = sig;
        data = res;
        err = "";
        if (changed && !typing()) draw();
      })
      .catch(() => {
        err = "Could not connect.";
        draw();
      });
  }
  const act = (action, p) =>
    api(action, p).then((r) => {
      if (!r.ok)
        notify("Something went wrong: " + (r.error || "unknown"), "error");
      else if (action === "admin_update")
        notify("Reward request " + p.status.toLowerCase() + ".");
      last = "";
      return load();
    });

  function sortedKids() {
    let k = data.children.filter(
      (c) =>
        (sf === "All" || (sf === "Active") === c.active) &&
        (!q || c.name.toLowerCase().includes(q.toLowerCase())),
    );
    return k.sort((a, b) => {
      let x = a[sortKey],
        y = b[sortKey];
      if (typeof x === "string") return x.localeCompare(y) * sortDir;
      return ((x || 0) - (y || 0)) * sortDir;
    });
  }
  const th = (k, l, num) =>
    '<th class="sort' +
    (num ? " num" : "") +
    '" data-sort="' +
    k +
    '">' +
    l +
    (sortKey === k ? (sortDir > 0 ? " ▲" : " ▼") : "") +
    "</th>";

  function studentsView() {
    const kids = data.children,
      act_ = kids.filter((c) => c.active).length;
    const tEarn = kids.reduce((s, c) => s + c.earned, 0),
      tSpent = kids.reduce((s, c) => s + c.spent, 0);
    let h =
      '<h2>Students</h2><div class="cards">' +
      '<div class="stat"><div class="n">' +
      act_ +
      ' <span class="muted" style="font-size:15px">/ ' +
      kids.length +
      '</span></div><div class="l">Active students</div></div>' +
      '<div class="stat"><div class="n">' +
      fmt(tEarn) +
      '</div><div class="l">Points earned (all)</div></div>' +
      '<div class="stat"><div class="n">' +
      fmt(tSpent) +
      '</div><div class="l">Points spent (all)</div></div>' +
      '<div class="stat"><div class="n">' +
      data.requests.filter((r) => r.status === "Pending").length +
      '</div><div class="l">Pending requests</div></div></div>';
    h +=
      '<div class="panel"><div class="toolbar"><input id="q" placeholder="Search username…" value="' +
      esc(q) +
      '" style="width:220px">' +
      '<div class="pills">' +
      ["All", "Active", "Inactive"]
        .map(
          (f) =>
            '<button class="' +
            (sf === f ? "on" : "") +
            '" data-sf="' +
            f +
            '">' +
            f +
            "</button>",
        )
        .join("") +
      "</div>" +
      '<label class="muted"><input type="checkbox" id="showc" ' +
      (showCodes ? "checked" : "") +
      '> Show secret codes</label><div class="sp"></div>' +
      '<span class="muted">Limit for all:</span><input id="allLimit" type="number" min="0" placeholder="points" class="limit"><button class="s" id="allBtn">Apply</button>' +
      '<button class="p" id="addToggle">' +
      (showAdd ? "Close" : "+ Add students") +
      "</button></div>";
    if (showAdd)
      h +=
        '<div class="grid2" style="margin-bottom:14px;padding:14px;background:var(--bg);border-radius:10px"><div><b>Add one student</b><div class="toolbar" style="margin-top:8px">' +
        '<input id="nn" placeholder="Username"><input id="nc" placeholder="Secret code" style="width:130px"><button class="s" id="gen">Generate</button>' +
        '<input id="nl" type="number" min="0" placeholder="Monthly limit" class="limit" style="width:120px"><button class="p" id="addOne">Add</button></div></div>' +
        '<div><b>Add many</b> <span class="muted">(username, secret code, limit — one per line, limit optional)</span><textarea id="bulk" rows="3" style="width:100%;margin-top:8px" placeholder="Amelia, tiger23, 5000&#10;Oliver, rocket9"></textarea><button class="p" id="addMany" style="margin-top:8px">Add all</button></div></div>';
    const list = sortedKids();
    h +=
      '<div class="tbl-wrap"><table><tr>' +
      th("name", "Username") +
      "<th>Secret code</th>" +
      th("earned", "Earned", 1) +
      th("spent", "Spent", 1) +
      th("balance", "Balance", 1) +
      th("monthSpent", "This month", 1) +
      '<th class="num">Monthly spend limit</th><th>Active</th><th></th></tr>';
    h += list.length
      ? list
          .map((c) => {
            const pct =
              c.limit > 0
                ? Math.min(100, Math.round((c.monthSpent * 100) / c.limit))
                : 0;
            return (
              '<tr class="' +
              (c.active ? "" : "off") +
              '"><td><b>' +
              esc(c.name) +
              "</b>" +
              (c.active ? "" : ' <span class="muted">(inactive)</span>') +
              '<div class="muted" style="font-size:12px">' +
              (c.created
                ? "created " + new Date(c.created).toLocaleDateString()
                : "creation date unavailable") +
              "</div></td>" +
              "<td><code>" +
              (showCodes ? esc(c.code) : "••••••") +
              "</code></td>" +
              '<td class="num">' +
              fmt(c.earned) +
              '</td><td class="num">' +
              fmt(c.spent) +
              '</td><td class="num"><b>' +
              fmt(c.balance) +
              "</b></td>" +
              '<td class="num">' +
              fmt(c.monthSpent) +
              (c.limit > 0
                ? '<div class="bar"><i class="' +
                  (pct >= 100 ? "full" : pct >= 80 ? "hot" : "") +
                  '" style="width:' +
                  pct +
                  '%"></i></div>'
                : "") +
              "</td>" +
              '<td class="num keep"><input class="limit" type="number" min="0" placeholder="No limit" value="' +
              (c.limit || "") +
              '" data-limit="' +
              esc(c.key) +
              '"></td>' +
              '<td class="keep"><label class="switch"><input type="checkbox" data-active="' +
              esc(c.key) +
              '" ' +
              (c.active ? "checked" : "") +
              "><span></span></label></td>" +
              '<td class="keep" style="white-space:nowrap"><button class="s" data-code="' +
              esc(c.key) +
              '">Change code</button> <button class="s r" data-del="' +
              esc(c.key) +
              '">Delete</button></td></tr>'
            );
          })
          .join("")
      : '<tr><td colspan="9" class="muted" style="text-align:center;padding:30px">No students found.</td></tr>';
    h +=
      '</table></div><p class="muted" style="margin:12px 0 0"><b>Earned</b> = points collected by the student. <b>Spent</b> = reward requests not declined. <b>“This month”</b> counts towards the monthly limit (month: ' +
      esc(data.month) +
      ").</br> Leave the limit empty for no limit; the student can still earn points, but can only spend up to the limit. Inactive students can no longer log in.</p></div>";
    return h;
  }
  function requestsView() {
    let h =
      '<h2>Reward requests</h2><div class="panel"><div class="toolbar"><div class="pills">' +
      ["Pending", "Approved", "Fulfilled", "Declined", "All"]
        .map(
          (f) =>
            '<button class="' +
            (rf === f ? "on" : "") +
            '" data-rf="' +
            f +
            '">' +
            f +
            "</button>",
        )
        .join("") +
      "</div></div>";
    const list = data.requests.filter((r) => rf === "All" || r.status === rf);
    h +=
      '<table><tr><th>Student</th><th>Reward</th><th class="num">Points</th><th>Value</th><th>Requested</th><th>Status</th><th></th></tr>' +
      (list.length
        ? list
            .map(
              (r) =>
                "<tr><td><b>" +
                esc(r.childName) +
                "</b></td><td>" +
                esc(r.itemName) +
                '</td><td class="num">' +
                fmt(r.cost) +
                "</td><td>" +
                esc(r.value) +
                "</td><td>" +
                new Date(r.timestamp).toLocaleString() +
                '</td><td><span class="st ' +
                esc(r.status) +
                '">' +
                esc(r.status) +
                '</span></td><td style="white-space:nowrap">' +
                (r.status === "Pending"
                  ? '<button class="s g" data-u="' +
                    esc(r.id) +
                    '" data-s="Approved">Approve</button> <button class="s r" data-u="' +
                    esc(r.id) +
                    '" data-s="Declined">Decline &amp; refund</button>'
                  : "") +
                (r.status === "Approved"
                  ? '<button class="s p" data-u="' +
                    esc(r.id) +
                    '" data-s="Fulfilled">Mark as given</button>'
                  : "") +
                "</td></tr>",
            )
            .join("")
        : '<tr><td colspan="7" class="muted" style="text-align:center;padding:30px">Nothing here.</td></tr>') +
      "</table></div>";
    return h;
  }
  function draw() {
    if (!pw) {
      root.innerHTML =
        '<main class="login-page"><section class="login-card">' +
        '<div class="login-title"><div class="login-brand">🎓</div><div class="login-text"><div class="login-eyebrow">MASTERY ADMIN</div>' +
        '<h1>Welcome back</h1><p class="login-description">Sign in to manage students and reward requests.</p></div> </div>' +
        (err ? '<div class="err">' + esc(err) + "</div>" : "") +
        '<form id="loginForm"><label for="adminUsername">Username</label>' +
        '<input type="text" id="adminUsername" value="admin" placeholder="Enter your username" autocomplete="username" required>' +
        '<label for="pw">Password</label><input type="password" id="pw" placeholder="Enter your password"  value="admin" autocomplete="current-password" required>' +
        '<button class="p login-submit" type="submit">Sign in</button></form>' +
        "</section></main>";
      document.getElementById("loginForm").onsubmit = (e) => {
        e.preventDefault();
        pw = document.getElementById("pw").value;
        seen = null;
        last = "";
        document.activeElement.blur();
        load();
      };
      document.getElementById("adminUsername").focus();
      return;
    }
    if (!data) {
      root.innerHTML =
        '<div class="panel" style="margin:30px">' +
        (err
          ? '<span class="err">' +
            esc(err) +
            '</span> <button id="retry">Retry</button>'
          : "Loading…") +
        "</div>";
      const r = document.getElementById("retry");
      if (r) r.onclick = () => load();
      return;
    }
    const pend = data.requests.filter((r) => r.status === "Pending").length;
    root.innerHTML =
      '<div class="layout"><aside><h1>🎓 Mastery Admin</h1>' +
      '<button class="nav ' +
      (view === "students" ? "on" : "") +
      '" data-v="students"><span class="lbl">Students</span></button>' +
      '<button class="nav ' +
      (view === "requests" ? "on" : "") +
      '" data-v="requests"><span class="lbl">Requests</span>' +
      (pend ? '<span class="badge">' + pend + "</span>" : "") +
      "</button>" +
      '<div class="sp"></div><button class="nav" id="notify" style="display:' +
      ("Notification" in window && Notification.permission === "default"
        ? "flex"
        : "none") +
      '"><a href="/" class="nav lbl" style="text-decoration: none; color: #c5c5c5;">Logout to Home</a></button>' +
      '<button class="nav" id="logout"><span class="lbl">Log out</span></button></aside><main>' +
      (err ? '<div class="err">' + esc(err) + "</div>" : "") +
      (view === "students" ? studentsView() : requestsView()) +
      "</main></div>";
    bind();
  }
  function bind() {
    const $ = (s) => root.querySelectorAll(s),
      on = (s, f) => $(s).forEach(f);
    on(
      "[data-v]",
      (b) =>
        (b.onclick = () => {
          view = b.dataset.v;
          draw();
        }),
    );
    document.getElementById("logout").onclick = () => {
      pw = "";
      data = null;
      draw();
    };
    const nt = document.getElementById("notify");
    if (nt) nt.onclick = () => Notification.requestPermission().then(draw);
    on(
      "[data-rf]",
      (b) =>
        (b.onclick = () => {
          rf = b.dataset.rf;
          draw();
        }),
    );
    on(
      "[data-u]",
      (b) =>
        (b.onclick = () => {
          b.disabled = true;
          act("admin_update", { id: b.dataset.u, status: b.dataset.s });
        }),
    );
    if (view !== "students") return;
    on(
      "[data-sf]",
      (b) =>
        (b.onclick = () => {
          sf = b.dataset.sf;
          draw();
        }),
    );
    on(
      "[data-sort]",
      (h) =>
        (h.onclick = () => {
          const k = h.dataset.sort;
          if (sortKey === k) sortDir *= -1;
          else {
            sortKey = k;
            sortDir = 1;
          }
          draw();
        }),
    );
    const qi = document.getElementById("q");
    qi.oninput = () => {
      q = qi.value;
      const p = qi.selectionStart;
      draw();
      const n = document.getElementById("q");
      n.focus();
      n.setSelectionRange(p, p);
    };
    document.getElementById("showc").onchange = (e) => {
      showCodes = e.target.checked;
      draw();
    };
    document.getElementById("addToggle").onclick = () => {
      showAdd = !showAdd;
      draw();
    };
    document.getElementById("allBtn").onclick = () => {
      const v = document.getElementById("allLimit").value;
      if (v === "")
        return notify(
          "Enter a monthly limit in points first (0 = no limit).",
          "error",
        );
      const limit = Number(v);
      if (!Number.isFinite(limit) || limit < 0)
        return notify("Enter a valid non-negative monthly limit.", "error");
      if (!data.children.length)
        return notify("There are no student profiles to update.", "error");
      if (
        confirm(
          "Set the monthly limit to " +
            (limit > 0 ? limit + " points" : "no limit") +
            " for ALL students?",
        )
      )
        updateAllMonthlySpendLimits(limit);
    };
    on(
      "[data-limit]",
      (i) =>
        (i.onchange = () => {
          const limit = i.value === "" ? 0 : Number(i.value);
          if (!Number.isFinite(limit) || limit < 0)
            return notify("Enter a valid non-negative monthly limit.", "error");
          refreshAfterProfileUpdate(
            updateMonthlySpendLimit(i.dataset.limit, limit),
            "Could not update monthly spend limit",
            "Monthly spend limit updated.",
          );
        }),
    );
    on(
      "[data-active]",
      (i) =>
        (i.onchange = () =>
          refreshAfterProfileUpdate(
            updateProfileStatus(i.dataset.active, i.checked),
            "Could not update student status",
            "Student status updated.",
          )),
    );
    on(
      "[data-code]",
      (b) =>
        (b.onclick = () => {
          const c = prompt("New secret code:");
          if (c && c.trim()) {
            updateSecretCode(b.dataset.code, c.trim())
              .then(() => {
                last = "";
                return load().then(() => notify("Secret code updated."));
              })
              .catch((error) =>
                notify(
                  "Could not update secret code: " +
                    (error && error.message ? error.message : String(error)),
                  "error",
                ),
              );
          }
        }),
    );
    on(
      "[data-del]",
      (b) =>
        (b.onclick = () => {
          if (
            confirm(
              "Delete this student profile? This cannot be undone. Use the Active switch instead if you only want to stop them logging in.",
            )
          )
            deleteProfile(b.dataset.del)
              .then(() => {
                last = "";
                return load().then(() => notify("Student profile deleted."));
              })
              .catch((error) =>
                notify(
                  "Could not delete student profile: " +
                    (error && error.message ? error.message : String(error)),
                  "error",
                ),
              );
        }),
    );
    if (showAdd) {
      document.getElementById("gen").onclick = () => {
        document.getElementById("nc").value = genCode();
      };
      document.getElementById("addOne").onclick = () => {
        const n = document.getElementById("nn").value.trim(),
          c = document.getElementById("nc").value.trim(),
          l = document.getElementById("nl").value;
        if (!n || !c)
          return notify("Enter both a username and a secret code.", "error");
        saveProfiles([
          {
            username: n,
            secret_code: c,
            monthly_spend_limit: Number(l) || 0,
            cumulative_points: 0,
            status: true,
          },
        ]).then((saved) => {
          if (saved) notify("Student '" + n + "' added.");
        });
      };
      document.getElementById("addMany").onclick = () => {
        const existingUsernames = new Set(
          data.children.map((student) => student.name.trim().toLowerCase()),
        );
        const parsedProfiles = document
          .getElementById("bulk")
          .value.split("\n")
          .map((l) => l.split(",").map((x) => x.trim()))
          .filter((p) => p[0] && p[1])
          .map((p) => ({
            username: p[0],
            secret_code: p[1],
            monthly_spend_limit: Number(p[2]) || 0,
            cumulative_points: 0,
            status: true,
          }));
        const profiles = parsedProfiles.filter((profile) => {
          const username = profile.username.toLowerCase();
          if (existingUsernames.has(username)) return false;
          existingUsernames.add(username);
          return true;
        });
        const totalRequested = parsedProfiles.length;
        if (!profiles.length)
          return notify(
            parsedProfiles.length
              ? "No new students to add; those usernames already exist."
              : "Enter at least one valid username and secret code.",
            "error",
          );
        saveProfiles(profiles).then((saved) => {
          if (saved)
            notify(
              profiles.length +
                " student(s) added" +
                (totalRequested > profiles.length
                  ? " (" +
                    (totalRequested - profiles.length) +
                    " skipped: username already exists)"
                  : "") +
                ".",
            );
        });
      };
    }
  }
  draw();
  if (pw) load();
  setInterval(() => {
    if (pw) load();
  }, 20000);
})();
