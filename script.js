// --- 1. 데이터 정의 (예시) ---
// 실제로 쓸 땐 이 배열들을 점점 늘려가면 된다 해.

const familyNames = [
  {
    kanji: "佐藤",
    romaji: "Satou",
    kana: "さとう",
    meaning: "조력자, 돕는 자 (佐) + 등나무(藤) 가문"
  },
  {
    kanji: "鈴木",
    romaji: "Suzuki",
    kana: "すずき",
    meaning: "방울(鈴) + 나무(木), 옛 신사 관련 성씨"
  },
  {
    kanji: "高橋",
    romaji: "Takahashi",
    kana: "たかはし",
    meaning: "높은(高) + 다리(橋)"
  },
  {
    kanji: "田中",
    romaji: "Tanaka",
    kana: "たなか",
    meaning: "논(田)의 가운데(中)에 사는 집안"
  },
  {
    kanji: "中村",
    romaji: "Nakamura",
    kana: "なかむら",
    meaning: "마을(村)의 가운데(中)"
  }
];

const givenNames = [
  {
    kanji: "春香",
    romaji: "Haruka",
    kana: "はるか",
    gender: "f",
    vibes: ["cute", "soft"],
    era: "modern",
    meaning: "봄(春)의 향기(香)"
  },
  {
    kanji: "蓮",
    romaji: "Ren",
    kana: "れん",
    gender: "m",
    vibes: ["cool", "modern"],
    era: "modern",
    meaning: "연꽃(蓮) — 깨끗함, 고결함"
  },
  {
    kanji: "千代",
    romaji: "Chiyo",
    kana: "ちよ",
    gender: "f",
    vibes: ["classic", "elegant"],
    era: "traditional",
    meaning: "천(千)년의 세월(代), 장수와 축복"
  },
  {
    kanji: "葵",
    romaji: "Aoi",
    kana: "あおい",
    gender: "unisex",
    vibes: ["soft", "modern"],
    era: "modern",
    meaning: "꽃 이름(葵), 상쾌함과 생명력"
  },
  {
    kanji: "一真",
    romaji: "Kazuma",
    kana: "かずま",
    gender: "m",
    vibes: ["cool", "classic"],
    era: "traditional",
    meaning: "하나(一)의 진실(真), 한결같음"
  },
  {
    kanji: "光莉",
    romaji: "Hikari",
    kana: "ひかり",
    gender: "f",
    vibes: ["cute", "bright"],
    era: "modern",
    meaning: "빛(光) + 자주 쓰이는 여자 이름 한자(莉)"
  },
  {
    kanji: "夜斗",
    romaji: "Yato",
    kana: "やと",
    gender: "m",
    vibes: ["dark", "cool"],
    era: "modern",
    meaning: "밤(夜) + 싸움/말다툼(斗) — 다크한 배틀물 느낌"
  },
  {
    kanji: "静流",
    romaji: "Shizuru",
    kana: "しずる",
    gender: "f",
    vibes: ["elegant", "classic"],
    era: "traditional",
    meaning: "고요함(静) + 흐름(流)"
  },
  {
    kanji: "空",
    romaji: "Sora",
    kana: "そら",
    gender: "unisex",
    vibes: ["soft", "modern"],
    era: "modern",
    meaning: "하늘(空) — 자유로움, 개방감"
  },
  {
    kanji: "黒羽",
    romaji: "Kuroba",
    kana: "くろば",
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

// --- 3. 이름 생성 로직 ---

function generateNames() {
  const gender = document.getElementById("gender").value;
  const vibe = document.getElementById("vibe").value;
  const era = document.getElementById("era").value;
  const count = parseInt(document.getElementById("count").value, 10);

  const resultsDiv = document.getElementById("results");
  const noResultMsg = document.getElementById("noResultMsg");

  resultsDiv.innerHTML = "";
  noResultMsg.classList.add("hidden");

  // 1) 필터링
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

  // 2) 섞고 개수만큼 자르기
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // 3) 각 이름에 랜덤 성 붙이고 카드 렌더링
  selected.forEach((given) => {
    const family = getRandomItem(familyNames);
    const fullKanji = `${family.kanji} ${given.kanji}`;
    const fullRomaji = `${family.romaji} ${given.romaji}`;
    const fullKana = `${family.kana} ${given.kana}`;

    const card = document.createElement("article");
    card.className = "name-card";

    const header = document.createElement("div");
    header.className = "name-header";

    const main = document.createElement("div");
    main.className = "name-main";
    main.textContent = fullKanji;

    const romaji = document.createElement("div");
    romaji.className = "name-romaji";
    romaji.textContent = fullRomaji;

    header.appendChild(main);
    header.appendChild(romaji);

    const kana = document.createElement("div");
    kana.className = "name-kana";
    kana.textContent = `읽기: ${fullKana}`;

    const meta = document.createElement("div");
    meta.className = "name-meta";

    const tags = [];

    // 성별 태그
    let genderLabel = "";
    if (given.gender === "m") genderLabel = "남";
    else if (given.gender === "f") genderLabel = "여";
    else genderLabel = "유니섹스";
    tags.push(`성별: ${genderLabel}`);

    // 분위기 표시
    if (given.vibes && given.vibes.length > 0) {
      tags.push(`분위기: ${given.vibes.join(", ")}`);
    }

    // 시대감
    if (given.era === "modern") tags.push("시대: 현대풍");
    else if (given.era === "traditional") tags.push("시대: 전통풍");

    meta.textContent = tags.join(" | ");

    const meaning = document.createElement("div");
    meaning.className = "name-meaning";
    meaning.textContent = `의미: ${given.meaning} / 성(姓): ${family.meaning}`;

    // 태그 배지 표시 (분위기 기반)
    const tagContainer = document.createElement("div");
    given.vibes.forEach((v) => {
      const span = document.createElement("span");
      span.className = "tag";
      if (v === "dark") span.classList.add("dark");
      if (v === "classic") span.classList.add("classic");
      span.textContent = v;
      tagContainer.appendChild(span);
    });

    // 복사 버튼
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "이 이름 복사";
    copyBtn.addEventListener("click", () => {
      const textToCopy = `${fullKanji} (${fullRomaji}) - ${given.meaning}`;
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

    card.appendChild(header);
    card.appendChild(kana);
    card.appendChild(meta);
    card.appendChild(meaning);
    card.appendChild(tagContainer);
    card.appendChild(copyBtn);

    resultsDiv.appendChild(card);
  });
}

// --- 4. 이벤트 연결 ---

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");

  generateBtn.addEventListener("click", generateNames);
  clearBtn.addEventListener("click", () => {
    document.getElementById("results").innerHTML = "";
    document.getElementById("noResultMsg").classList.add("hidden");
  });
});
