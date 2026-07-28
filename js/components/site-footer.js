class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
            <p class="footer-text caption">Mingyo Park © 2026 — Powered by carbs and curiosity.</p>
              <img class="footer-img" src="assets/footer-flower.svg" alt="footer image">
      </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}