class ProjectCard extends HTMLElement {
  static get observedAttributes() { return ['href', 'src', 'alt', 'title', 'type', 'year']; }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const href  = this.getAttribute('href');
    const src   = this.getAttribute('src')   || '';
    const alt   = this.getAttribute('alt')   || '';
    const title = this.getAttribute('title') || '';
    const type  = this.getAttribute('type')  || '';
    const year  = this.getAttribute('year')  || '';

    const isClickable = typeof href === 'string' && href.trim() !== '';
    const tag = isClickable ? 'a' : 'div';
    const hrefAttr = isClickable ? ` href="${href}"` : '';

    this.innerHTML = `
    <${tag}${hrefAttr} class="project-card${isClickable ? '' : ' project-card--static'}">
        <img src="${src}" alt="${alt}" class="project-card__image" />
        <div class="project-card__content body-md">
          <span class="project-card__title">${title}</span>
          <span class="project-card__year">${year}</span>
          <span class="project-card__type">${type}</span>
        </div>
    </${tag}>
    `;
  }
}

if (!customElements.get('project-card')) {
  customElements.define('project-card', ProjectCard);
}