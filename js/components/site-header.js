class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header page">
        <div class="col-span-2">
          <a href="index.html" class="title-md">mgp.works</a>
        </div>

        <div class="col-span-5">
          <nav class="nav">
            <a href="works.html" class="nav-link title-md">works</a>
            <a href="colorcast.html" class="nav-link title-md">colorcast</a>
            <a href="about.html" class="nav-link title-md">about</a>
          </nav>
        </div>

        <!-- This image acts as menu toggle on mobile -->
        <div class="logo col-span-1">
          <img class="logo__img" src="assets/svg/mc-face.svg" alt="logo" width="20">
        </div>
      </header>

      <!-- Mobile nav (hidden by default) -->
      <div class="mobile-nav" id="mobileNav">
        <button class="close-btn" aria-label="Close menu">✕</button>
        <a href="works.html" class="nav-link">works</a>
        <a href="colorcast.html" class="nav-link">colorcast</a>
        <a href="about.html" class="nav-link">about</a>
      </div>
    `;

    // highlight active nav link
    const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    this.querySelectorAll('header a[href], .mobile-nav a[href]').forEach(a => {
      const href = a.getAttribute('href')?.toLowerCase();
      if (href === currentPage) a.classList.add('active');
    });

    const logo = this.querySelector('.logo');
    const mobileNav = this.querySelector('#mobileNav');
    const closeBtn = this.querySelector('.close-btn');
    const mediaQuery = window.matchMedia('(max-width: 720px)');

    const originalSrc = 'assets/svg/mc-face.svg';
    const easterEggSrc = 'assets/svg/mc-face-alt.svg';

    function handleLogoClick() {
      if (mediaQuery.matches) {
        mobileNav.classList.add('active');
      } else {
        logo.src = logo.src.includes('mc-face-alt') ? originalSrc : easterEggSrc;
      }
    }

    function handleCloseClick() {
      mobileNav.classList.remove('active');
    }

    logo.addEventListener('click', handleLogoClick);
    closeBtn.addEventListener('click', handleCloseClick);
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}