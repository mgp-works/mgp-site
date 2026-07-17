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

document.getElementById("generate-button").addEventListener("click", async () => {
  const idleBox = document.getElementById("idle");
  const loadingBox = document.getElementById("loading");
  const resultBox = document.getElementById("result");
  const heroText = document.querySelector("#result .cc-title");
  const resultCard = document.getElementById("result-card");
  const resultActions = document.querySelector(".cc-result-actions");
  const dateText = document.getElementById("resultDate");
  const enText = document.getElementById("fortuneEN");
  const colorBox = document.getElementById("colors");

  idleBox.style.display = "none";
  resultBox.style.display = "none";
  loadingBox.style.display = "block";

  try {
    const res = await fetch("https://colorcast-api.vercel.app/api/generate-colorcast");
    const data = await res.json();

    loadingBox.style.display = "none";

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
    }

    resultBox.style.display = "block";
  } catch (err) {
    loadingBox.style.display = "none";
    heroText.textContent = "Something went wrong.";
    resultCard.style.display = "none";
    resultActions.style.display = "none";
    resultBox.style.display = "block";
  }
});

document.getElementById("save-png-button").addEventListener("click", async () => {
  const card = document.getElementById("result-card");
  await document.fonts.ready;
  const canvas = await html2canvas(card, { backgroundColor: "#000000" });
  const link = document.createElement("a");
  link.download = "colorcast.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});