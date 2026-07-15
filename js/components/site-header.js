class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="nav-group">
        <a class="nav-cc" href="colorcast.html">
          <img src="assets/logo/cc-logo.svg" alt="Colorcast" class="cc-logo-img">
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