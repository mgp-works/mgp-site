document.getElementById("generate-button").addEventListener("click", async () => {
  const button = document.getElementById("generate-button");
  const resultBox = document.getElementById("result");
  const krText = document.getElementById("fortuneKR");
  const enText = document.getElementById("fortuneEN");
  const colorBox = document.getElementById("colors");

  button.disabled = true;
  button.innerText = "Loading...";

  try {
    const res = await fetch("https://colorcast-api.vercel.app/api/generate-colorcast");
    const data = await res.json();

    krText.textContent = data.fortune_kr;
    enText.textContent = data.fortune_en;

    colorBox.innerHTML = "";
    data.colors.forEach(hex => {
      const swatch = document.createElement("div");
      swatch.style.backgroundColor = hex;
      swatch.className = "swatch";
      swatch.textContent = hex;
      colorBox.appendChild(swatch);
    });

    resultBox.style.display = "block";
  } catch (err) {
    krText.textContent = "오류가 발생했어요.";
    enText.textContent = "Something went wrong.";
  } finally {                                          
    button.disabled = false;
    button.innerText = "Reveal my fortune";
  }
});