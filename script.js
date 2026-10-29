// =========================================================
// ============ CONTENT SECTION — EDIT THIS PART ============
// =========================================================
//
// Structure: TOPICS -> subtopics -> levels.
// Each level has a FIXED bank of [a, b] question pairs (not randomly
// generated) plus how many questions to ask per practice round.
// The engine automatically avoids repeating a question within one
// round, and only reuses (with operand order flipped) if the bank is
// smaller than the round size.
//
// To add a new subtopic or topic, copy the shape below.
// =========================================================
//
// 🔧🔧🔧 THINGS YOU'LL LIKELY WANT TO TUNE LATER — QUICK REFERENCE 🔧🔧🔧
//
// 1. TIME LIMITS — each level below has its own "timeSeconds" field
//    (e.g. `timeSeconds: 40`). Change that number to change how long a
//    student has to finish that specific level and still earn mastery.
//    There's no single global timer to edit -- it's set per level, right
//    next to that level's other settings, wherever you see "timeSeconds:".
//
// 2. NUMBER OF QUESTIONS / REPEATS — also set per level, right next to
//    timeSeconds:
//      - "askCount: N"      -> how many questions in one practice round
//        (used by bank-mode and procedural-mode levels)
//      - "blockRepeats: N"  -> how many times a question-block repeats
//        (used by block-mode levels, e.g. fact families or the paired
//        crossing/non-crossing sets) -- total questions = block size x N
//
// 3. POINTS / SCORING SYSTEM — this is NOT per-level, it's one shared
//    formula used by every level. Search for "SCORING FORMULA" further
//    down (in the ENGINE SECTION, inside finishRound) to find and adjust
//    the accuracy/improvement/speed-bonus/personal-best-bonus numbers
//    in one place.
//
// =========================================================

const TOPICS = [
  {
    name: "Addition",
    subtopics: [
      {
        name: "0 to 20",
        key: "addition_0to20",
        levels: (() => {
          const bank5_sums11to14 = [
            [10, 1],
            [10, 2],
            [10, 3],
            [10, 4],
            [7, 4],
            [7, 5],
            [7, 6],
            [7, 7],
            [6, 5],
            [6, 6],
            [6, 7],
            [6, 8],
            [9, 2],
            [9, 3],
            [9, 4],
            [9, 5],
            [5, 6],
            [5, 7],
            [5, 8],
            [5, 9],
            [8, 3],
            [8, 4],
            [8, 5],
            [8, 6],
          ];
          const bank6_sum15 = [
            [0, 15],
            [1, 14],
            [2, 13],
            [3, 12],
            [4, 11],
            [5, 10],
            [6, 9],
            [7, 8],
            [8, 7],
          ];
          const bank7_sums16to19 = [
            [0, 16],
            [3, 13],
            [6, 10],
            [9, 7],
            [12, 4],
            [15, 1],
            [18, 1],
            [0, 17],
            [3, 14],
            [6, 11],
            [9, 8],
            [12, 5],
            [15, 2],
            [19, 0],
            [0, 18],
            [3, 15],
            [6, 12],
            [9, 9],
            [12, 6],
            [15, 3],
            [0, 19],
            [3, 16],
            [6, 13],
            [9, 10],
            [12, 7],
            [15, 4],
            [1, 15],
            [4, 12],
            [7, 9],
            [10, 6],
            [13, 3],
            [16, 0],
            [1, 16],
            [4, 13],
            [7, 10],
            [10, 7],
            [13, 4],
            [16, 1],
            [1, 17],
            [4, 14],
            [7, 11],
            [10, 8],
            [13, 5],
            [16, 2],
            [1, 18],
            [4, 15],
            [7, 12],
            [10, 9],
            [13, 6],
            [16, 3],
            [2, 14],
            [5, 11],
            [8, 8],
            [11, 5],
            [14, 2],
            [17, 0],
            [2, 15],
            [5, 12],
            [8, 9],
            [11, 6],
            [14, 3],
            [17, 1],
            [2, 16],
            [5, 13],
            [8, 10],
            [11, 7],
            [14, 4],
            [17, 2],
            [2, 17],
            [5, 14],
            [8, 11],
            [11, 8],
            [14, 5],
            [18, 0],
          ];
          const bank8_sum20 = [
            [10, 10],
            [11, 9],
            [12, 8],
            [13, 7],
            [14, 6],
            [15, 5],
            [16, 4],
            [17, 3],
            [18, 2],
            [19, 1],
          ];

          return [
            {
              title: "Addition 0 to 4",
              askCount: 5,
              timeSeconds: 20,
              explanationKey: "bridging10", // 🔧 example: change 5 or 20 to retune this level
              bank: [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
                [2, 2],
                [0, 1],
                [1, 2],
                [4, 0],
              ],
            },
            {
              title: "Number bonds to 5",
              askCount: 5,
              timeSeconds: 20,
              bank: [
                [5, 0],
                [4, 1],
                [3, 2],
                [1, 4],
                [2, 3],
              ],
            },
            {
              title: "Addition 0 to 9",
              askCount: 10,
              timeSeconds: 40,
              bank: [
                [0, 6],
                [0, 7],
                [0, 8],
                [0, 9],
                [1, 6],
                [1, 7],
                [1, 8],
                [2, 4],
                [2, 5],
                [2, 6],
                [2, 7],
                [3, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [4, 2],
                [4, 3],
                [4, 4],
                [4, 5],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [6, 1],
                [6, 2],
                [6, 3],
                [7, 1],
                [7, 2],
                [8, 1],
              ],
            },
            {
              title: "Number bonds to 10",
              askCount: 10,
              timeSeconds: 40,
              bank: [
                [0, 10],
                [1, 9],
                [2, 8],
                [3, 7],
                [4, 6],
                [5, 5],
                [6, 4],
                [7, 3],
                [8, 2],
                [9, 1],
              ],
            },
            {
              title: "Addition 1 to 10 (sums 11-14)",
              askCount: 10,
              timeSeconds: 40,
              bank: bank5_sums11to14,
            },
            {
              title: "Number bonds to 15",
              askCount: 5,
              timeSeconds: 20,
              bank: bank6_sum15,
            },
            {
              title: "Addition 0 to 19 (sums 16-19)",
              askCount: 10,
              timeSeconds: 40,
              bank: bank7_sums16to19,
            },
            {
              title: "Number bonds to 20",
              askCount: 5,
              timeSeconds: 30,
              bank: bank8_sum20,
            },
            {
              title: "Revision (sums 11-20)",
              askCount: 10,
              timeSeconds: 40,
              bank: [
                ...bank5_sums11to14,
                ...bank6_sum15,
                ...bank7_sums16to19,
                ...bank8_sum20,
              ],
            },
          ];
        })(),
      },
      {
        name: "One-digit + Two-digit",
        key: "addition_1digitplus2digit",
        levels: (() => {
          // Levels 1-9: teach that adding a fixed single digit (matching the
          // level number) follows the SAME pattern regardless of the tens
          // digit. Each round asks two sets of 3: one set where the ones
          // digit causes carrying into the next ten, one where it doesn't.
          // Each set always starts with the single-digit case (e.g. 9+2=11)
          // followed by two-digit numbers sharing that same last digit
          // (19+2=21, 29+2=31) -- so the student sees the pattern transfer.
          function pickDistinctTens(count, maxTensDigit) {
            const pool = [];
            for (let i = 1; i <= maxTensDigit; i++) pool.push(i);
            const shuffled = shuffle(pool);
            return shuffled.slice(0, count);
          }
          function makeQuestionSet(onesDigit, n, maxTensDigit) {
            const extraTens = pickDistinctTens(2, maxTensDigit);
            const tensDigits = [0, ...extraTens]; // always include the single-digit case first
            return tensDigits.map((t) => {
              const a = t * 10 + onesDigit;
              return { text: a + " + " + n + " = ?", answer: a + n + "" };
            });
          }
          function makeBlockGenerator(n) {
            return function () {
              const crossOnesDigit = randInt(10 - n, 9); // carries into the next ten
              const crossMaxTens = Math.floor((99 - n - crossOnesDigit) / 10);
              const crossSet = makeQuestionSet(crossOnesDigit, n, crossMaxTens);

              const maxNonCrossOnes = Math.max(0, 9 - n);
              const nonCrossOnesDigit = randInt(0, maxNonCrossOnes); // no carry
              const nonCrossMaxTens = Math.floor(
                (99 - n - nonCrossOnesDigit) / 10,
              );
              const nonCrossSet = makeQuestionSet(
                nonCrossOnesDigit,
                n,
                nonCrossMaxTens,
              );

              return [...crossSet, ...nonCrossSet]; // 6 total: 3 crossing + 3 non-crossing
            };
          }
          // Level 10: fully random two-digit + one-digit, no fixed pattern.
          function genFullyRandom() {
            let a, b;
            do {
              a = randInt(10, 99);
              b = randInt(0, 9);
            } while (a + b >= 100);
            return { text: a + " + " + b + " = ?", answer: a + b + "" };
          }
          const levels = [];
          for (let n = 1; n <= 9; n++) {
            levels.push({
              title: "Add " + n,
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 40,
              blockGenerator: makeBlockGenerator(n),
            });
          }
          levels.push({
            title: "Add any digit",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 40,
            generator: genFullyRandom,
          });
          return levels;
        })(),
      },
      {
        name: "Column Addition (no carry)",
        key: "addition_column_nocarry",
        levels: (() => {
          // Level 1: single digit + single digit, sum stays single-digit (no carry)
          function genL1() {
            const sum = randInt(0, 9);
            const a = randInt(0, sum);
            const b = sum - a;
            return { a: a, b: b, sum: sum };
          }
          // Level 2: single digit + single digit, sum crosses into the teens (11-17)
          function genL2() {
            const sum = randInt(11, 17);
            const a = randInt(Math.max(0, sum - 9), Math.min(9, sum));
            const b = sum - a;
            return { a: a, b: b, sum: sum };
          }
          // Level 3: two-digit + single-digit, no carry in the ones column
          function genL3() {
            let tens, onesA, b, a, sum;
            do {
              tens = randInt(1, 9);
              onesA = randInt(0, 9);
              b = randInt(0, 9 - onesA);
              a = tens * 10 + onesA;
              sum = a + b;
            } while (sum <= 10 || sum >= 99);
            return { a: a, b: b, sum: sum };
          }
          // Level 4: two-digit + two-digit, no carry in EITHER column
          function genL4() {
            let tensA, tensB, onesA, onesB;
            do {
              onesA = randInt(0, 9);
              onesB = randInt(0, 9);
            } while (onesA + onesB > 9);
            do {
              tensA = randInt(1, 9);
              tensB = randInt(1, 9);
            } while (tensA + tensB > 9);
            const a = tensA * 10 + onesA,
              b = tensB * 10 + onesB;
            return { a: a, b: b, sum: a + b };
          }
          function toQuestion(gen) {
            return function () {
              const q = gen();
              // "text"/"answer" keep mistake-review working exactly as everywhere
              // else; "a"/"b" are used by the column-format display during play.
              return {
                text: q.a + " + " + q.b + " = ?",
                answer: q.sum + "",
                a: q.a,
                b: q.b,
              };
            };
          }
          return [
            {
              title: "Single digit + single digit",
              mode: "procedural",
              askCount: 5,
              timeSeconds: 30,
              columnFormat: true,
              answerDigits: 1,
              explanationKey: "columnaddition",
              generator: toQuestion(genL1),
            },
            {
              title: "Single digit + single digit (crossing ten)",
              mode: "procedural",
              askCount: 5,
              timeSeconds: 30,
              columnFormat: true,
              answerDigits: 2,
              generator: toQuestion(genL2),
            },
            {
              title: "Two-digit + single-digit",
              mode: "procedural",
              askCount: 10,
              timeSeconds: 40,
              columnFormat: true,
              answerDigits: 2,
              generator: toQuestion(genL3),
            },
            {
              title: "Two-digit + two-digit",
              mode: "procedural",
              askCount: 10,
              timeSeconds: 60,
              columnFormat: true,
              answerDigits: 2,
              generator: toQuestion(genL4),
            },
          ];
        })(),
      },
      {
        name: "Double the numbers",
        key: "addition_doubles",
        levels: (() => {
          const dbl = (n) => ({
            text: n + " + " + n + " = ?",
            answer: 2 * n + "",
          });
          const pickSorted = (arr, k) =>
            shuffle(arr.slice())
              .slice(0, k)
              .sort((a, b) => a - b);
          const range = (from, to, step) => {
            const r = [];
            for (let v = from; v <= to; v += step) r.push(v);
            return r;
          };
          // Level 1: three blocks of three. Each block = a multiple of 10, the next multiple of 10,
          // then the middle number (e.g. 10+10, 20+20, 15+15). Numbers go up to 100.
          function genL1Block() {
            let starts;
            do {
              starts = pickSorted(range(10, 90, 10), 3);
            } while (starts[1] - starts[0] < 20 || starts[2] - starts[1] < 20); // no repeated question
            const out = [];
            starts.forEach((n) => out.push(dbl(n), dbl(n + 10), dbl(n + 5)));
            return out;
          }
          // Levels 2 & 3: single digit d, then a round number, then that round number +/- d
          function genPatternBlock(sign) {
            const ds = pickSorted([1, 2, 3, 4], 3);
            const bases = pickSorted(
              sign > 0 ? range(10, 90, 10) : range(20, 90, 10),
              3,
            ); // distinct, so no repeated question
            const out = [];
            ds.forEach((d, i) => {
              const base = bases[i];
              out.push(dbl(d), dbl(base), dbl(base + sign * d));
            });
            return out;
          }
          // Level 4: blocks of three: double a multiple of 10, double a single digit, then double their sum
          function genL4Block() {
            const tens = pickSorted(range(10, 90, 10), 3);
            const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
            const out = [];
            tens.forEach((t, i) =>
              out.push(dbl(t), dbl(digits[i]), dbl(t + digits[i])),
            );
            return out;
          }
          function genL5() {
            return dbl(50 * randInt(1, 10));
          }
          // Level 6: blocks of three: double a multiple of 100, then that number + 25, then that number - 25 (all up to 500)
          function genL6Block() {
            const out = [];
            pickSorted([100, 200, 300, 400], 3).forEach((h) =>
              out.push(dbl(h), dbl(h + 25), dbl(h - 25)),
            );
            return out;
          }
          // Level 7: place value. a+b, then (a tens)+(b tens), then (a hundreds)+(b hundreds)
          function genL7Block() {
            const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            const out = [];
            for (let i = 0; i < 3; i++) {
              const a = pool[2 * i],
                b = pool[2 * i + 1];
              [1, 10, 100].forEach((m) =>
                out.push({
                  text: a * m + " + " + b * m + " = ?",
                  answer: (a + b) * m + "",
                }),
              );
            }
            return out;
          }
          return [
            {
              title: "Doubles: tens and the middle number, up to 100",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 60,
              explanationKey: "doubling",
              blockGenerator: genL1Block,
            },
            {
              title: "Doubles: single digit, tens, then in between",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 60,
              blockGenerator: function () {
                return genPatternBlock(1);
              },
            },
            {
              title: "Doubles: just below a tens number",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 60,
              blockGenerator: function () {
                return genPatternBlock(-1);
              },
            },
            {
              title: "Doubles: tens, ones, then both together",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 60,
              blockGenerator: genL4Block,
            },
            {
              title: "Doubles up to 500 (hundreds and fifties)",
              mode: "procedural",
              askCount: 8,
              timeSeconds: 60,
              generator: genL5,
            },
            {
              title: "Doubles: hundreds, then 25 more and 25 less",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 60,
              blockGenerator: genL6Block,
            },
            {
              title: "Adding ones, tens and hundreds",
              mode: "block",
              blockRepeats: 1,
              timeSeconds: 90,
              blockGenerator: genL7Block,
            },
          ];
        })(),
      },
      // Add more subtopics here, e.g. "20 to 100", following the same shape.
    ],
  },
  // Add more topics here, e.g. Subtraction, following the same shape.
];

// ---- Subtraction 0-20: generator functions for procedural/block levels ----
function genSubL2() {
  let a, b;
  do {
    a = randInt(6, 10);
    b = randInt(0, 10);
  } while (b > a);
  return { text: a + " - " + b + " = ?", answer: a - b + "" };
}
function genSubL3Block() {
  let a, b, c;
  do {
    a = randInt(0, 10);
    b = randInt(0, 10);
    c = a + b;
  } while (c < 3 || c > 10);
  return [
    { text: a + " + " + b + " = ?", answer: c + "" },
    { text: c + " - " + a + " = ?", answer: b + "" },
    { text: c + " - " + b + " = ?", answer: a + "" },
  ];
}
function genSubL4() {
  const a = randInt(0, 10);
  return { text: a + " + ? = 10", answer: 10 - a + "" };
}
function genSubL5() {
  let a, c;
  do {
    a = randInt(0, 10);
    c = randInt(3, 10);
  } while (a > c);
  return { text: a + " + ? = " + c, answer: c - a + "" };
}
function genSubL6() {
  let a, b;
  do {
    a = randInt(11, 15);
    b = randInt(0, 15);
  } while (b > a);
  return { text: a + " - " + b + " = ?", answer: a - b + "" };
}
function genSubL7() {
  let a, c;
  do {
    a = randInt(0, 15);
    c = randInt(11, 15);
  } while (a > c);
  return { text: a + " + ? = " + c, answer: c - a + "" };
}
function genSubL8() {
  let a, b;
  do {
    a = randInt(16, 20);
    b = randInt(0, 20);
  } while (b > a);
  return { text: a + " - " + b + " = ?", answer: a - b + "" };
}
function genSubL9() {
  let a, c;
  do {
    a = randInt(0, 20);
    c = randInt(16, 20);
  } while (a > c);
  return { text: a + " + ? = " + c, answer: c - a + "" };
}
function genSubL10Block() {
  let a, b, c;
  do {
    a = randInt(0, 10);
    b = randInt(0, 10);
    c = a + b;
  } while (c < 11 || c > 20);
  return [
    { text: a + " + " + b + " = ?", answer: c + "" },
    { text: c + " - " + a + " = ?", answer: b + "" },
    { text: c + " - " + b + " = ?", answer: a + "" },
  ];
}
function genSubL11() {
  const a = randInt(0, 20);
  return { text: a + " + ? = 20", answer: 20 - a + "" };
}
function genSubL12Block() {
  let a, b;
  do {
    a = randInt(11, 20);
    b = randInt(0, 20);
  } while (b > a);
  const c = a - b;
  return [
    { text: a + " - " + b + " = ?", answer: c + "" },
    { text: c + " + " + b + " = ?", answer: a + "" },
  ];
}
function genSubL13() {
  let a, b;
  do {
    a = randInt(7, 20);
    b = randInt(5, 20);
  } while (b > a);
  return { text: a + " - " + b + " = ?", answer: a - b + "" };
}

TOPICS.push({
  name: "Subtraction",
  subtopics: [
    {
      name: "0 to 20",
      key: "subtraction_0to20",
      levels: [
        {
          title: "Subtraction 0 to 5",
          mode: "bank",
          operator: "-",
          askCount: 10,
          timeSeconds: 40,
          explanationKey: "bridgingback10", // 🔧 example
          bank: [
            [5, 0],
            [5, 1],
            [5, 2],
            [5, 3],
            [5, 4],
            [5, 5],
            [4, 0],
            [4, 1],
            [4, 2],
            [4, 3],
            [4, 4],
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
            [2, 0],
            [2, 1],
            [2, 2],
            [1, 0],
            [1, 1],
          ],
        },
        {
          title: "Subtraction 0 to 10",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL2,
        },
        {
          title: "Fact families to 10",
          mode: "block",
          blockRepeats: 5,
          timeSeconds: 40,
          blockGenerator: genSubL3Block,
        }, // 🔧 example: blockRepeats controls total question count (block size x this)
        {
          title: "Number bonds to 10",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL4,
        },
        {
          title: "Fill in the blanks (to 10)",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL5,
        },
        {
          title: "Subtraction 0 to 15",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL6,
        },
        {
          title: "Fill in the blanks (to 15)",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL7,
        },
        {
          title: "Subtraction 0 to 20",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL8,
        },
        {
          title: "Fill in the blanks (to 20)",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL9,
        },
        {
          title: "Fact families 11 to 20",
          mode: "block",
          blockRepeats: 5,
          timeSeconds: 40,
          blockGenerator: genSubL10Block,
        },
        {
          title: "Number bonds to 20",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL11,
        },
        {
          title: "Subtraction & addition bonds to 20",
          mode: "block",
          blockRepeats: 5,
          timeSeconds: 40,
          blockGenerator: genSubL12Block,
        },
        {
          title: "Revision",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 40,
          generator: genSubL13,
        },
      ],
    },
    {
      name: "One-digit from Two-digit",
      key: "subtraction_1digitfrom2digit",
      levels: (() => {
        // Level 1: teaches "subtract to the nearest ten, then subtract the
        // rest" -- b is the ones digit of a (not independent), so c is
        // ALWAYS a clean multiple of ten (10, 20, ... 90). E.g. 11-1=10,
        // then 10-1=9, and directly 11-2=9 too. b+d stays <= 9 so the
        // third question is also a genuine two-digit-minus-one-digit fact.
        function genChainedBlock() {
          const tensDigit = randInt(1, 9);
          const onesDigit = randInt(1, 8); // exclude 9 -- it left no room for a non-zero d below
          const a = tensDigit * 10 + onesDigit;
          const b = onesDigit; // subtracting this always lands on a multiple of ten
          const c = a - b;
          const maxD = Math.min(9 - b, c);
          const d = randInt(1, maxD); // always >= 1 -- a zero subtraction here just repeats question 1
          const e = c - d;
          return [
            { text: a + " - " + b + " = ?", answer: c + "" },
            { text: c + " - " + d + " = ?", answer: e + "" },
            { text: a + " - " + (b + d) + " = ?", answer: e + "" },
          ];
        }
        // Level 2: fully random two-digit minus one-digit, no fixed pattern.
        function genFullyRandom() {
          const a = randInt(10, 99);
          const b = randInt(0, 9);
          return { text: a + " - " + b + " = ?", answer: a - b + "" };
        }
        return [
          {
            title: "Subtracting in parts",
            mode: "block",
            blockRepeats: 10,
            timeSeconds: 120,
            blockGenerator: genChainedBlock,
          },
          {
            title: "Subtract any digit",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 40,
            generator: genFullyRandom,
          },
        ];
      })(),
    },
    {
      name: "Column Subtraction (no borrow)",
      key: "subtraction_column_noborrow",
      levels: (() => {
        function toQuestion(gen) {
          return function () {
            const q = gen();
            return {
              text: q.a + " - " + q.b + " = ?",
              answer: q.c + "",
              a: q.a,
              b: q.b,
            };
          };
        }
        // Level 1: single digit - single digit, b strictly < a (no borrow possible)
        function genL1() {
          const a = randInt(1, 9);
          const b = randInt(0, a - 1);
          return { a: a, b: b, c: a - b };
        }
        // Level 2: two-digit - single-digit, no borrow -- the subtrahend is
        // strictly less than the top number's ones digit (e.g. 28-5=23)
        function genL2() {
          const tensA = randInt(1, 9);
          const onesA = randInt(1, 9);
          const b = randInt(0, onesA - 1);
          const a = tensA * 10 + onesA;
          return { a: a, b: b, c: a - b };
        }
        // Level 3: two-digit - two-digit, no borrow in EITHER column -- both
        // of the subtrahend's digits are strictly smaller (e.g. 78-25=53)
        function genL3() {
          const tensA = randInt(2, 9);
          const onesA = randInt(1, 9);
          const tensB = randInt(1, tensA - 1);
          const onesB = randInt(0, onesA - 1);
          const a = tensA * 10 + onesA;
          const b = tensB * 10 + onesB;
          return { a: a, b: b, c: a - b };
        }
        return [
          {
            title: "Subtract two single digits",
            mode: "procedural",
            askCount: 5,
            timeSeconds: 30,
            columnFormat: true,
            operator: "-",
            answerDigits: 1,
            explanationKey: "columnsubtraction",
            generator: toQuestion(genL1),
          },
          {
            title: "Subtract a single digit from a two-digit number",
            mode: "procedural",
            askCount: 5,
            timeSeconds: 30,
            columnFormat: true,
            operator: "-",
            answerDigits: 2,
            generator: toQuestion(genL2),
          },
          {
            title: "Subtract a two-digit number from a two-digit number",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 40,
            columnFormat: true,
            operator: "-",
            answerDigits: 2,
            generator: toQuestion(genL3),
          },
        ];
      })(),
    },
  ],
});

// ---- Addition & Subtraction (mixed): combined fluency drill ----
function genMixedFluencyBlock() {
  // 1. compute addition: a + b = ?
  const sum = randInt(0, 20);
  const a1 = randInt(0, sum);
  const b1 = sum - a1;

  // 2. compute subtraction: x - y = ?
  const x1 = randInt(0, 20);
  const y1 = randInt(0, x1);

  // 3. fill-in-blank addition: a + ? = c
  let a2, c2;
  do {
    a2 = randInt(0, 20);
    c2 = randInt(0, 20);
  } while (a2 > c2);

  // 4. fill-in-blank subtraction: x - ? = z
  let x2, z2;
  do {
    x2 = randInt(1, 20);
    z2 = randInt(0, 20);
  } while (z2 > x2);

  return [
    { text: a1 + " + " + b1 + " = ?", answer: a1 + b1 + "" },
    { text: x1 + " - " + y1 + " = ?", answer: x1 - y1 + "" },
    { text: a2 + " + ? = " + c2, answer: c2 - a2 + "" },
    { text: x2 + " - ? = " + z2, answer: x2 - z2 + "" },
  ];
}

// Single-digit +/- two-digit, 20 questions per round with real progressive
// difficulty: the first 10 stay within the same ten (no crossing), the next
// 10 cross a ten boundary -- matching the bridging-through-10 idea used
// elsewhere, just scaled up to two-digit numbers. Four question shapes are
// mixed in throughout: "a+b=?", "a-b=?", "a+?=c", "a-?=c". The two-digit
// number always leads on subtraction (can't flip without changing the
// maths), but addition's operand order (and which side the blank sits on)
// is randomised each time.
function genAddSubTwoDigitSingleDigit(i, total) {
  const crossing = i >= 10;
  const type = randInt(1, 4);
  let onesDigit, b, tensDigit, a;
  if (type === 1 || type === 3) {
    if (crossing) {
      b = randInt(1, 9);
      onesDigit = randInt(Math.max(0, 10 - b), 9);
    } else {
      b = randInt(0, 9);
      onesDigit = randInt(0, 9 - b);
    }
    tensDigit = randInt(1, 9);
    a = tensDigit * 10 + onesDigit;
    const c = a + b;
    const flip = Math.random() < 0.5;
    if (type === 1)
      return {
        text: (flip ? b + " + " + a : a + " + " + b) + " = ?",
        answer: c + "",
      };
    return {
      text: (flip ? "? + " + a : a + " + ?") + " = " + c,
      answer: b + "",
    };
  } else {
    if (crossing) {
      b = randInt(1, 9);
      onesDigit = randInt(0, b - 1);
    } else {
      b = randInt(0, 9);
      onesDigit = randInt(b, 9);
    }
    tensDigit = randInt(1, 9);
    a = tensDigit * 10 + onesDigit;
    const c = a - b;
    if (type === 2) return { text: a + " - " + b + " = ?", answer: c + "" };
    return { text: a + " - ? = " + c, answer: b + "" };
  }
}

TOPICS.push({
  name: "Addition & Subtraction",
  subtopics: [
    {
      name: "0 to 20",
      key: "additionsubtraction_0to20",
      levels: [
        {
          title: "Mastery and Fluency",
          mode: "block",
          blockRepeats: 6,
          timeSeconds: 120,
          blockGenerator: genMixedFluencyBlock,
        },
      ],
    },
    {
      name: "0 to 99",
      key: "additionsubtraction_0to99",
      levels: [
        {
          title: "Single digit +/- two digits",
          mode: "procedural",
          askCount: 20,
          timeSeconds: 150,
          generator: genAddSubTwoDigitSingleDigit,
        },
      ],
    },
  ],
});

// ---- Multiplication: times tables 1, 2, 5, 10 ----
function makeMultiplyGenerator(multiplier) {
  return function () {
    const a = randInt(0, 12);
    const flip = Math.random() < 0.5;
    const text = flip
      ? multiplier + " x " + a + " = ?"
      : a + " x " + multiplier + " = ?";
    return { text: text, answer: a * multiplier + "" };
  };
}
TOPICS.push({
  name: "Multiplication",
  subtopics: [
    {
      name: "1, 2, 5, 10 times tables",
      key: "multiplication_1_2_5_10",
      levels: [
        {
          title: "Multiply by 1",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          explanationKey: "whatismultiplication",
          generator: makeMultiplyGenerator(1),
        },
        {
          title: "Multiply by 2",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          explanationKey: "times2table",
          generator: makeMultiplyGenerator(2),
        },
        {
          title: "Multiply by 5",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          explanationKey: "times5table",
          generator: makeMultiplyGenerator(5),
        },
        {
          title: "Multiply by 10",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          explanationKey: "times10table",
          generator: makeMultiplyGenerator(10),
        },
      ],
    },
  ],
});

// ---- Measurement: reading real-world instruments (clock, scale, jug, ruler, thermometer) ----
function roundToStep(v, step) {
  return Math.round(v / step) * step;
}
function angleToPoint(cx, cy, angleDeg, length) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + length * Math.sin(rad), y: cy - length * Math.cos(rad) };
}
function buildClockSVG(hour, minute) {
  const cx = 100,
    cy = 100,
    r = 90;
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  const hourEnd = angleToPoint(cx, cy, hourAngle, 45);
  const minuteEnd = angleToPoint(cx, cy, minuteAngle, 70);
  let ticks = "";
  for (let k = 0; k < 12; k++) {
    const angle = k * 30;
    const outer = angleToPoint(cx, cy, angle, r - 5);
    const inner = angleToPoint(cx, cy, angle, r - (k % 3 === 0 ? 16 : 10));
    ticks +=
      '<line x1="' +
      inner.x.toFixed(1) +
      '" y1="' +
      inner.y.toFixed(1) +
      '" x2="' +
      outer.x.toFixed(1) +
      '" y2="' +
      outer.y.toFixed(1) +
      '" stroke="#2e3440" stroke-width="' +
      (k % 3 === 0 ? 3 : 1.5) +
      '"/>';
    const numPos = angleToPoint(cx, cy, angle, r - 26);
    const label = k === 0 ? 12 : k;
    ticks +=
      '<text x="' +
      numPos.x.toFixed(1) +
      '" y="' +
      (numPos.y + 5).toFixed(1) +
      '" font-size="14" text-anchor="middle" fill="#2e3440">' +
      label +
      "</text>";
  }
  return (
    '<svg viewBox="0 0 200 200" width="180" height="180">' +
    '<circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="' +
    r +
    '" fill="#fff" stroke="#2e3440" stroke-width="3"/>' +
    ticks +
    '<line x1="' +
    cx +
    '" y1="' +
    cy +
    '" x2="' +
    hourEnd.x.toFixed(1) +
    '" y2="' +
    hourEnd.y.toFixed(1) +
    '" stroke="#2e3440" stroke-width="5" stroke-linecap="round"/>' +
    '<line x1="' +
    cx +
    '" y1="' +
    cy +
    '" x2="' +
    minuteEnd.x.toFixed(1) +
    '" y2="' +
    minuteEnd.y.toFixed(1) +
    '" stroke="#4a90d9" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="4" fill="#2e3440"/>' +
    "</svg>"
  );
}
function buildDialSVG(value, maxValue, majorStep, unitLabel) {
  const cx = 100,
    cy = 110,
    r = 85;
  const startAngle = -135,
    endAngle = 135,
    sweep = endAngle - startAngle;
  const frac = value / maxValue;
  const needleEnd = angleToPoint(cx, cy, startAngle + frac * sweep, 65);
  let ticks = "";
  for (let v = 0; v <= maxValue + 0.001; v += majorStep) {
    const angle = startAngle + (v / maxValue) * sweep;
    const outer = angleToPoint(cx, cy, angle, r);
    const inner = angleToPoint(cx, cy, angle, r - 12);
    ticks +=
      '<line x1="' +
      inner.x.toFixed(1) +
      '" y1="' +
      inner.y.toFixed(1) +
      '" x2="' +
      outer.x.toFixed(1) +
      '" y2="' +
      outer.y.toFixed(1) +
      '" stroke="#2e3440" stroke-width="2"/>';
    const labelPos = angleToPoint(cx, cy, angle, r - 24);
    ticks +=
      '<text x="' +
      labelPos.x.toFixed(1) +
      '" y="' +
      (labelPos.y + 4).toFixed(1) +
      '" font-size="11" text-anchor="middle" fill="#2e3440">' +
      Math.round(v) +
      "</text>";
  }
  const arcStart = angleToPoint(cx, cy, startAngle, r);
  const arcEnd = angleToPoint(cx, cy, endAngle, r);
  return (
    '<svg viewBox="0 0 200 200" width="180" height="180">' +
    '<path d="M ' +
    arcStart.x.toFixed(1) +
    " " +
    arcStart.y.toFixed(1) +
    " A " +
    r +
    " " +
    r +
    " 0 1 1 " +
    arcEnd.x.toFixed(1) +
    " " +
    arcEnd.y.toFixed(1) +
    '" fill="none" stroke="#2e3440" stroke-width="3"/>' +
    ticks +
    '<line x1="' +
    cx +
    '" y1="' +
    cy +
    '" x2="' +
    needleEnd.x.toFixed(1) +
    '" y2="' +
    needleEnd.y.toFixed(1) +
    '" stroke="#e0715a" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="' +
    cx +
    '" cy="' +
    cy +
    '" r="6" fill="#2e3440"/>' +
    '<text x="' +
    cx +
    '" y="' +
    (cy + 45) +
    '" font-size="12" text-anchor="middle" fill="#6b7684">' +
    unitLabel +
    "</text>" +
    "</svg>"
  );
}
function buildJugSVG(value, maxValue, majorStep, unitLabel) {
  const left = 40,
    right = 140,
    top = 20,
    bottom = 200,
    height = bottom - top;
  const liquidTop = bottom - (value / maxValue) * height;
  let ticks = "";
  for (let v = 0; v <= maxValue + 0.001; v += majorStep) {
    const y = bottom - (v / maxValue) * height;
    ticks +=
      '<line x1="' +
      left +
      '" y1="' +
      y.toFixed(1) +
      '" x2="' +
      (left + 10) +
      '" y2="' +
      y.toFixed(1) +
      '" stroke="#2e3440" stroke-width="2"/>';
    ticks +=
      '<text x="' +
      (left - 6) +
      '" y="' +
      (y.toFixed(1) * 1 + 4) +
      '" font-size="11" text-anchor="end" fill="#2e3440">' +
      Math.round(v) +
      "</text>";
  }
  return (
    '<svg viewBox="0 0 180 220" width="160" height="195">' +
    '<rect x="' +
    left +
    '" y="' +
    top +
    '" width="' +
    (right - left) +
    '" height="' +
    height +
    '" fill="#f7f8fa" stroke="#2e3440" stroke-width="3"/>' +
    '<rect x="' +
    left +
    '" y="' +
    liquidTop.toFixed(1) +
    '" width="' +
    (right - left) +
    '" height="' +
    (bottom - liquidTop).toFixed(1) +
    '" fill="#4a90d9" opacity="0.7"/>' +
    ticks +
    '<text x="90" y="215" font-size="12" text-anchor="middle" fill="#6b7684">' +
    unitLabel +
    "</text>" +
    "</svg>"
  );
}
function buildRulerSVG(lengthUnits, maxUnits, unitLabel) {
  const startX = 20,
    pxPerUnit = 380 / maxUnits,
    y = 80;
  const endX = startX + lengthUnits * pxPerUnit;
  // Only draw ticks down to the precision actually being tested (5mm here) --
  // 100 individual 1mm ticks packed into this width were too cramped to
  // count reliably, so there's no point drawing finer than the readings
  // themselves ever require.
  const tickStep = unitLabel === "mm" ? 5 : 1;
  let ticks = "";
  for (let u = 0; u <= maxUnits; u += tickStep) {
    const x = startX + u * pxPerUnit;
    const isMajor = unitLabel === "cm" ? true : u % 10 === 0;
    ticks +=
      '<line x1="' +
      x.toFixed(1) +
      '" y1="40" x2="' +
      x.toFixed(1) +
      '" y2="' +
      (isMajor ? 60 : 52) +
      '" stroke="#2e3440" stroke-width="' +
      (isMajor ? 2 : 1.5) +
      '"/>';
    if (isMajor)
      ticks +=
        '<text x="' +
        x.toFixed(1) +
        '" y="35" font-size="11" text-anchor="middle" fill="#2e3440">' +
        u +
        "</text>";
  }
  return (
    '<svg viewBox="0 0 420 100" width="380" height="90">' +
    '<rect x="20" y="40" width="' +
    maxUnits * pxPerUnit +
    '" height="20" fill="#f7f8fa" stroke="#2e3440" stroke-width="2"/>' +
    ticks +
    '<line x1="' +
    startX +
    '" y1="' +
    y +
    '" x2="' +
    endX.toFixed(1) +
    '" y2="' +
    y +
    '" stroke="#4a90d9" stroke-width="4"/>' +
    '<line x1="' +
    startX +
    '" y1="' +
    (y - 6) +
    '" x2="' +
    startX +
    '" y2="' +
    (y + 6) +
    '" stroke="#4a90d9" stroke-width="4"/>' +
    '<line x1="' +
    endX.toFixed(1) +
    '" y1="' +
    (y - 6) +
    '" x2="' +
    endX.toFixed(1) +
    '" y2="' +
    (y + 6) +
    '" stroke="#4a90d9" stroke-width="4"/>' +
    "</svg>"
  );
}
function buildThermometerSVG(tempC) {
  const minT = -30,
    maxT = 50,
    tubeTop = 20,
    tubeBottom = 220,
    tubeHeight = tubeBottom - tubeTop;
  const mercuryY = tubeBottom - ((tempC - minT) / (maxT - minT)) * tubeHeight;
  let ticks = "";
  for (let t = minT; t <= maxT; t += 10) {
    const y = tubeBottom - ((t - minT) / (maxT - minT)) * tubeHeight;
    ticks +=
      '<line x1="70" y1="' +
      y.toFixed(1) +
      '" x2="85" y2="' +
      y.toFixed(1) +
      '" stroke="#2e3440" stroke-width="2"/>';
    ticks +=
      '<text x="62" y="' +
      (y + 4).toFixed(1) +
      '" font-size="12" text-anchor="end" fill="#2e3440">' +
      t +
      "</text>";
  }
  return (
    '<svg viewBox="0 0 160 260" width="140" height="228">' +
    '<rect x="85" y="' +
    tubeTop +
    '" width="16" height="' +
    tubeHeight +
    '" rx="8" fill="#f0f0f0" stroke="#2e3440" stroke-width="2"/>' +
    '<circle cx="93" cy="235" r="16" fill="#e0715a" stroke="#2e3440" stroke-width="2"/>' +
    '<rect x="89" y="' +
    mercuryY.toFixed(1) +
    '" width="8" height="' +
    (tubeBottom - mercuryY + 20).toFixed(1) +
    '" fill="#e0715a"/>' +
    ticks +
    "</svg>"
  );
}

TOPICS.push({
  name: "Measurement",
  subtopics: [
    {
      name: "Time",
      key: "measurement_time",
      levels: [
        {
          title: "O'clock",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          visualFormat: true,
          generator: function () {
            const hour = randInt(1, 12);
            return {
              text: "What time is it? (just the hour, e.g. 3)",
              answer: hour + "",
              dedupKey: "h" + hour,
              visualHtml: buildClockSVG(hour, 0),
            };
          },
        },
        {
          title: "Quarter and half hours",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          visualFormat: true,
          keyboardMode: "text",
          generator: function () {
            const hour = randInt(1, 12);
            const minute = [15, 30, 45][randInt(0, 2)];
            const answer = hour + ":" + String(minute).padStart(2, "0");
            return {
              text: "What time is it? (format H:MM, e.g. 3:15)",
              answer: answer,
              dedupKey: answer,
              visualHtml: buildClockSVG(hour, minute),
            };
          },
        },
        {
          title: "Minutes past and to",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          visualFormat: true,
          keyboardMode: "text",
          generator: function () {
            const hour = randInt(1, 12);
            const minute = randInt(1, 59);
            const answer = hour + ":" + String(minute).padStart(2, "0");
            return {
              text: "What time is it? (format H:MM, e.g. 3:27)",
              answer: answer,
              dedupKey: answer,
              visualHtml: buildClockSVG(hour, minute),
            };
          },
        },
      ],
    },
    {
      name: "Mass",
      key: "measurement_mass",
      levels: [
        {
          title: "Kilograms (1-60)",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          visualFormat: true,
          generator: function () {
            const value = roundToStep(randInt(1, 60), 5);
            return {
              text: "What is the weight? (kg)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildDialSVG(value, 60, 10, "kg"),
            };
          },
        },
        {
          title: "Grams (0-1000)",
          mode: "procedural",
          askCount: 10,
          timeSeconds: 120,
          visualFormat: true,
          generator: function () {
            const value = roundToStep(randInt(0, 1000), 50);
            return {
              text: "What is the weight? (g)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildDialSVG(value, 1000, 200, "g"),
            };
          },
        },
      ],
    },
    {
      name: "Capacity",
      key: "measurement_capacity",
      levels: [
        {
          title: "Litres (1-10)",
          mode: "procedural",
          askCount: 5,
          timeSeconds: 60,
          visualFormat: true,
          generator: function () {
            const value = randInt(1, 10);
            return {
              text: "What is the capacity? (L)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildJugSVG(value, 10, 2, "L"),
            };
          },
        },
        {
          title: "Millilitres (0-1000)",
          mode: "procedural",
          askCount: 5,
          timeSeconds: 60,
          visualFormat: true,
          generator: function () {
            const value = roundToStep(randInt(1, 1000), 50);
            return {
              text: "What is the capacity? (ml)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildJugSVG(value, 1000, 200, "ml"),
            };
          },
        },
      ],
    },
    {
      name: "Length",
      key: "measurement_length",
      levels: [
        {
          title: "Centimetres (0-15)",
          mode: "procedural",
          askCount: 5,
          timeSeconds: 60,
          visualFormat: true,
          generator: function () {
            const value = randInt(0, 15);
            return {
              text: "How long is the line? (cm)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildRulerSVG(value, 15, "cm"),
            };
          },
        },
        {
          title: "Millimetres (0-100)",
          mode: "procedural",
          askCount: 5,
          timeSeconds: 60,
          visualFormat: true,
          generator: function () {
            const value = roundToStep(randInt(0, 100), 5); // matches the ruler's 5mm tick precision
            return {
              text: "How long is the line? (mm)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildRulerSVG(value, 100, "mm"),
            };
          },
        },
      ],
    },
    {
      name: "Temperature",
      key: "measurement_temperature",
      levels: [
        {
          title: "Thermometer (-30 to 50)",
          mode: "procedural",
          askCount: 5,
          timeSeconds: 60,
          visualFormat: true,
          keyboardMode: "text",
          generator: function () {
            const value = roundToStep(randInt(-30, 50), 5);
            return {
              text: "What is the temperature? (\u00b0C, use - for below zero)",
              answer: value + "",
              dedupKey: value + "",
              visualHtml: buildThermometerSVG(value),
            };
          },
        },
      ],
    },
  ],
});

// ---- Assessment Test: reusable pattern for testing overall mastery of an
//      existing topic, by randomly sampling across ALL of its levels.
//      To add a future assessment level, just add one more entry to
//      ASSESSMENT_LEVEL_DEFS below pointing at any existing subtopic's
//      levels array -- no new engine code needed.
function getOneRandomQuestionFromLevel(level) {
  const mode = level.mode || "bank";
  if (mode === "bank") {
    const pair = level.bank[randInt(0, level.bank.length - 1)];
    const op = level.operator || "+";
    const ans = op === "-" ? pair[0] - pair[1] : pair[0] + pair[1];
    return {
      text: pair[0] + " " + op + " " + pair[1] + " = ?",
      answer: ans + "",
    };
  } else if (mode === "procedural") {
    return level.generator();
  } else if (mode === "block") {
    const block = level.blockGenerator();
    return block[randInt(0, block.length - 1)];
  }
}
function makeAssessmentGenerator(sourceLevels) {
  return function () {
    const lvl = sourceLevels[randInt(0, sourceLevels.length - 1)];
    return getOneRandomQuestionFromLevel(lvl);
  };
}

const ASSESSMENT_LEVEL_DEFS = [
  {
    title: "Addition 0 to 20",
    sourceLevels: TOPICS[0].subtopics[0].levels,
    practiceTopicName: "Addition (0 to 20)",
  },
  {
    title: "Subtraction 0 to 20",
    sourceLevels: TOPICS[1].subtopics[0].levels,
    practiceTopicName: "Subtraction (0 to 20)",
  },
  {
    title: "Addition & Subtraction 0 to 20",
    sourceLevels: TOPICS[2].subtopics[0].levels,
    practiceTopicName: "Addition & Subtraction (0 to 20)",
  },
  {
    title: "Add one digit to two digits",
    sourceLevels: TOPICS[0].subtopics[1].levels,
    practiceTopicName: "Addition: One-digit + Two-digit",
  },
  // Future assessments: add one line here, pointing at any subtopic's .levels array.
];

TOPICS.push({
  name: "KS1",
  subtopics: [
    {
      name: "Number Sense",
      key: "ks1_number_sense",
      levels: (() => {
        const ONES_WORDS = [
          "zero",
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
          "ten",
          "eleven",
          "twelve",
          "thirteen",
          "fourteen",
          "fifteen",
          "sixteen",
          "seventeen",
          "eighteen",
          "nineteen",
        ];
        const TENS_WORDS = [
          "",
          "",
          "twenty",
          "thirty",
          "forty",
          "fifty",
          "sixty",
          "seventy",
          "eighty",
          "ninety",
        ];
        function numberToWords(n) {
          if (n < 20) return ONES_WORDS[n];
          if (n < 100) {
            const t = Math.floor(n / 10),
              u = n % 10;
            return TENS_WORDS[t] + (u ? " " + ONES_WORDS[u] : "");
          }
          const h = Math.floor(n / 100),
            rem = n % 100;
          let r = ONES_WORDS[h] + " hundred";
          if (rem > 0) r += " and " + numberToWords(rem);
          return r;
        }
        // Each generator below reads (i, count) -- the question's position in
        // the round -- to make early questions easy and late questions hard,
        // within the SAME 10-question session (not level-to-level like
        // everywhere else in the app).
        function genValueOfDigit(i, total) {
          const progress = i / (total - 1);
          const numDigits = progress < 0.4 ? 2 : 3;
          const n = numDigits === 2 ? randInt(10, 99) : randInt(100, 999);
          const digits = String(n).split("");
          const pos = randInt(0, digits.length - 1);
          const placeValue = Math.pow(10, digits.length - 1 - pos);
          const digitValue = parseInt(digits[pos], 10) * placeValue;
          const displayDigits = digits
            .map((d, idx) => (idx === pos ? "<u>" + d + "</u>" : d))
            .join("");
          return {
            text: "Value of the underlined digit: " + displayDigits,
            answer: digitValue + "",
          };
        }
        function genPlaceValueToNumber(i, total) {
          const progress = i / (total - 1);
          const h = progress < 0.3 ? randInt(0, 3) : randInt(1, 9);
          const t = randInt(0, 9);
          const u = randInt(0, 9);
          const number = h * 100 + t * 10 + u;
          const naturalParts = [h + " hundreds", t + " tens", u + " units"];
          const displayParts =
            progress < 0.4 ? naturalParts : shuffle(naturalParts);
          return {
            text: "Write the number: " + displayParts.join(", "),
            answer: number + "",
          };
        }
        function genWordsToNumber(i, total) {
          const progress = i / (total - 1);
          let n;
          if (progress < 0.3) n = randInt(0, 20);
          else if (progress < 0.6) n = randInt(21, 99);
          else n = randInt(100, 999);
          return {
            text: 'Write in digits: "' + numberToWords(n) + '"',
            answer: n + "",
          };
        }
        function genOddEven(i, total) {
          const progress = i / (total - 1);
          let n;
          if (progress < 0.4) n = randInt(0, 20);
          else if (progress < 0.7) n = randInt(21, 99);
          else n = randInt(100, 999);
          return {
            text: "Is " + n + " odd or even? (1 for odd, 0 for even)",
            answer: (n % 2 === 1 ? 1 : 0) + "",
          };
        }
        function genCountSequence(i, total) {
          const progress = i / (total - 1);
          const stepSize = progress < 0.4 ? 1 : progress < 0.7 ? 5 : 10;
          const ascending = Math.random() < 0.5;
          const step = ascending ? stepSize : -stepSize;
          const maxRange = stepSize === 1 ? 30 : stepSize === 5 ? 170 : 190;
          const start = ascending
            ? randInt(0, maxRange - 3 * stepSize)
            : randInt(3 * stepSize, maxRange);
          const seq = [start, start + step, start + 2 * step, start + 3 * step];
          return {
            text:
              seq[0] +
              ", " +
              seq[1] +
              ", " +
              seq[2] +
              ", ? \u2014 what comes next?",
            answer: seq[3] + "",
          };
        }
        function genDoubleHalf(i, total) {
          const progress = i / (total - 1);
          if (progress < 0.5) {
            const n = progress < 0.25 ? randInt(1, 10) : randInt(1, 50);
            return { text: "Double " + n + " = ?", answer: n * 2 + "" };
          } else {
            const base = progress < 0.75 ? randInt(1, 20) : randInt(1, 50);
            const n = base * 2;
            return { text: "Half of " + n + " = ?", answer: base + "" };
          }
        }
        function genNumberLineMissing(i, total) {
          const progress = i / (total - 1);
          const step = progress < 0.4 ? 1 : progress < 0.7 ? 5 : 10;
          const maxRange = step === 1 ? 20 : step === 5 ? 150 : 180;
          const start = randInt(0, Math.max(0, maxRange - 4 * step));
          const idx = randInt(1, 3);
          const points = [
            start,
            start + step,
            start + 2 * step,
            start + 3 * step,
            start + 4 * step,
          ];
          const missingValue = points[idx];
          const shown = points.map((p, k) => (k === idx ? "?" : p)).join(", ");
          return {
            text: "Fill in the missing number: " + shown,
            answer: missingValue + "",
          };
        }
        // 5 distinct numbers, order them smallest-to-largest or largest-to-smallest
        // (direction picked at random each question) -- answer is a comma
        // list, so this level uses keyboardMode: "text" below.
        function genOrderNumbers(i, total) {
          const progress = i / (total - 1);
          const maxVal = progress < 0.4 ? 20 : progress < 0.7 ? 99 : 999;
          const nums = new Set();
          while (nums.size < 5) nums.add(randInt(0, maxVal));
          const arr = [...nums];
          const ascending = Math.random() < 0.5;
          const sorted = [...arr].sort((a, b) => (ascending ? a - b : b - a));
          const direction = ascending
            ? "smallest to largest"
            : "largest to smallest";
          return {
            text:
              "Order these " +
              direction +
              " (commas, no spaces): " +
              arr.join(", "),
            answer: sorted.join(","),
          };
        }
        // All possible 2-digit (later 3-digit) numbers from a set of distinct
        // digits. checkAnswer compares the typed SET regardless of the order
        // the student lists them in.
        function permutations(arr) {
          if (arr.length <= 1) return [arr];
          const result = [];
          for (let i = 0; i < arr.length; i++) {
            const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
            permutations(rest).forEach((p) => result.push([arr[i], ...p]));
          }
          return result;
        }
        function genCreateNumbers(i, total) {
          const progress = i / (total - 1);
          const digitCount = progress < 0.5 ? 2 : 3;
          const digits = [];
          while (digits.length < digitCount) {
            const d = randInt(1, 9);
            if (!digits.includes(d)) digits.push(d);
          }
          const perms = permutations(digits).map((p) =>
            parseInt(p.join(""), 10),
          );
          const sortedPerms = [...perms].sort((a, b) => a - b);
          return {
            text:
              "Write all the " +
              digitCount +
              "-digit numbers using " +
              digits.join(", ") +
              " (each digit once, commas no spaces)",
            answer: sortedPerms.join(","),
            checkAnswer: (typed) => {
              const typedNums = typed
                .split(",")
                .map((s) => parseInt(s.trim(), 10))
                .filter((n) => !isNaN(n))
                .sort((a, b) => a - b);
              return JSON.stringify(typedNums) === JSON.stringify(sortedPerms);
            },
          };
        }
        // Cycles through 3 question types using 4 distinct digits: smallest
        // possible number, largest possible number, and (since several
        // answers are valid) a number strictly between two round-ten bounds
        // using any two of the digits -- checkAnswer accepts any valid one.
        function genSmallestLargestBetween(i) {
          const typeIdx = i % 3;
          // 5 distinct digits, matching the PDF's exercise: smallest/largest
          // use only 3 of them (not all 5) to form a genuine 3-digit number.
          const digits = [];
          while (digits.length < 5) {
            const d = randInt(1, 9);
            if (!digits.includes(d)) digits.push(d);
          }
          if (typeIdx === 0) {
            const smallest = parseInt(
              [...digits]
                .sort((a, b) => a - b)
                .slice(0, 3)
                .join(""),
              10,
            );
            return {
              text:
                "Using digits " +
                digits.join(", ") +
                ", write the SMALLEST possible 3-digit number",
              answer: smallest + "",
            };
          }
          if (typeIdx === 1) {
            const largest = parseInt(
              [...digits]
                .sort((a, b) => b - a)
                .slice(0, 3)
                .join(""),
              10,
            );
            return {
              text:
                "Using digits " +
                digits.join(", ") +
                ", write the LARGEST possible 3-digit number",
              answer: largest + "",
            };
          }
          const pairs = [];
          for (let a = 0; a < digits.length; a++)
            for (let b = 0; b < digits.length; b++)
              if (a !== b) pairs.push(digits[a] * 10 + digits[b]);
          const target = pairs[randInt(0, pairs.length - 1)];
          const A = Math.floor(target / 10) * 10,
            B = A + 10;
          const validAnswers = pairs.filter((p) => p > A && p < B);
          return {
            text:
              "Using two of the digits " +
              digits.join(", ") +
              ", write a number between " +
              A +
              " and " +
              B,
            answer: validAnswers.join(" or "),
            checkAnswer: (typed) => {
              const val = parseInt(typed.trim(), 10);
              if (isNaN(val) || val <= A || val >= B) return false;
              const typedDigits = String(val).split("").map(Number);
              if (typedDigits.length !== 2 || typedDigits[0] === typedDigits[1])
                return false;
              return typedDigits.every((d) => digits.includes(d));
            },
          };
        }
        function toOrdinal(n) {
          if (n % 100 >= 11 && n % 100 <= 13) return n + "th";
          const last = n % 10;
          if (last === 1) return n + "st";
          if (last === 2) return n + "nd";
          if (last === 3) return n + "rd";
          return n + "th";
        }
        function genOrdinal(i, total) {
          const progress = i / (total - 1);
          const n = progress < 0.6 ? randInt(1, 10) : randInt(11, 31);
          return {
            text: "Write " + n + " as an ordinal number (e.g. 1st, 2nd, 3rd)",
            answer: toOrdinal(n),
          };
        }
        return [
          {
            title: "Value of a digit",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 60,
            explanationKey: "placevalue",
            generator: genValueOfDigit,
          },
          {
            title: "Place values to number",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 60,
            explanationKey: "placevalue",
            generator: genPlaceValueToNumber,
          },
          {
            title: "Words to numbers",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 60,
            generator: genWordsToNumber,
          },
          {
            title: "Odd or even?",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 40,
            explanationKey: "oddeven",
            generator: genOddEven,
          },
          {
            title: "Count forward and backward",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 60,
            generator: genCountSequence,
          },
          {
            title: "Double and half",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 45,
            generator: genDoubleHalf,
          },
          {
            title: "The number line",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 50,
            generator: genNumberLineMissing,
          },
          {
            title: "Ordering numbers",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 90,
            keyboardMode: "text",
            generator: genOrderNumbers,
          },
          {
            title: "Create numbers from digits",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 90,
            keyboardMode: "text",
            generator: genCreateNumbers,
          },
          {
            title: "Smallest, largest, and between",
            mode: "procedural",
            askCount: 9,
            timeSeconds: 90,
            generator: genSmallestLargestBetween,
          },
          {
            title: "Ordinal numbers",
            mode: "procedural",
            askCount: 10,
            timeSeconds: 60,
            keyboardMode: "text",
            generator: genOrdinal,
          },
        ];
      })(),
    },
  ],
});

TOPICS.push({
  name: "Assessment Test",
  subtopics: [
    {
      name: "General",
      key: "assessment_general",
      levels: ASSESSMENT_LEVEL_DEFS.map((def) => ({
        title: def.title,
        mode: "procedural",
        askCount: 10,
        timeSeconds: 40, // 🔧 example: adjust per-assessment if needed
        generator: makeAssessmentGenerator(def.sourceLevels),
        practiceTopicName: def.practiceTopicName,
      })),
    },
  ],
});

// ---- Learn tab content ----
// Each explanation is a series of steps. A step's "html" can be any markup
// (plain text, a column-arithmetic display, styled highlights) and
// "caption" is the plain-English sentence shown under it. Add a class of
// "explain-highlight" to any element you want to draw attention to --
// it gets a gentle pulsing highlight automatically (see the CSS above).
//
// To add a new explanation: copy one of the two below, give it a unique
// key, and add it to the EXPLANATIONS array. No other code needs to change.
const EXPLANATIONS = [
  {
    key: "bridging10",
    title: "Bridging through 10",
    subtitle: "The strategy behind fast addition",
    steps: [
      {
        html: '<div class="q-label">8 + 5 = ?</div>',
        caption:
          "Let's add 8 and 5. Instead of counting one by one, we can use a shortcut.",
      },
      {
        html: '<div class="q-label">8 + <span class="explain-highlight">2</span> + <span class="explain-highlight">3</span> = ?</div>',
        caption:
          "Break the 5 into 2 and 3. Why 2? Because 8 only needs 2 more to make a full ten!",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">8 + 2</span> = 10</div>',
        caption: "8 + 2 = 10 — a nice round number that's easy to work with.",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">10 + 3</span> = 13</div>',
        caption: "Now just add the leftover 3. 10 + 3 = 13. That's the answer!",
      },
      {
        html: '<div class="q-label" style="color:var(--green);">8 + 5 = 13 ✓</div>',
        caption:
          "This trick works for any numbers that add past 10 — always look for the ten first.",
      },
    ],
  },
  {
    key: "columnaddition",
    title: "Column Addition",
    subtitle: "Lining up the columns",
    steps: [
      {
        html: buildColumnMathHTMLPreview(34, 25, "+"),
        caption:
          "Line up the numbers by place value — ones under ones, tens under tens.",
      },
      {
        html: buildColumnMathHTMLPreview(34, 25, "+", { highlightCol: "ones" }),
        caption: "Start with the ones column: 4 + 5 = 9.",
      },
      {
        html: buildColumnMathHTMLPreview(34, 25, "+", {
          highlightCol: "ones",
          showAnswer: "9",
        }),
        caption: "Write 9 in the ones place, under the line.",
      },
      {
        html: buildColumnMathHTMLPreview(34, 25, "+", {
          highlightCol: "tens",
          showAnswer: "9",
        }),
        caption: "Now the tens column: 3 + 2 = 5.",
      },
      {
        html: buildColumnMathHTMLPreview(34, 25, "+", {
          highlightCol: "tens",
          showAnswer: "59",
        }),
        caption: "Write 5 in the tens place. The full answer is 59!",
      },
    ],
  },
  {
    key: "doubling",
    title: "Doubling numbers",
    subtitle: "Double the tens, double the ones",
    steps: [
      {
        html: '<div class="q-label">24 + 24 = ?</div>',
        caption: "Doubling means adding a number to itself. Let's double 24.",
      },
      {
        html: '<div class="q-label">24 = <span class="explain-highlight">20</span> + <span class="explain-highlight">4</span></div>',
        caption: "Split 24 into tens and ones: 20 and 4.",
      },
      {
        html: '<div class="q-label">Double <span class="explain-highlight">20</span> = 40</div>',
        caption:
          "Double the tens first. 2 tens + 2 tens = 4 tens, which is 40.",
      },
      {
        html: '<div class="q-label">Double <span class="explain-highlight">4</span> = 8</div>',
        caption: "Now double the ones. 4 + 4 = 8.",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">40 + 8</span> = 48</div>',
        caption: "Put the two parts back together: 40 + 8 = 48.",
      },
      {
        html: '<div class="q-label" style="color:var(--green);">24 + 24 = 48 ✓</div>',
        caption:
          "Near a tens number? 19 + 19 is double 20 (40) take away 2, which is 38.",
      },
    ],
  },
  {
    key: "bridgingback10",
    title: "Bridging back through 10",
    subtitle: "The strategy behind fast subtraction",
    steps: [
      {
        html: '<div class="q-label">13 - 5 = ?</div>',
        caption:
          "Let's subtract 5 from 13. Instead of counting backward one by one, we can use a shortcut.",
      },
      {
        html: '<div class="q-label">13 - <span class="explain-highlight">3</span> - <span class="explain-highlight">2</span> = ?</div>',
        caption:
          "Break the 5 into 3 and 2. Why 3? Because 13 only needs to lose 3 to reach a full ten!",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">13 - 3</span> = 10</div>',
        caption: "13 - 3 = 10 — back to a nice round number.",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">10 - 2</span> = 8</div>',
        caption:
          "Now just subtract the leftover 2. 10 - 2 = 8. That's the answer!",
      },
      {
        html: '<div class="q-label" style="color:var(--green);">13 - 5 = 8 ✓</div>',
        caption:
          "This trick works for subtracting past a ten — bridge back to the nearest ten first.",
      },
    ],
  },
  {
    key: "columnsubtraction",
    title: "Column Subtraction",
    subtitle: "Lining up the columns to subtract",
    steps: [
      {
        html: buildColumnMathHTMLPreview(58, 23, "-"),
        caption:
          "Line up the numbers by place value — ones under ones, tens under tens.",
      },
      {
        html: buildColumnMathHTMLPreview(58, 23, "-", { highlightCol: "ones" }),
        caption: "Start with the ones column: 8 - 3 = 5.",
      },
      {
        html: buildColumnMathHTMLPreview(58, 23, "-", {
          highlightCol: "ones",
          showAnswer: "5",
        }),
        caption: "Write 5 in the ones place, under the line.",
      },
      {
        html: buildColumnMathHTMLPreview(58, 23, "-", {
          highlightCol: "tens",
          showAnswer: "5",
        }),
        caption: "Now the tens column: 5 - 2 = 3.",
      },
      {
        html: buildColumnMathHTMLPreview(58, 23, "-", {
          highlightCol: "tens",
          showAnswer: "35",
        }),
        caption: "Write 3 in the tens place. The full answer is 35!",
      },
    ],
  },
  {
    key: "placevalue",
    title: "Place Value",
    subtitle: "What each digit in a number is really worth",
    steps: [
      {
        html: '<div class="q-label">3 5</div>',
        caption:
          "Every digit in a number has a value that depends on WHERE it sits, not just what digit it is.",
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">3</span> 5</div>',
        caption:
          "This 3 is in the tens place. It's not worth 3 -- it's worth 3 tens, which is 30.",
      },
      {
        html: '<div class="q-label">3 <span class="explain-highlight">5</span></div>',
        caption: "This 5 is in the ones place. It's worth exactly 5.",
      },
      {
        html: '<div class="q-label">30 + 5 = 35</div>',
        caption:
          'Put them together: 30 and 5 make 35. That\'s what "place value" means.',
      },
      {
        html: '<div class="q-label"><span class="explain-highlight">3</span> 5 6</div>',
        caption:
          "Now a 3-digit number: 356. This 3 is in the HUNDREDS place -- it's worth 300, not 3.",
      },
      {
        html: '<div class="q-label">3 <span class="explain-highlight">5</span> 6</div>',
        caption: "This 5 is in the tens place -- it's worth 50.",
      },
      {
        html: '<div class="q-label">3 5 <span class="explain-highlight">6</span></div>',
        caption: "This 6 is in the ones place -- it's worth exactly 6.",
      },
      {
        html: '<div class="q-label">300 + 50 + 6 = 356</div>',
        caption:
          "300 and 50 and 6 make 356. The same digit is worth ten times more each time it shifts one place to the left.",
      },
    ],
  },
  {
    key: "oddeven",
    title: "Odd and Even Numbers",
    subtitle: "How to tell them apart in a glance",
    steps: [
      {
        html: '<div class="q-label">4, 8, 12, 16, 20...</div>',
        caption:
          "Even numbers can be split into two equal groups, with nothing left over.",
      },
      {
        html: '<div class="q-label">Even numbers always end in <span class="explain-highlight">0, 2, 4, 6, 8</span></div>',
        caption:
          "You never need to check the whole number -- just look at the LAST digit.",
      },
      {
        html: '<div class="q-label">3, 7, 11, 15, 19...</div>',
        caption:
          "Odd numbers always have one left over when you try to split them into two equal groups.",
      },
      {
        html: '<div class="q-label">Odd numbers always end in <span class="explain-highlight">1, 3, 5, 7, 9</span></div>',
        caption: "Same trick -- just check the last digit.",
      },
      {
        html: '<div class="q-label">Is 356 odd or even? &rarr; <span class="explain-highlight">6</span> &rarr; even!</div>',
        caption:
          "Even a big number like 356 is easy -- its last digit is 6, so 356 is even.",
      },
    ],
  },
  {
    key: "whatismultiplication",
    title: "What is Multiplication?",
    subtitle: "A shortcut for repeated addition",
    steps: [
      {
        html: '<div class="q-label">2 + 2 + 2 + 2 + 2 = 10</div>',
        caption:
          "Adding the same number again and again gets slow to write out -- here we added 2, five times.",
      },
      {
        html: '<div class="q-label">2 <span class="explain-highlight">&times; 5</span> = 10</div>',
        caption:
          'Multiplication is a shortcut for exactly that: "2 times 5" means "2, five times" -- same answer, much shorter.',
      },
      {
        html: buildTimesTableHTML(1),
        caption:
          "Here's the full 1 times table. Anything multiplied by 1 stays exactly the same -- worth memorising before you start!",
      },
    ],
  },
  {
    key: "times2table",
    title: "The 2 Times Table",
    subtitle: "Memorise this before practicing",
    steps: [
      {
        html: buildTimesTableHTML(2),
        caption:
          "The 2 times table -- notice every answer is an even number, and each one is 2 more than the last.",
      },
    ],
  },
  {
    key: "times5table",
    title: "The 5 Times Table",
    subtitle: "Memorise this before practicing",
    steps: [
      {
        html: buildTimesTableHTML(5),
        caption:
          "The 5 times table -- notice every answer ends in either 0 or 5.",
      },
    ],
  },
  {
    key: "times10table",
    title: "The 10 Times Table",
    subtitle: "Memorise this before practicing",
    steps: [
      {
        html: buildTimesTableHTML(10),
        caption:
          "The 10 times table -- the easiest one! Just write the number you're multiplying, then add a 0 after it.",
      },
    ],
  },
];
// A compact reference grid for the Learn tab, showing every fact in a
// times table from 0 to 12 at once (used for "memorise before you start").
function buildTimesTableHTML(multiplier) {
  let rows = "";
  for (let n = 0; n <= 12; n++) {
    rows +=
      '<div style="padding:4px 8px;border-bottom:1px solid var(--border);">' +
      multiplier +
      " &times; " +
      n +
      " = <strong>" +
      multiplier * n +
      "</strong></div>";
  }
  return (
    '<div style="max-height:280px;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:0 12px;font-size:15px;margin:14px 0;">' +
    rows +
    "</div>"
  );
}
// Builds a static (non-interactive) column display for the Learn tab,
// with an optional highlighted column and a partially/fully written answer.
function buildColumnMathHTMLPreview(a, b, operator, opts) {
  opts = opts || {};
  const width = Math.max(String(a).length, String(b).length);
  const aStr = String(a).padStart(width, " ");
  const bStr = String(b).padStart(width, " ");
  const answerStr = opts.showAnswer
    ? String(opts.showAnswer).padStart(width, " ")
    : "";
  function cellStyle(colFromRight) {
    const isHighlighted =
      (opts.highlightCol === "ones" && colFromRight === 0) ||
      (opts.highlightCol === "tens" && colFromRight === 1);
    return (
      "width:30px;padding:2px 4px;" +
      (isHighlighted ? "background:#fff3cd;border-radius:6px;" : "")
    );
  }
  let topRow = '<td style="width:30px;"></td>';
  for (let i = 0; i < width; i++)
    topRow +=
      '<td style="' +
      cellStyle(width - 1 - i) +
      '">' +
      (aStr[i] === " " ? "" : aStr[i]) +
      "</td>";
  let bottomRow =
    '<td style="width:30px;color:var(--blue);">' + operator + "</td>";
  for (let i = 0; i < width; i++)
    bottomRow +=
      '<td style="' +
      cellStyle(width - 1 - i) +
      '">' +
      (bStr[i] === " " ? "" : bStr[i]) +
      "</td>";
  let answerRow = "";
  if (opts.showAnswer) {
    answerRow = '<td style="width:30px;"></td>';
    for (let i = 0; i < width; i++)
      answerRow +=
        '<td style="width:30px;padding:2px 4px;color:var(--green);">' +
        (answerStr[i] === " " ? "" : answerStr[i]) +
        "</td>";
  }
  return (
    '<div style="display:flex;justify-content:center;margin:20px 0;">' +
    '<table style="border-collapse:collapse;font-size:26px;font-weight:700;color:var(--ink);text-align:right;">' +
    "<tr>" +
    topRow +
    "</tr>" +
    "<tr>" +
    bottomRow +
    "</tr>" +
    '<tr><td colspan="' +
    (width + 1) +
    '" style="border-bottom:3px solid var(--ink);padding-top:4px;"></td></tr>' +
    (answerRow ? "<tr>" + answerRow + "</tr>" : "") +
    "</table></div>"
  );
}

// =========================================================
// ============ ENGINE SECTION — no need to edit ============
// =========================================================

const TIME_PER_QUESTION_SECONDS = 12;

// =========================================================
// Safe storage + error hardening
// =========================================================
let storageAvailable = true;
try {
  localStorage.setItem("__t__", "1");
  localStorage.removeItem("__t__");
} catch (e) {
  storageAvailable = false;
}
const memoryFallback = {};
function safeGet(key) {
  if (storageAvailable) {
    try {
      return localStorage.getItem(key);
    } catch (e) {}
  }
  return Object.prototype.hasOwnProperty.call(memoryFallback, key)
    ? memoryFallback[key]
    : null;
}
function safeSet(key, value) {
  if (storageAvailable) {
    try {
      localStorage.setItem(key, value);
      return;
    } catch (e) {}
  }
  memoryFallback[key] = value;
}
function showFatalError(message) {
  const card = document.getElementById("card");
  if (card) {
    card.innerHTML =
      '<div class="center">' +
      '<div class="error-text" style="font-weight:600;margin-bottom:8px;">Something went wrong</div>' +
      '<div class="error-text" style="font-size:12px;word-break:break-word;">' +
      String(message) +
      "</div></div>";
  }
}
window.addEventListener("error", (e) => {
  showFatalError(e.message || "Unknown error");
});
function safeHandler(fn) {
  return function (...args) {
    try {
      return fn.apply(this, args);
    } catch (err) {
      showFatalError(err && err.message ? err.message : String(err));
    }
  };
}

// =========================================================
// Question picking: no repeat within a round; flip operand order
// if the bank is ever smaller than the round size.
// =========================================================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickQuestionsFromBank(bank, count, operator) {
  operator = operator || "+";
  const shuffled = shuffle(bank);
  const result = [];
  let idx = 0,
    pass = 0;
  while (result.length < count) {
    if (idx >= shuffled.length) {
      idx = 0;
      pass++;
    }
    const [a, b] = shuffled[idx];
    const flip = pass % 2 === 1;
    const pair = flip ? [b, a] : [a, b];
    const answer = operator === "-" ? pair[0] - pair[1] : pair[0] + pair[1];
    result.push({
      text: pair[0] + " " + operator + " " + pair[1] + " = ?",
      answer: answer + "",
    });
    idx++;
  }
  return result;
}

// Generates `count` questions from a procedural generator function (one that
// returns a single {text, answer} each call), avoiding repeats within the
// round wherever the generator's range allows it. The generator is called
// as genFn(index, count) -- existing generators that don't declare those
// parameters simply ignore them, so this is fully backward-compatible and
// lets any level opt into progressive difficulty (easy first, hard last)
// just by reading the index argument.
// Uniqueness is checked on q.dedupKey when a question provides one, else
// falls back to q.text. This matters for visual questions (a clock, a
// dial...) where the on-screen instruction text is always the same
// sentence regardless of which value is actually shown -- text alone
// would never catch a repeat there.
function generateUniqueProceduralQuestions(genFn, count) {
  const questions = [];
  const seen = new Set();
  for (let i = 0; i < count; i++) {
    let q,
      attempts = 0;
    do {
      q = genFn(i, count);
      attempts++;
    } while (seen.has(q.dedupKey || q.text) && attempts < 40);
    seen.add(q.dedupKey || q.text);
    questions.push(q);
  }
  return questions;
}

// Generates a "block" of related questions (e.g. a fact family) repeated
// several times, avoiding the exact same block recurring within a round.
function generateBlockQuestions(blockFn, repeats) {
  const questions = [];
  const seenBlocks = new Set();
  for (let i = 0; i < repeats; i++) {
    let block,
      attempts = 0;
    do {
      block = blockFn();
      attempts++;
    } while (
      seenBlocks.has(JSON.stringify(block.map((q) => q.text))) &&
      attempts < 40
    );
    seenBlocks.add(JSON.stringify(block.map((q) => q.text)));
    questions.push(...block);
  }
  return questions;
}

// =========================================================
// Student ID + storage
// =========================================================
function pad(n, len) {
  return String(n).padStart(len, "0");
}
function sanitizeCode(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function loadRegistry() {
  try {
    return JSON.parse(safeGet("mm_registry") || "{}");
  } catch (e) {
    return {};
  }
}
function saveRegistry(reg) {
  safeSet("mm_registry", JSON.stringify(reg));
}

function loadStudent(id) {
  try {
    const raw = safeGet("mm_student_" + id);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        id: id,
        cumulativePoints: parsed.cumulativePoints || 0,
        purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
        subtopicProgress: parsed.subtopicProgress || {}, // { [subtopicKey]: { currentLevel, levelStats: { [levelIdx]: {previousTime, attempts} } } }
        pointsHistory: Array.isArray(parsed.pointsHistory)
          ? parsed.pointsHistory
          : [], // [{timestamp, points}] one entry per completed round
      };
    }
  } catch (e) {}
  return {
    id: id,
    cumulativePoints: 0,
    purchases: [],
    subtopicProgress: {},
    pointsHistory: [],
  };
}
function saveStudent(s) {
  safeSet("mm_student_" + s.id, JSON.stringify(s));
}

function getSubtopicProgress(student, key) {
  if (!student.subtopicProgress[key]) {
    student.subtopicProgress[key] = { currentLevel: 0, levelStats: {} }; // 0-indexed level
  }
  return student.subtopicProgress[key];
}

// =========================================================
// Prize catalog (same as before)
// =========================================================
// ------------------------------------------------------------------
// SHOP ITEMS -- how to add / update prizes
//  Option A (no code): put a published Google Sheet CSV link in SHOP_FEED_URL.
//     Columns: id, name, cost, category, image, active. Edit the sheet any
//     time -- the app picks up changes next time it opens. If the link is
//     empty or unreachable, the built-in list below is used instead.
//  Option B (edit code): add lines to BUILT_IN_SHOP_ITEMS below.
// Purchase history stores each item's name + cost at the time of purchase,
// so changing or removing items later never alters past history.
// ------------------------------------------------------------------
const SHOP_FEED_URL = ""; // e.g. "https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv"
const BUILT_IN_SHOP_ITEMS = [
  {
    id: "star",
    name: "Gold Star",
    cost: 100,
    category: "Badges",
    icon: iconStar,
  },
  {
    id: "book",
    name: "Book Token",
    cost: 300,
    category: "Vouchers",
    icon: iconBook,
  },
  {
    id: "trophy",
    name: "Trophy Badge",
    cost: 600,
    category: "Badges",
    icon: iconTrophy,
  },
  {
    id: "rocket",
    name: "Rocket Badge",
    cost: 900,
    category: "Badges",
    icon: iconRocket,
  },
  {
    id: "gift",
    name: "Mystery Gift",
    cost: 1200,
    category: "Gifts",
    icon: iconGift,
  },
  {
    id: "crown",
    name: "Maths Champion Crown",
    cost: 2000,
    category: "Badges",
    icon: iconCrown,
  },
];
let shopItems = BUILT_IN_SHOP_ITEMS.slice();
const SHOP_PAGE_SIZE = 12;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function parseCSV(text) {
  const rows = [];
  let row = [],
    field = "",
    inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') inQ = false;
      else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((c) => c.trim() !== "")) rows.push(row);
  return rows;
}
// Turns CSV text into a clean item list. Rows that are inactive or
// invalid (missing name, cost not a positive number) are skipped.
function shopItemsFromCSV(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  const items = [],
    seenIds = new Set();
  rows.slice(1).forEach((r) => {
    const get = (name) =>
      col(name) >= 0 && r[col(name)] !== undefined ? r[col(name)].trim() : "";
    const name = get("name"),
      cost = parseInt(get("cost"), 10);
    const active = get("active").toLowerCase();
    if (!name || !(cost > 0)) return;
    if (["no", "false", "0", "n"].indexOf(active) >= 0) return;
    let id = get("id") || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (seenIds.has(id)) return;
    seenIds.add(id);
    const image = /^https?:\/\//i.test(get("image")) ? get("image") : "";
    items.push({
      id: id,
      name: name,
      cost: cost,
      category: get("category") || "Other",
      image: image,
    });
  });
  return items;
}
function useShopItems(items) {
  if (!items.length) return false;
  shopItems = items;
  return true;
}
// Loads the online list (if a link is set). Uses the last good copy
// instantly when offline, so the shop never comes up empty.
function loadShopFeed(url) {
  url = url === undefined ? SHOP_FEED_URL : url;
  if (!url) return Promise.resolve(false);
  try {
    const cached = safeGet("mm_shop_cache");
    if (cached) useShopItems(JSON.parse(cached));
  } catch (e) {}
  return fetch(url, { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then((text) => {
      const items = shopItemsFromCSV(text);
      if (!useShopItems(items)) return false;
      safeSet("mm_shop_cache", JSON.stringify(items));
      if (state.phase === "shop") render();
      return true;
    })
    .catch(() => false);
}
function iconStar() {
  return '<svg viewBox="0 0 100 100"><polygon points="50,6 61,38 96,38 68,59 78,92 50,72 22,92 32,59 4,38 39,38" fill="#d9a441"/></svg>';
}
function iconBook() {
  return '<svg viewBox="0 0 100 100"><rect x="20" y="15" width="60" height="70" rx="4" fill="#4a90d9"/><line x1="50" y1="15" x2="50" y2="85" stroke="#3574b5" stroke-width="3"/></svg>';
}
function iconTrophy() {
  return '<svg viewBox="0 0 100 100"><path d="M30 20 h40 v20 a20 20 0 0 1 -40 0 z" fill="#d9a441"/><rect x="45" y="55" width="10" height="18" fill="#d9a441"/><rect x="35" y="73" width="30" height="8" rx="2" fill="#d9a441"/></svg>';
}
function iconRocket() {
  return '<svg viewBox="0 0 100 100"><path d="M50 10 C65 25 68 50 60 70 H40 C32 50 35 25 50 10 Z" fill="#e0715a"/><circle cx="50" cy="40" r="8" fill="#fff"/></svg>';
}
function iconGift() {
  return '<svg viewBox="0 0 100 100"><rect x="20" y="40" width="60" height="45" fill="#2f9e6e"/><rect x="20" y="30" width="60" height="14" fill="#267a56"/><rect x="46" y="30" width="8" height="55" fill="#d9a441"/></svg>';
}
function iconCrown() {
  return '<svg viewBox="0 0 100 100"><polygon points="15,75 15,40 32,55 50,25 68,55 85,40 85,75" fill="#d9a441"/><rect x="15" y="75" width="70" height="10" fill="#b8862f"/></svg>';
}

// =========================================================
// App state
// =========================================================
let state = {
  phase: "codeEntry", // codeEntry | home | subtopics | levelView | practicing | result | shop
  code: null,
  student: null,
  topicIdx: null,
  subtopicIdx: null,
  questions: [],
  index: 0,
  correctCount: 0,
  startTime: null,
  answers: [],
  timerInterval: null,
  lastResult: null,
  codeError: "",
};

function formatTime(sec) {
  const m = Math.floor(sec / 60),
    s = Math.floor(sec % 60);
  return m + ":" + String(s).padStart(2, "0");
}
function currentSubtopic() {
  return TOPICS[state.topicIdx].subtopics[state.subtopicIdx];
}

function enterCode() {
  const input = document.getElementById("codeInput");
  const code = sanitizeCode(input.value);
  if (!code) {
    state.codeError = "Please type a name or code.";
    render();
    return;
  }
  state.code = code;
  state.student = loadStudent(code);
  state.codeError = "";
  state.phase = "home";
  render();
}
function switchStudent() {
  clearInterval(state.timerInterval);
  state.phase = "codeEntry";
  state.code = null;
  state.student = null;
  render();
}

function openTopic(topicIdx) {
  state.topicIdx = topicIdx;
  state.phase = "subtopics";
  render();
}
function openSubtopic(subtopicIdx) {
  state.subtopicIdx = subtopicIdx;
  state.phase = "levelView";
  render();
}

function startPractice(levelIdx) {
  const subtopic = currentSubtopic();
  const level = subtopic.levels[levelIdx];
  state.practicingLevelIdx = levelIdx;
  const mode = level.mode || "bank";
  if (mode === "bank") {
    state.questions = pickQuestionsFromBank(
      level.bank,
      level.askCount,
      level.operator,
    );
  } else if (mode === "procedural") {
    state.questions = generateUniqueProceduralQuestions(
      level.generator,
      level.askCount,
    );
  } else if (mode === "block") {
    state.questions = generateBlockQuestions(
      level.blockGenerator,
      level.blockRepeats,
    );
  }
  state.index = 0;
  state.startTime = Date.now();
  state.answers = new Array(state.questions.length).fill(null);
  state.phase = "practicing";
  render();
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    const el = document.getElementById("liveTimer");
    if (el) el.textContent = formatTime((Date.now() - state.startTime) / 1000);
  }, 200);
}

// Reads the currently-typed answer, whichever input mode this level uses:
// a single text box, or (for columnFormat levels) a row of one-digit boxes.
function getTypedAnswer() {
  const boxes = document.querySelectorAll(".digit-box");
  if (boxes.length > 0) {
    return Array.from(boxes)
      .map((b) => b.value)
      .join("");
  }
  const input = document.getElementById("answerInput");
  return input ? input.value.trim() : "";
}

function recordCurrentAnswer() {
  const val = getTypedAnswer();
  const q = state.questions[state.index];
  // Most questions check exact equality (whitespace-insensitive, so a
  // comma-list answer like "12, 45, 82" still matches "12,45,82"). A
  // question can instead supply checkAnswer(typedValue) for cases with
  // more than one valid answer, or where order/formatting shouldn't matter.
  const normalize = (s) => s.replace(/\s+/g, "");
  const isCorrect = q.checkAnswer
    ? q.checkAnswer(val)
    : normalize(val) === normalize(q.answer);
  state.answers[state.index] = {
    text: q.text,
    correctAnswer: q.answer,
    userAnswer: val,
    isCorrect: isCorrect,
  };
}

function goToQuestion(newIndex) {
  state.index = newIndex;
  render();
}

function goBack() {
  recordCurrentAnswer();
  if (state.index > 0) goToQuestion(state.index - 1);
}

function nextQuestion() {
  recordCurrentAnswer();
  if (state.index + 1 < state.questions.length) {
    goToQuestion(state.index + 1);
    return;
  }
  finishRound();
}

function finishRound() {
  clearInterval(state.timerInterval);
  const elapsed = (Date.now() - state.startTime) / 1000;
  const subtopic = currentSubtopic();
  const level = subtopic.levels[state.practicingLevelIdx];
  const total = state.questions.length;
  // Uses the level's own explicit time limit if the content defines one
  // (level.timeSeconds), otherwise falls back to the default per-question pace.
  const targetTime = level.timeSeconds || total * TIME_PER_QUESTION_SECONDS;
  // Computed fresh from the answers array (not tracked incrementally) so
  // that going back and correcting a mistake is reflected accurately.
  const correctCount = state.answers.filter((a) => a && a.isCorrect).length;

  const progress = getSubtopicProgress(state.student, subtopic.key);
  const rawStat = progress.levelStats[state.practicingLevelIdx] || {};
  // bestTime is the true personal record (only ever set from a 100%-correct
  // attempt). Older saved data only has previousTime, so fall back to that
  // once as a starting estimate for students with existing progress.
  const stat = {
    previousTime: rawStat.previousTime ?? null,
    bestTime: rawStat.bestTime ?? rawStat.previousTime ?? null,
    attempts: rawStat.attempts || 0,
  };
  const accuracyPts = (correctCount / total) * 60;
  // ============================================================
  // 🔧 SCORING FORMULA — the one shared points system for every level.
  // Change the numbers below (60, 20, 20, 10) to adjust how many points
  // each part is worth. This is the ONLY place these numbers live.
  //   - accuracyPts:     up to 60, scaled by % correct        (just above)
  //   - improvementPts:  up to 20, scaled by how much faster than their
  //                      personal best time (0 if no faster / no record yet)
  //   - speedBonus:      flat 20, only if 100% correct AND under the
  //                      level's own time limit (see "timeSeconds" per level)
  //   - personalBestBonus: flat 10, only if 100% correct AND faster than
  //                      their own best-ever time on this level
  // ============================================================
  // Improvement is measured against the student's genuine BEST time on this
  // level, not just their last attempt -- so a slower attempt never lowers
  // the bar for what counts as "improving."
  let improvementPts = 0;
  if (stat.bestTime)
    improvementPts = Math.min(
      20,
      Math.max(0, ((stat.bestTime - elapsed) / stat.bestTime) * 100),
    );

  // Progression only requires 100% accuracy -- speed is a separate, optional
  // bonus that rewards fluency without gating advancement to the next level.
  const allCorrect = correctCount === total;
  const speedBonusEarned = allCorrect && elapsed <= targetTime;
  const speedBonus = speedBonusEarned ? 20 : 0;

  // Personal best: beat your OWN best-ever time on this level, with zero
  // mistakes. Compared against the true record, not just the last attempt,
  // so an off day never makes a later mediocre attempt look like a record.
  const personalBestEarned =
    allCorrect && stat.bestTime != null && elapsed < stat.bestTime;
  const personalBestBonus = personalBestEarned ? 10 : 0;

  const roundPts =
    accuracyPts + improvementPts + speedBonus + personalBestBonus; // total = sum of all four above

  state.student.cumulativePoints += roundPts;
  state.student.pointsHistory.push({
    timestamp: Date.now(),
    points: state.student.cumulativePoints,
  });
  let newBestTime = stat.bestTime;
  if (allCorrect && (newBestTime == null || elapsed < newBestTime))
    newBestTime = elapsed;
  progress.levelStats[state.practicingLevelIdx] = {
    previousTime: elapsed,
    bestTime: newBestTime,
    attempts: stat.attempts + 1,
  };

  let advanced = false,
    subtopicComplete = false;
  const wasCurrentLevel = state.practicingLevelIdx === progress.currentLevel;
  if (allCorrect && wasCurrentLevel) {
    if (progress.currentLevel < subtopic.levels.length - 1) {
      progress.currentLevel += 1;
      advanced = true;
    } else {
      subtopicComplete = true;
    }
  }
  saveStudent(state.student);

  state.lastResult = {
    allCorrect: allCorrect,
    speedBonusEarned: speedBonusEarned,
    personalBestEarned: personalBestEarned,
    correct: correctCount,
    total: total,
    elapsed: elapsed,
    roundPts: roundPts,
    cumulativePoints: state.student.cumulativePoints,
    answers: state.answers,
    advanced: advanced,
    subtopicComplete: subtopicComplete,
    targetTime: targetTime,
  };
  state.phase = "result";
  render();
}

// Renders a question as vertically-stacked column arithmetic (right-aligned
// digits, a line under the second number) instead of the usual "a + b = ?"
// text line. Used by any level with columnFormat: true. operator defaults
// to "+" so existing column-addition levels are unaffected.
function buildColumnMathHTML(a, b, operator) {
  operator = operator || "+";
  const width = Math.max(String(a).length, String(b).length);
  const aStr = String(a).padStart(width, " ");
  const bStr = String(b).padStart(width, " ");
  let topRow = '<td style="width:30px;"></td>';
  for (let i = 0; i < width; i++)
    topRow +=
      '<td style="width:30px;padding:2px 4px;">' +
      (aStr[i] === " " ? "" : aStr[i]) +
      "</td>";
  let bottomRow =
    '<td style="width:30px;color:var(--blue);">' + operator + "</td>";
  for (let i = 0; i < width; i++)
    bottomRow +=
      '<td style="width:30px;padding:2px 4px;">' +
      (bStr[i] === " " ? "" : bStr[i]) +
      "</td>";
  return (
    '<div style="display:flex;justify-content:center;margin:20px 0;">' +
    '<table style="border-collapse:collapse;font-size:28px;font-weight:700;color:var(--ink);text-align:right;">' +
    "<tr>" +
    topRow +
    "</tr>" +
    "<tr>" +
    bottomRow +
    "</tr>" +
    '<tr><td colspan="' +
    (width + 1) +
    '" style="border-bottom:3px solid var(--ink);padding-top:4px;"></td></tr>' +
    "</table></div>"
  );
}
function buildColumnAdditionHTML(a, b) {
  return buildColumnMathHTML(a, b, "+");
} // kept for compatibility

function checkCanSubmit() {
  const btn = document.getElementById("submitBtn");
  if (!btn) return;
  const boxes = document.querySelectorAll(".digit-box");
  if (boxes.length > 0) {
    btn.disabled = !Array.from(boxes).every((b) => b.value.trim() !== "");
    return;
  }
  const input = document.getElementById("answerInput");
  btn.disabled = input.value.trim() === "";
}

// Renders a simple inline SVG line chart of points earned over time.
// No external charting library -- keeps the file fully self-contained.
function pointsEarnedInRange(history, startMs, endMs) {
  const before = history.filter((h) => h.timestamp < startMs);
  const inRange = history.filter(
    (h) => h.timestamp >= startMs && h.timestamp < endMs,
  );
  if (inRange.length === 0) return 0;
  const baseline = before.length > 0 ? before[before.length - 1].points : 0;
  return inRange[inRange.length - 1].points - baseline;
}
function buildMonthComparisonHTML(history) {
  const now = new Date();
  const startOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).getTime();
  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  ).getTime();
  const thisMonthPts = pointsEarnedInRange(
    history,
    startOfThisMonth,
    Date.now() + 1,
  );
  const lastMonthPts = pointsEarnedInRange(
    history,
    startOfLastMonth,
    startOfThisMonth,
  );

  let changeHtml;
  if (lastMonthPts > 0) {
    const pct = Math.round(
      ((thisMonthPts - lastMonthPts) / lastMonthPts) * 100,
    );
    const sign = pct >= 0 ? "+" : "";
    changeHtml =
      '<span style="color:' +
      (pct >= 0 ? "var(--green)" : "#c0392b") +
      ';font-weight:700;">' +
      sign +
      pct +
      "%</span>";
  } else if (thisMonthPts > 0) {
    changeHtml =
      '<span style="color:var(--green);font-weight:700;">New!</span>';
  } else {
    changeHtml = "";
  }

  return (
    '<div class="score-box" style="margin-bottom:14px;">' +
    '<div class="score-row"><span>This month</span><span>' +
    Math.round(thisMonthPts) +
    " pts</span></div>" +
    '<div class="score-row"><span>Last month</span><span>' +
    Math.round(lastMonthPts) +
    " pts</span></div>" +
    (changeHtml
      ? '<div class="score-row"><span><strong>Change</strong></span><span>' +
        changeHtml +
        "</span></div>"
      : "") +
    "</div>"
  );
}

function buildGrowthChartHTML(history) {
  if (!history || history.length === 0) {
    return '<p class="hint" style="margin-top:16px;">Play a level to start tracking your points growth!</p>';
  }
  const monthComparison = buildMonthComparisonHTML(history);
  // Show at most the most recent 30 sessions so the chart stays readable.
  const shown =
    history.length > 30 ? history.slice(history.length - 30) : history;
  const truncatedNote =
    history.length > 30
      ? '<p class="hint" style="margin-top:8px;">Showing your most recent 30 sessions.</p>'
      : "";

  const W = 300,
    H = 160,
    PAD_L = 34,
    PAD_R = 10,
    PAD_T = 12,
    PAD_B = 22;
  const values = shown.map((h) => h.points);
  const minV = Math.min(0, ...values);
  const maxV = Math.max(...values) || 1;
  const xFor = (i) =>
    PAD_L +
    (shown.length === 1 ? 0 : (i / (shown.length - 1)) * (W - PAD_L - PAD_R));
  const yFor = (v) =>
    H - PAD_B - ((v - minV) / (maxV - minV || 1)) * (H - PAD_T - PAD_B);

  const points = shown.map((h, i) => xFor(i) + "," + yFor(h.points).toFixed(1));
  const linePath = "M" + points.join(" L");
  const dots = shown
    .map(
      (h, i) =>
        '<circle cx="' +
        xFor(i) +
        '" cy="' +
        yFor(h.points).toFixed(1) +
        '" r="3" fill="#4a90d9"/>',
    )
    .join("");

  // A couple of horizontal gridlines with value labels (min and max).
  const gridMax =
    '<line x1="' +
    PAD_L +
    '" y1="' +
    yFor(maxV).toFixed(1) +
    '" x2="' +
    (W - PAD_R) +
    '" y2="' +
    yFor(maxV).toFixed(1) +
    '" stroke="#e2e5ea" stroke-width="1"/>' +
    '<text x="2" y="' +
    (yFor(maxV) + 4).toFixed(1) +
    '" font-size="9" fill="#6b7684">' +
    Math.round(maxV) +
    "</text>";
  const gridMin =
    '<line x1="' +
    PAD_L +
    '" y1="' +
    yFor(minV).toFixed(1) +
    '" x2="' +
    (W - PAD_R) +
    '" y2="' +
    yFor(minV).toFixed(1) +
    '" stroke="#e2e5ea" stroke-width="1"/>' +
    '<text x="2" y="' +
    (yFor(minV) + 4).toFixed(1) +
    '" font-size="9" fill="#6b7684">' +
    Math.round(minV) +
    "</text>";

  const firstDate = new Date(shown[0].timestamp).toLocaleDateString();
  const lastDate = new Date(
    shown[shown.length - 1].timestamp,
  ).toLocaleDateString();

  return (
    '<div style="font-weight:600;font-size:14px;margin-bottom:10px;">Points growth over time</div>' +
    monthComparison +
    '<div class="score-box" style="padding:10px;">' +
    '<svg viewBox="0 0 ' +
    W +
    " " +
    H +
    '" style="width:100%;height:auto;display:block;">' +
    gridMax +
    gridMin +
    '<path d="' +
    linePath +
    '" fill="none" stroke="#4a90d9" stroke-width="2"/>' +
    dots +
    "</svg>" +
    '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:6px;">' +
    "<span>" +
    firstDate +
    "</span><span>" +
    lastDate +
    "</span></div>" +
    "</div>" +
    truncatedNote +
    '<div class="score-box" style="margin-top:12px;"><div class="score-row"><span>Sessions played</span><span>' +
    history.length +
    "</span></div>" +
    '<div class="score-row"><span><strong>Current total</strong></span><span><strong>' +
    Math.round(history[history.length - 1].points) +
    "</strong></span></div></div>"
  );
}

// Physical prizes cost real money, so redeeming takes two taps: the first
// tap asks "tap again to confirm", the second completes it.
function redeemItem(itemId) {
  const item = shopItems.find((p) => p.id === itemId);
  if (!item || state.student.cumulativePoints < item.cost) return;
  if (state.pendingRedeem !== itemId) {
    state.pendingRedeem = itemId;
    renderShopGrid();
    return;
  }
  state.pendingRedeem = null;
  state.student.cumulativePoints -= item.cost;
  state.student.purchases.push({
    itemId: item.id,
    name: item.name,
    cost: item.cost,
    timestamp: Date.now(),
  });
  saveStudent(state.student);
  render();
}
function shopVisibleItems() {
  const q = (state.shopSearch || "").trim().toLowerCase();
  const cat = state.shopCategory || "All";
  return shopItems
    .filter(
      (it) =>
        (cat === "All" || it.category === cat) &&
        (!q || it.name.toLowerCase().indexOf(q) >= 0),
    )
    .sort((a, b) => a.cost - b.cost);
}
function shopItemHtml(item) {
  const pts = state.student.cumulativePoints;
  const canAfford = pts >= item.cost;
  const pending = state.pendingRedeem === item.id;
  const pic = item.image
    ? '<img src="' +
      escapeHtml(item.image) +
      '" alt="" loading="lazy" style="width:56px;height:56px;object-fit:contain;margin-bottom:6px;" onerror="this.outerHTML=window.__fallbackIcon">'
    : item.icon
      ? item.icon()
      : iconGift();
  const label = pending
    ? "Tap again to confirm"
    : canAfford
      ? "Redeem"
      : "Need " + (item.cost - Math.floor(pts)) + " more";
  return (
    '<div class="shop-item">' +
    pic +
    '<div class="name">' +
    escapeHtml(item.name) +
    '</div><div class="cost">' +
    item.cost +
    " pts</div>" +
    '<button class="buy" data-item="' +
    escapeHtml(item.id) +
    '" ' +
    (!canAfford ? "disabled" : "") +
    (pending ? ' style="background:#2f9e6e;"' : "") +
    ">" +
    label +
    "</button></div>"
  );
}
// Re-draws only the item grid (not the search box), so typing in search
// doesn't lose focus after each letter.
function renderShopGrid() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  const all = shopVisibleItems();
  const shown = all.slice(0, state.shopShown || SHOP_PAGE_SIZE);
  let html = shown.length
    ? '<div class="shop-grid">' + shown.map(shopItemHtml).join("") + "</div>"
    : '<p class="hint" style="margin-top:16px;">No items match.</p>';
  if (all.length > shown.length)
    html +=
      '<button class="tab-btn" id="shopMoreBtn" style="width:100%;margin-top:12px;">Show more (' +
      (all.length - shown.length) +
      " left)</button>";
  grid.innerHTML = html;
  grid.querySelectorAll(".shop-item button.buy").forEach((btn) => {
    btn.onclick = safeHandler(() => redeemItem(btn.getAttribute("data-item")));
  });
  const more = document.getElementById("shopMoreBtn");
  if (more)
    more.onclick = safeHandler(() => {
      state.shopShown = (state.shopShown || SHOP_PAGE_SIZE) + SHOP_PAGE_SIZE;
      renderShopGrid();
    });
}

// =========================================================
// Render
// =========================================================
function render() {
  try {
    renderInner();
  } catch (err) {
    showFatalError(err && err.message ? err.message : String(err));
  }
}

function renderInner() {
  const pointsEl = document.getElementById("pointsDisplay");
  const footnote = document.getElementById("footnote");
  pointsEl.textContent = state.student
    ? Math.round(state.student.cumulativePoints)
    : "—";
  footnote.style.display = state.phase === "codeEntry" ? "none" : "block";
  if (state.phase !== "codeEntry" && state.code) {
    footnote.innerHTML =
      "Playing as <strong>" +
      state.code +
      '</strong> · <span class="switch-link" id="switchLink">Not you? Switch student</span>';
  }
  // The main-menu button lives outside the dynamic card area, so it's
  // always on screen -- including mid-question, not just on list screens.
  const homeMenuBtn = document.getElementById("homeMenuBtn");
  homeMenuBtn.style.display = state.phase === "codeEntry" ? "none" : "inline";
  homeMenuBtn.onclick = safeHandler(() => {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.phase = "home";
    render();
  });
  const card = document.getElementById("card");

  if (state.phase === "codeEntry") {
    card.innerHTML =
      '<div class="center">' +
      '<p class="instructions">Enter your name or the code your tutor gave you.</p>' +
      (state.codeError
        ? '<div class="error-text">' + state.codeError + "</div>"
        : "") +
      '<input type="text" id="codeInput" placeholder="e.g. amelia23" />' +
      '<button class="primary full" id="codeSubmitBtn">Continue</button></div>';
    document.getElementById("codeSubmitBtn").onclick = safeHandler(enterCode);
    document.getElementById("codeInput").addEventListener(
      "keydown",
      safeHandler((e) => {
        if (e.key === "Enter") enterCode();
      }),
    );
    document.getElementById("codeInput").focus();
    return;
  }

  const tabsHtml =
    '<div class="tabs">' +
    '<button class="tab-btn ' +
    (state.phase !== "shop" &&
    state.phase !== "growth" &&
    state.phase !== "learn" &&
    state.phase !== "learnDetail"
      ? "active"
      : "") +
    '" id="practiceTabBtn">Practice</button>' +
    '<button class="tab-btn ' +
    (state.phase === "shop" ? "active" : "") +
    '" id="shopTabBtn">Shop</button>' +
    '<button class="tab-btn ' +
    (state.phase === "growth" ? "active" : "") +
    '" id="growthTabBtn">Growth</button>' +
    '<button class="tab-btn ' +
    (state.phase === "learn" || state.phase === "learnDetail" ? "active" : "") +
    '" id="learnTabBtn">Learn</button>' +
    "</div>";

  if (state.phase === "growth") {
    card.innerHTML =
      tabsHtml + buildGrowthChartHTML(state.student.pointsHistory);
    document.getElementById("practiceTabBtn").onclick = safeHandler(() => {
      state.phase = "home";
      render();
    });
    document.getElementById("shopTabBtn").onclick = safeHandler(() => {
      state.phase = "shop";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.getElementById("learnTabBtn").onclick = safeHandler(() => {
      state.phase = "learn";
      render();
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "learn") {
    const rows = EXPLANATIONS.map(
      (ex, i) =>
        '<div class="list-row" data-explain="' +
        i +
        '"><div><div class="title">' +
        ex.title +
        '</div><div class="meta">' +
        ex.subtitle +
        '</div></div><div class="chev">›</div></div>',
    ).join("");
    card.innerHTML =
      tabsHtml +
      '<p class="instructions">Pick a topic to see it explained step by step.</p>' +
      rows;
    document.getElementById("practiceTabBtn").onclick = safeHandler(() => {
      state.phase = "home";
      render();
    });
    document.getElementById("shopTabBtn").onclick = safeHandler(() => {
      state.phase = "shop";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.querySelectorAll(".list-row").forEach((row) => {
      row.onclick = safeHandler(() => {
        state.learnKey =
          EXPLANATIONS[parseInt(row.getAttribute("data-explain"), 10)].key;
        state.learnStep = 0;
        state.phase = "learnDetail";
        render();
      });
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "learnDetail") {
    const ex = EXPLANATIONS.find((e) => e.key === state.learnKey);
    const step = ex.steps[state.learnStep];
    const isLast = state.learnStep === ex.steps.length - 1;
    card.innerHTML =
      tabsHtml +
      '<div class="breadcrumb" id="backToLearnList"><span>Learn</span> / ' +
      ex.title +
      "</div>" +
      '<div style="font-size:12px;color:var(--muted);text-align:center;margin:10px 0 4px;">Step ' +
      (state.learnStep + 1) +
      " of " +
      ex.steps.length +
      "</div>" +
      step.html +
      '<p style="text-align:center;font-size:14px;color:var(--ink);min-height:40px;margin:14px 0;">' +
      step.caption +
      "</p>" +
      '<div style="display:flex;gap:10px;">' +
      '<button class="tab-btn" id="prevStepBtn" style="flex:0 0 90px;" ' +
      (state.learnStep === 0 ? "disabled" : "") +
      ">&larr; Back</button>" +
      '<button class="primary" id="nextStepBtn" style="flex:1;">' +
      (isLast
        ? state.learnReturnTo === "levelIntro"
          ? "Start Practice"
          : "Done"
        : "Next") +
      "</button>" +
      "</div>";
    document.getElementById("backToLearnList").onclick = safeHandler(() => {
      state.learnReturnTo = null;
      state.phase = "learn";
      render();
    });
    document.getElementById("prevStepBtn").onclick = safeHandler(() => {
      if (state.learnStep > 0) {
        state.learnStep--;
        render();
      }
    });
    document.getElementById("nextStepBtn").onclick = safeHandler(() => {
      if (isLast) {
        const returnTo = state.learnReturnTo;
        state.learnReturnTo = null;
        state.phase = returnTo === "levelIntro" ? "levelIntro" : "learn";
        render();
      } else {
        state.learnStep++;
        render();
      }
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "shop") {
    window.__fallbackIcon = iconGift();
    const cats = ["All"].concat(
      Array.from(new Set(shopItems.map((it) => it.category))).sort(),
    );
    if (cats.indexOf(state.shopCategory) < 0) state.shopCategory = "All";
    const chips = cats
      .map(
        (c) =>
          '<button class="tab-btn' +
          (c === state.shopCategory ? " active" : "") +
          '" data-cat="' +
          escapeHtml(c) +
          '" style="flex:0 0 auto;padding:6px 12px;font-size:13px;">' +
          escapeHtml(c) +
          "</button>",
      )
      .join("");
    const purchases = state.student.purchases.slice().reverse();
    const historyHtml =
      purchases.length === 0
        ? '<p class="hint" style="margin-top:16px;">No purchases yet.</p>'
        : '<div style="margin-top:20px;"><div style="font-weight:600;font-size:14px;margin-bottom:8px;">Shopping history</div><div class="score-box" style="text-align:left;">' +
          purchases
            .map((p) => {
              const d = new Date(p.timestamp);
              return (
                '<div class="score-row"><span>' +
                escapeHtml(p.name) +
                ' <span style="color:#a1a8b2;">\u00b7 ' +
                d.toLocaleDateString() +
                "</span></span><span>-" +
                p.cost +
                "</span></div>"
              );
            })
            .join("") +
          "</div></div>";
    card.innerHTML =
      tabsHtml +
      (shopItems.length > SHOP_PAGE_SIZE
        ? '<input type="text" id="shopSearch" placeholder="Search prizes" value="' +
          escapeHtml(state.shopSearch || "") +
          '" style="width:100%;margin-bottom:10px;font-size:15px;" autocomplete="off" />'
        : "") +
      (cats.length > 2
        ? '<div id="shopChips" style="display:flex;gap:8px;overflow-x:auto;margin-bottom:12px;padding-bottom:4px;">' +
          chips +
          "</div>"
        : "") +
      '<div id="shopGrid"></div>' +
      historyHtml;
    document.getElementById("practiceTabBtn").onclick = safeHandler(() => {
      state.phase = "home";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.getElementById("learnTabBtn").onclick = safeHandler(() => {
      state.phase = "learn";
      render();
    });
    document.querySelectorAll("#shopChips button").forEach((b) => {
      b.onclick = safeHandler(() => {
        state.shopCategory = b.getAttribute("data-cat");
        state.shopShown = SHOP_PAGE_SIZE;
        state.pendingRedeem = null;
        render();
      });
    });
    const searchEl = document.getElementById("shopSearch");
    if (searchEl)
      searchEl.oninput = safeHandler(() => {
        state.shopSearch = searchEl.value;
        state.shopShown = SHOP_PAGE_SIZE;
        state.pendingRedeem = null;
        renderShopGrid();
      });
    renderShopGrid();
    attachSwitchLink();
    return;
  }

  if (state.phase === "home") {
    const rows = TOPICS.map(
      (topic, i) =>
        '<div class="list-row" data-topic="' +
        i +
        '"><div><div class="title">' +
        topic.name +
        "</div>" +
        '<div class="meta">' +
        topic.subtopics.length +
        " subtopic" +
        (topic.subtopics.length === 1 ? "" : "s") +
        '</div></div><div class="chev">›</div></div>',
    ).join("");
    card.innerHTML =
      tabsHtml +
      '<p class="instructions">Choose a topic to practice.</p>' +
      rows;
    document.getElementById("shopTabBtn").onclick = safeHandler(() => {
      state.phase = "shop";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.getElementById("learnTabBtn").onclick = safeHandler(() => {
      state.phase = "learn";
      render();
    });
    document.querySelectorAll(".list-row").forEach((row) => {
      row.onclick = safeHandler(() =>
        openTopic(parseInt(row.getAttribute("data-topic"), 10)),
      );
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "subtopics") {
    const topic = TOPICS[state.topicIdx];
    const rows = topic.subtopics
      .map((sub, i) => {
        const progress = getSubtopicProgress(state.student, sub.key);
        const done = progress.currentLevel >= sub.levels.length;
        const meta = done
          ? "Mastered!"
          : "Level " + (progress.currentLevel + 1) + " of " + sub.levels.length;
        return (
          '<div class="list-row" data-subtopic="' +
          i +
          '"><div><div class="title">' +
          sub.name +
          '</div><div class="meta">' +
          meta +
          '</div></div><div class="chev">›</div></div>'
        );
      })
      .join("");
    card.innerHTML =
      tabsHtml +
      '<div class="breadcrumb" id="backToHome"><span>Topics</span> / ' +
      topic.name +
      "</div>" +
      rows;
    document.getElementById("shopTabBtn").onclick = safeHandler(() => {
      state.phase = "shop";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.getElementById("learnTabBtn").onclick = safeHandler(() => {
      state.phase = "learn";
      render();
    });
    document.getElementById("backToHome").onclick = safeHandler(() => {
      state.phase = "home";
      render();
    });
    document.querySelectorAll(".list-row").forEach((row) => {
      row.onclick = safeHandler(() =>
        openSubtopic(parseInt(row.getAttribute("data-subtopic"), 10)),
      );
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "levelView") {
    const topic = TOPICS[state.topicIdx];
    const subtopic = currentSubtopic();
    const progress = getSubtopicProgress(state.student, subtopic.key);
    const allDone = progress.currentLevel >= subtopic.levels.length;
    const levelRows = subtopic.levels
      .map((lvl, i) => {
        let statusClass, icon, clickable;
        if (i < progress.currentLevel) {
          statusClass = "clickable";
          icon = "✓";
          clickable = true;
        } else if (i === progress.currentLevel) {
          statusClass = "current clickable";
          icon = "▶";
          clickable = true;
        } else {
          statusClass = "locked";
          icon = "🔒";
          clickable = false;
        }
        return (
          '<div class="level-row ' +
          statusClass +
          '" ' +
          (clickable ? 'data-level="' + i + '"' : "") +
          ">" +
          '<span class="icon">' +
          icon +
          "</span><span>Level " +
          (i + 1) +
          "</span></div>"
        );
      })
      .join("");
    card.innerHTML =
      tabsHtml +
      '<div class="breadcrumb" id="backToSubtopics"><span>' +
      topic.name +
      "</span> / " +
      subtopic.name +
      "</div>" +
      (allDone
        ? '<p class="instructions" style="margin-top:10px;color:var(--green);font-weight:600;">All levels mastered! Practice any level again below.</p>'
        : "") +
      '<div style="margin-top:10px;">' +
      levelRows +
      "</div>";
    document.getElementById("shopTabBtn").onclick = safeHandler(() => {
      state.phase = "shop";
      render();
    });
    document.getElementById("growthTabBtn").onclick = safeHandler(() => {
      state.phase = "growth";
      render();
    });
    document.getElementById("learnTabBtn").onclick = safeHandler(() => {
      state.phase = "learn";
      render();
    });
    document.getElementById("backToSubtopics").onclick = safeHandler(() => {
      state.phase = "subtopics";
      render();
    });
    document.querySelectorAll(".level-row.clickable").forEach((row) => {
      row.onclick = safeHandler(() => {
        state.pendingLevelIdx = parseInt(row.getAttribute("data-level"), 10);
        state.phase = "levelIntro";
        render();
      });
    });
    attachSwitchLink();
    return;
  }

  if (state.phase === "levelIntro") {
    const topic = TOPICS[state.topicIdx];
    const subtopic = currentSubtopic();
    const level = subtopic.levels[state.pendingLevelIdx];
    const explanation = level.explanationKey
      ? EXPLANATIONS.find((e) => e.key === level.explanationKey)
      : null;
    card.innerHTML =
      tabsHtml +
      '<div class="breadcrumb" id="backToLevelView"><span>' +
      topic.name +
      "</span> / " +
      subtopic.name +
      "</div>" +
      '<div class="center" style="margin-top:16px;">' +
      '<div style="font-weight:700;font-size:18px;margin-bottom:6px;">Level ' +
      (state.pendingLevelIdx + 1) +
      "</div>" +
      '<div style="font-size:13px;color:var(--muted);margin-bottom:20px;">' +
      level.title +
      "</div>" +
      "</div>" +
      (explanation
        ? '<button class="tab-btn full" id="seeExplanationBtn" style="width:100%;margin-bottom:10px;">📖 See how it works first</button>'
        : "") +
      '<button class="primary full" id="startPracticeBtn">▶ Start Practice</button>';
    document.getElementById("backToLevelView").onclick = safeHandler(() => {
      state.phase = "levelView";
      render();
    });
    document.getElementById("startPracticeBtn").onclick = safeHandler(() =>
      startPractice(state.pendingLevelIdx),
    );
    if (explanation) {
      document.getElementById("seeExplanationBtn").onclick = safeHandler(() => {
        state.learnKey = explanation.key;
        state.learnStep = 0;
        state.learnReturnTo = "levelIntro";
        state.phase = "learnDetail";
        render();
      });
    }
    attachSwitchLink();
    return;
  }

  if (state.phase === "practicing") {
    const q = state.questions[state.index];
    const subtopic = currentSubtopic();
    const level = subtopic.levels[state.practicingLevelIdx];
    const prevAnswer = state.answers[state.index];
    const prefillValue = prevAnswer ? prevAnswer.userAnswer : "";
    const questionDisplay = level.columnFormat
      ? buildColumnMathHTML(q.a, q.b, level.operator)
      : level.visualFormat
        ? '<div style="display:flex;justify-content:center;margin:16px 0;">' +
          q.visualHtml +
          '</div><div style="text-align:center;font-size:14px;color:var(--muted);">' +
          q.text +
          "</div>"
        : '<div class="q-label">' + q.text + "</div>";
    const useBoxes = level.columnFormat && level.answerDigits;

    let answerInputHtml;
    if (useBoxes) {
      const digitCount = level.answerDigits;
      const prefillDigits =
        prefillValue.length === digitCount
          ? prefillValue.split("")
          : new Array(digitCount).fill("");
      let boxesHtml =
        '<div style="display:flex;justify-content:center;gap:8px;margin-bottom:14px;">';
      for (let i = 0; i < digitCount; i++) {
        boxesHtml +=
          '<input type="text" class="digit-box" data-idx="' +
          i +
          '" maxlength="1" inputmode="numeric" pattern="[0-9]*" value="' +
          (prefillDigits[i] || "") +
          '" style="width:44px;height:52px;text-align:center;font-size:24px;font-weight:700;border:1px solid #c8ccd2;border-radius:8px;" />';
      }
      boxesHtml += "</div>";
      answerInputHtml = boxesHtml;
    } else {
      // Most levels want the numeric keypad; a level can set keyboardMode:
      // "text" to allow letters/commas (e.g. ordinal numbers, comma-separated
      // lists) -- everything else keeps the numeric-only default unchanged.
      const kbAttrs =
        level.keyboardMode === "text"
          ? ""
          : 'inputmode="numeric" pattern="[0-9]*"';
      answerInputHtml =
        '<input type="text" id="answerInput" ' +
        kbAttrs +
        ' placeholder="Your answer" value="' +
        prefillValue +
        '" style="text-align:center;font-size:20px;" autocomplete="off" />';
    }

    card.innerHTML =
      '<div class="progress-row"><span>' +
      level.title +
      " · Q" +
      (state.index + 1) +
      " of " +
      state.questions.length +
      "</span>" +
      '<span class="timer">⏱ <span id="liveTimer">0:00</span></span></div>' +
      questionDisplay +
      answerInputHtml +
      '<div style="display:flex;gap:10px;">' +
      '<button class="tab-btn" id="backBtn" style="flex:0 0 90px;" ' +
      (state.index === 0 ? "disabled" : "") +
      ">&larr; Back</button>" +
      '<button class="primary" id="submitBtn" style="flex:1;" disabled>' +
      (state.index + 1 < state.questions.length ? "Next" : "Finish") +
      "</button>" +
      "</div>";
    document.getElementById("submitBtn").onclick = safeHandler(nextQuestion);
    document.getElementById("backBtn").onclick = safeHandler(goBack);

    if (useBoxes) {
      const boxes = Array.from(document.querySelectorAll(".digit-box"));
      // Focus flows RIGHT to LEFT, matching how column addition is actually
      // done by hand (ones column first, carrying leftward) -- even though
      // the boxes are still laid out left-to-right visually, like the sum itself.
      boxes.forEach((box, i) => {
        box.addEventListener(
          "input",
          safeHandler(() => {
            box.value = box.value.replace(/[^0-9]/g, "").slice(-1);
            checkCanSubmit();
            if (box.value && i > 0) boxes[i - 1].focus();
          }),
        );
        box.addEventListener(
          "keydown",
          safeHandler((e) => {
            if (e.key === "Backspace" && !box.value && i < boxes.length - 1) {
              e.preventDefault();
              boxes[i + 1].focus();
            }
            if (
              e.key === "Enter" &&
              !document.getElementById("submitBtn").disabled
            )
              nextQuestion();
          }),
        );
      });
      checkCanSubmit();
      let focusTarget = boxes[boxes.length - 1];
      for (let i = boxes.length - 1; i >= 0; i--) {
        if (boxes[i].value === "") {
          focusTarget = boxes[i];
          break;
        }
      }
      focusTarget.focus();
    } else {
      const inputEl = document.getElementById("answerInput");
      inputEl.addEventListener("input", safeHandler(checkCanSubmit));
      inputEl.addEventListener(
        "keydown",
        safeHandler((e) => {
          if (
            e.key === "Enter" &&
            !document.getElementById("submitBtn").disabled
          )
            nextQuestion();
        }),
      );
      checkCanSubmit();
      inputEl.focus();
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    }
    return;
  }

  if (state.phase === "result") {
    const r = state.lastResult;
    const subtopic = currentSubtopic();
    const level = subtopic.levels[state.practicingLevelIdx];
    const mistakes = r.answers.filter((a) => !a.isCorrect);
    const mistakesHtml =
      mistakes.length === 0
        ? '<div class="hint" style="color:var(--green);">No mistakes — every answer was correct!</div>'
        : '<div style="margin-bottom:14px;"><div style="font-weight:600;font-size:13px;margin-bottom:6px;">Mistakes</div><div class="score-box" style="text-align:left;">' +
          mistakes
            .map(
              (m) =>
                '<div class="score-row" style="display:block;padding:8px 0;border-bottom:1px solid var(--border);">' +
                "<strong>" +
                m.text +
                "</strong><br/>Correct: <strong>" +
                m.correctAnswer +
                '</strong> · You wrote: <span style="color:#c0392b;">' +
                (m.userAnswer || "(blank)") +
                "</span></div>",
            )
            .join("") +
          "</div></div>";
    let headline, headlineClass;
    if (r.allCorrect && r.speedBonusEarned) {
      headline = "🏆 Mastered + speed bonus!";
      headlineClass = "mastered";
    } else if (r.allCorrect) {
      headline = "✅ Level mastered!";
      headlineClass = "mastered";
    } else {
      headline = "Good effort — a few mistakes";
      headlineClass = "";
    }

    let banner = "";
    if (r.personalBestEarned) {
      banner +=
        '<div class="personal-best-banner">⚡ New personal best! You beat your last time with zero mistakes — +10 points!</div>';
    }
    if (r.subtopicComplete)
      banner +=
        '<div class="unlock-banner">🎉 All levels of ' +
        subtopic.name +
        " mastered!</div>";
    else if (r.advanced)
      banner += '<div class="unlock-banner">🎉 Next level unlocked!</div>';
    if (r.allCorrect && !r.speedBonusEarned) {
      banner +=
        '<div class="unlock-banner" style="background:#fdf3e3;color:#96650e;">⏱ Want to build fluency? Repeat this level in under ' +
        formatTime(r.targetTime) +
        " to earn +20 bonus points.</div>";
    }
    // Assessment-style levels point back to the relevant practice topic
    // whenever performance isn't yet at full mastery (wrong answers or too slow).
    if (level.practiceTopicName && !(r.allCorrect && r.speedBonusEarned)) {
      banner +=
        '<div class="unlock-banner" style="background:#eef3fb;color:#2c5a8a;">📚 Practice tip: head back to <strong>' +
        level.practiceTopicName +
        "</strong> to build accuracy and fluency, then try this assessment again.</div>";
    }

    card.innerHTML =
      '<div class="center">' +
      '<div class="result-headline ' +
      headlineClass +
      '">' +
      headline +
      "</div>" +
      '<div style="font-size:13px;color:var(--muted);margin-bottom:16px;">' +
      level.title +
      " · " +
      r.correct +
      "/" +
      r.total +
      " correct · " +
      formatTime(r.elapsed) +
      "</div></div>" +
      banner +
      '<div class="score-box">' +
      '<div class="score-row"><span>Points earned this round</span><span>' +
      r.roundPts.toFixed(1) +
      "</span></div>" +
      '<div class="score-row"><span><strong>Total points</strong></span><span><strong>' +
      Math.round(r.cumulativePoints) +
      "</strong></span></div>" +
      "</div>" +
      mistakesHtml +
      '<button class="primary full" id="againBtn" style="margin-bottom:8px;">↻ ' +
      (r.allCorrect && !r.speedBonusEarned
        ? "Practice again for the bonus"
        : "Practice again") +
      "</button>" +
      '<button class="tab-btn full" id="backToLevelsBtn" style="width:100%;">Back to levels</button>';
    document.getElementById("againBtn").onclick = safeHandler(() =>
      startPractice(state.practicingLevelIdx),
    );
    document.getElementById("backToLevelsBtn").onclick = safeHandler(() => {
      state.phase = "levelView";
      render();
    });
    attachSwitchLink();
    return;
  }
}

function attachSwitchLink() {
  const el = document.getElementById("switchLink");
  if (el) el.onclick = safeHandler(switchStudent);
}

render();
loadShopFeed();
