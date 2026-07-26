class ProjectNav extends HTMLElement {
  static get observedAttributes() {
    return ['previous-href', 'previous-title', 'next-href', 'next-title'];
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const previousHref = this.getAttribute('previous-href');
    const previousTitle = this.getAttribute('previous-title') || 'Previous';
    const nextHref = this.getAttribute('next-href');
    const nextTitle = this.getAttribute('next-title') || 'Next';

    const previousLink = previousHref
      ? `<a class="project-nav__link project-nav__link--previous" href="${previousHref}">
          <img src="assets/arrow-left-icon.svg" alt="" class="project-nav__icon" />
          <span>${previousTitle}</span>
        </a>`
      : '';

    const nextLink = nextHref
      ? `<a class="project-nav__link project-nav__link--next" href="${nextHref}">
          <span>${nextTitle}</span>
          <img src="assets/arrow-right-icon.svg" alt="" class="project-nav__icon" />
        </a>`
      : '';

    this.innerHTML = `
      <nav class="project-nav page">
        ${previousLink}
        ${nextLink}
      </nav>
    `;
  }
}

if (!customElements.get('project-nav')) {
  customElements.define('project-nav', ProjectNav);
}
