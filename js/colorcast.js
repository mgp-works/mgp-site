function getContrastTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const [rl, gl, bl] = [r, g, b].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  const luminance = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

function formatToday() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const DAILY_LIMIT = 2;
const GENERATIONS_KEY = "colorcastGenerations";

function getGenerationCount() {
  const stored = JSON.parse(localStorage.getItem(GENERATIONS_KEY) || "null");
  if (!stored || stored.date !== new Date().toDateString()) return 0;
  return stored.count;
}

function incrementGenerationCount() {
  const count = getGenerationCount() + 1;
  localStorage.setItem(
    GENERATIONS_KEY,
    JSON.stringify({ count, date: new Date().toDateString() })
  );
  return count;
}

function showSection(id) {
  ["idle", "loading", "result", "limit-reached"].forEach(sectionId => {
    document.getElementById(sectionId).style.display = sectionId === id ? "block" : "none";
  });
}

async function handleGenerate() {
  if (getGenerationCount() >= DAILY_LIMIT) {
    showSection("limit-reached");
    return;
  }

  const heroText = document.querySelector("#result .cc-title");
  const resultCard = document.getElementById("result-card");
  const resultActions = document.querySelector(".cc-result-actions");
  const dateText = document.getElementById("resultDate");
  const enText = document.getElementById("fortuneEN");
  const colorBox = document.getElementById("colors");
  const tryAgainFollowup = document.getElementById("try-again-followup");
  const goHomeButton = document.getElementById("go-home-button");

  showSection("loading");

  try {
    const res = await fetch("https://colorcast-api.vercel.app/api/generate-colorcast");
    const data = await res.json();

    if (!res.ok || data.error) {
      heroText.textContent = "Something went wrong.";
      resultCard.style.display = "none";
      resultActions.style.display = "none";
    } else {
      heroText.textContent = "Today looks like this.";
      resultCard.style.display = "flex";
      resultActions.style.display = "flex";

      dateText.textContent = formatToday();
      enText.textContent = data.fortune;

      colorBox.innerHTML = "";
      data.colors.forEach(hex => {
        const swatch = document.createElement("div");
        swatch.style.backgroundColor = hex;
        swatch.style.color = getContrastTextColor(hex);
        swatch.className = "swatch caption";
        swatch.textContent = hex;
        colorBox.appendChild(swatch);
      });

      const reachedLimit = incrementGenerationCount() >= DAILY_LIMIT;
      tryAgainFollowup.style.display = reachedLimit ? "none" : "block";
      goHomeButton.style.display = reachedLimit ? "inline-flex" : "none";
    }

    showSection("result");
  } catch (err) {
    heroText.textContent = "Something went wrong.";
    resultCard.style.display = "none";
    resultActions.style.display = "none";
    showSection("result");
  }
}

document.getElementById("generate-button").addEventListener("click", handleGenerate);

document.getElementById("try-again-link").addEventListener("click", (e) => {
  e.preventDefault();
  handleGenerate();
});

document.getElementById("go-home-button").addEventListener("click", () => showSection("idle"));
document.getElementById("go-back-button").addEventListener("click", () => showSection("idle"));

document.getElementById("save-png-button").addEventListener("click", async () => {
  const card = document.getElementById("result-card");
  await document.fonts.ready;
  const canvas = await html2canvas(card, { backgroundColor: "#000000" });
  const link = document.createElement("a");
  link.download = "colorcast.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});