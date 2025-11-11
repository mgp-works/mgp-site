class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
            <p class="footer-text caption-md">min-gyo park © 2025 — powered by carbs and curiosity.</p>
              <img class="footer-img" src="assets/svg/mc-flower.svg" alt="footer image">
      </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}