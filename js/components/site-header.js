class SiteHeader extends HTMLElement {
  connectedCallback() {
    const isColorcast = this.getAttribute('variant') === 'colorcast';
    const logoSrc = isColorcast
      ? 'assets/logo/cc-logo-light.svg'
      : 'assets/logo/cc-logo.svg';

    this.innerHTML = `
      <div class="nav-group">
        <a class="cc-nav" href="colorcast.html">
          <img src="${logoSrc}" alt="Colorcast" class="cc-nav-btn">
        </a>
        <div id="mgp-logo-lottie"></div>
      </div>
    `;

    this.setupAnimations();
  }

  setupAnimations() {
    const lottieContainer = this.querySelector('#mgp-logo-lottie');
    
    const logoAnimation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/logo/mgp-logo-animation.json'
    });

    // Hover
    lottieContainer.addEventListener('mouseenter', () => {
      logoAnimation.playSegments([10, 60], true);
      logoAnimation.loop = true;
    });

    lottieContainer.addEventListener('mouseleave', () => {
      logoAnimation.loop = false;
      logoAnimation.stop();
    });

    // Click
    lottieContainer.addEventListener('click', (e) => {
      e.preventDefault();

      logoAnimation.loop = false; 
      logoAnimation.stop(); 

      logoAnimation.playSegments([0, 6], true);

      setTimeout(() => { 
        window.location.href = 'index.html'; 
      }, 500);
    });
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}