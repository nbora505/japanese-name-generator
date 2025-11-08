// --- 1. 데이터 정의 ---

const familyNames = [
  {
    kanji: "佐藤",
    romaji: "Satou",
    kana: "さとう",
    hangul: "사토",
    meaning: "조력자, 돕는 자 (佐) + 등나무(藤) 가문"
  },
  {
    kanji: "鈴木",
    romaji: "Suzuki",
    kana: "すずき",
    hangul: "스즈키",
    meaning: "방울(鈴) + 나무(木), 옛 신사 관련 성씨"
  },
  {
    kanji: "高橋",
    romaji: "Takahashi",
    kana: "たかはし",
    hangul: "다카하시",
    meaning: "높은(高) + 다리(橋)"
  },
  {
    kanji: "田中",
    romaji: "Tanaka",
    kana: "たなか",
    hangul: "다나카",
    meaning: "논(田)의 가운데(中)에 사는 집안"
  },
  {
    kanji: "中村",
    romaji: "Nakamura",
    kana: "なかむら",
    hangul: "나카무라",
    meaning: "마을(村)의 가운데(中)"
  }
];

const givenNames = [
  {
    kanji: "春香",
    romaji: "Haruka",
    kana: "はるか",
    hangul: "하루카",
    gender: "f",
    vibes: ["cute", "soft"],
    era: "modern",
    meaning: "봄(春)의 향기(香)"
  },
  {
    kanji: "蓮",
    romaji: "Ren",
    kana: "れん",
    hangul: "렌",
    gender: "m",
    vibes: ["cool", "modern"],
    era: "modern",
    meaning: "연꽃(蓮) — 깨끗함, 고결함"
  },
  {
    kanji: "千代",
    romaji: "Chiyo",
    kana: "ちよ",
    hangul: "치요",
    gender: "f",
    vibes: ["classic", "elegant"],
    era: "traditional",
    meaning: "천(千)년의 세월(代), 장수와 축복"
  },
  {
    kanji: "葵",
    romaji: "Aoi",
    kana: "あおい",
    hangul: "아오이",
    gender: "unisex",
    vibes: ["soft", "modern"],
    era: "modern",
    meaning: "꽃 이름(葵), 상쾌함과 생명력"
  },
  {
    kanji: "一真",
    romaji: "Kazuma",
    kana: "かずま",
    hangul: "카즈마",
    gender: "m",
    vibes: ["cool", "classic"],
    era: "traditional",
    meaning: "하나(一)의 진실(真), 한결같음"
  },
  {
    kanji: "光莉",
    romaji: "Hikari",
    kana: "ひかり",
    hangul: "히카리",
    gender: "f",
    vibes: ["cute", "bright"],
    era: "modern",
    meaning: "빛(光) + 자주 쓰이는 여자 이름 한자(莉)"
  },
  {
    kanji: "夜斗",
    romaji: "Yato",
    kana: "やと",
    hangul: "야토",
    gender: "m",
    vibes: ["dark", "cool"],
    era: "modern",
    meaning: "밤(夜) + 싸움/말다툼(斗) — 다크한 배틀물 느낌"
  },
  {
    kanji: "静流",
    romaji: "Shizuru",
    kana: "しずる",
    hangul: "시즈루",
    gender: "f",
    vibes: ["elegant", "classic"],
    era: "traditional",
    meaning: "고요함(静) + 흐름(流)"
  },
  {
    kanji: "空",
    romaji: "Sora",
    kana: "そら",
    hangul: "소라",
    gender: "unisex",
    vibes: ["soft", "modern"],
    era: "modern",
    meaning: "하늘(空) — 자유로움, 개방감"
  },
  {
    kanji: "黒羽",
    romaji: "Kuroba",
    kana: "くろば",
    hangul: "쿠로바",
    gender: "m",
    vibes: ["dark", "cool"],
    era: "modern",
    meaning: "검은(黒) 깃털(羽), 어두운 과거나 비밀을 연상"
  }
];

// --- 2. 유틸 함수 ---

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- 3. 렌더링 헬퍼들 ---

function createBaseCard() {
  const card = document.createElement("article");
  card.className = "name-card";

  const header = document.createElement("div");
  header.className = "name-header";

  const main = document.createElement("div");
  main.className = "name-main";

  const romaji = document.createElement("div");
  romaji.className = "name-romaji";

  header.appendChild(main);
  header.appendChild(romaji);

  const kana = document.createElement("div");
  kana.className = "name-kana";

  const meta = document.createElement("div");
  meta.className = "name-meta";

  const meaning = document.createElement("div");
  meaning.className = "name-meaning";

  const tagContainer = document.createElement("div");

  // 복사 버튼
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";

  card.appendChild(header);
  card.appendChild(kana);
  card.appendChild(meta);
  card.appendChild(meaning);
  card.appendChild(tagContainer);
  card.appendChild(copyBtn);

  return {
    card,
    main,
    romaji,
    kana,
    meta,
    meaning,
    tagContainer,
    copyBtn
  };
}

function renderFullName(family, given, container) {
  const {
    card,
    main,
    romaji,
    kana,
    meta,
    meaning,
    tagContainer,
    copyBtn
  } = createBaseCard();

  const fullHangul = `${family.hangul} ${given.hangul}`;
  const fullKanji = `${family.kanji} ${given.kanji}`;
  const fullRomaji = `${family.romaji} ${given.romaji}`;
  const fullKana = `${family.kana} ${given.kana}`;

  main.textContent = fullHangul;
  romaji.textContent = `${fullKanji} / ${fullRomaji}`;
  kana.textContent = `읽기: ${fullKana}`;

  const tags = [];
  let genderLabel = "";
  if (given.gender === "m") genderLabel = "남";
  else if (given.gender === "f") genderLabel = "여";
  else genderLabel = "유니섹스";
  tags.push(`성별: ${genderLabel}`);

  if (given.vibes && given.vibes.length > 0) {
    tags.push(`분위기: ${given.vibes.join(", ")}`);
  }

  if (given.era === "modern") tags.push("시대: 현대풍");
  else if (given.era === "traditional") tags.push("시대: 전통풍");

  meta.textContent = tags.join(" | ");

  meaning.textContent = `의미: 이름 - ${given.meaning} / 성(姓) - ${family.meaning}`;

  // 분위기 태그 배지
  tagContainer.innerHTML = "";
  (given.vibes || []).forEach((v) => {
    const span = document.createElement("span");
    span.className = "tag";
    if (v === "dark") span.classList.add("dark");
    if (v === "classic") span.classList.add("classic");
    span.textContent = v;
    tagContainer.appendChild(span);
  });

  copyBtn.textContent = "이 이름 복사";
  copyBtn.addEventListener("click", () => {
    const textToCopy = `${fullHangul} (${fullKanji} / ${fullRomaji}) - ${given.meaning}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => {
          copyBtn.textContent = "이 이름 복사";
        }, 1000);
      })
      .catch(() => {
        alert("복사에 실패했다 해… 브라우저 권한을 확인해봐라 해.");
      });
  });

  container.appendChild(card);
}

function renderGivenOnly(given, container) {
  const { card, main, romaji, kana, meta, meaning, tagContainer, copyBtn } =
    createBaseCard();

  main.textContent = given.hangul;
  romaji.textContent = `${given.kanji} / ${given.romaji}`;
  kana.textContent = `읽기: ${given.kana}`;

  const tags = [];
  let genderLabel = "";
  if (given.gender === "m") genderLabel = "남";
  else if (given.gender === "f") genderLabel = "여";
  else genderLabel = "유니섹스";
  tags.push(`성별: ${genderLabel}`);

  if (given.vibes && given.vibes.length > 0) {
    tags.push(`분위기: ${given.vibes.join(", ")}`);
  }

  if (given.era === "modern") tags.push("시대: 현대풍");
  else if (given.era === "traditional") tags.push("시대: 전통풍");

  meta.textContent = tags.join(" | ");
  meaning.textContent = `의미: ${given.meaning}`;

  tagContainer.innerHTML = "";
  (given.vibes || []).forEach((v) => {
    const span = document.createElement("span");
    span.className = "tag";
    if (v === "dark") span.classList.add("dark");
    if (v === "classic") span.classList.add("classic");
    span.textContent = v;
    tagContainer.appendChild(span);
  });

  copyBtn.textContent = "이 이름 복사";
  copyBtn.addEventListener("click", () => {
    const textToCopy = `${given.hangul} (${given.kanji} / ${given.romaji}) - ${given.meaning}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => {
          copyBtn.textContent = "이 이름 복사";
        }, 1000);
      })
      .catch(() => {
        alert("복사에 실패했다 해… 브라우저 권한을 확인해봐라 해.");
      });
  });

  container.appendChild(card);
}

function renderFamilyOnly(family, container) {
  const { card, main, romaji, kana, meta, meaning, tagContainer, copyBtn } =
    createBaseCard();

  main.textContent = family.hangul;
  romaji.textContent = `${family.kanji} / ${family.romaji}`;
  kana.textContent = `읽기: ${family.kana}`;

  meta.textContent = "결과 유형: 성씨만 생성";

  meaning.textContent = `성(姓) 의미: ${family.meaning}`;

  tagContainer.innerHTML = "";

  copyBtn.textContent = "이 성씨 복사";
  copyBtn.addEventListener("click", () => {
    const textToCopy = `${family.hangul} (${family.kanji} / ${family.romaji}) - ${family.meaning}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn.textContent = "복사 완료!";
        setTimeout(() => {
          copyBtn.textContent = "이 성씨 복사";
        }, 1000);
      })
      .catch(() => {
        alert("복사에 실패했다 해… 브라우저 권한을 확인해봐라 해.");
      });
  });

  container.appendChild(card);
}

// --- 4. 이름 생성 로직 ---

function generateNames() {
  const gender = document.getElementById("gender").value;
  const vibe = document.getElementById("vibe").value;
  const era = document.getElementById("era").value;
  const mode = document.getElementById("mode").value;
  const count = parseInt(document.getElementById("count").value, 10);

  const resultsDiv = document.getElementById("results");
  const noResultMsg = document.getElementById("noResultMsg");

  resultsDiv.innerHTML = "";
  noResultMsg.classList.add("hidden");

  // 성만 생성 모드
  if (mode === "family") {
    if (familyNames.length === 0) {
      noResultMsg.classList.remove("hidden");
      return;
    }

    const shuffledFamilies = shuffle(familyNames);
    const selected = shuffledFamilies.slice(
      0,
      Math.min(count, familyNames.length)
    );

    selected.forEach((family) => {
      renderFamilyOnly(family, resultsDiv);
    });

    return;
  }

  // 이름 관련 모드 (이름만 / 성+이름)
  let pool = givenNames;

  if (gender !== "any") {
    pool = pool.filter(
      (n) => n.gender === gender || n.gender === "unisex"
    );
  }

  if (vibe !== "any") {
    pool = pool.filter((n) => n.vibes && n.vibes.includes(vibe));
  }

  if (era !== "any") {
    pool = pool.filter((n) => n.era === era);
  }

  if (pool.length === 0) {
    noResultMsg.classList.remove("hidden");
    return;
  }

  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  if (mode === "given") {
    // 이름만 생성
    selected.forEach((given) => {
      renderGivenOnly(given, resultsDiv);
    });
  } else {
    // 성 + 이름 생성
    selected.forEach((given) => {
      const family = getRandomItem(familyNames);
      renderFullName(family, given, resultsDiv);
    });
  }
}

// --- 5. 이벤트 연결 ---

// body 맨 끝에서 로드되니까 DOMContentLoaded 없어도 됨
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", generateNames);
clearBtn.addEventListener("click", () => {
  document.getElementById("results").innerHTML = "";
  document.getElementById("noResultMsg").classList.add("hidden");
});
