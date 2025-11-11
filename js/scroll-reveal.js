window.addEventListener('DOMContentLoaded', async () => {
  if ('whenDefined' in customElements) {
    try { await customElements.whenDefined('project-card'); } catch {}
  }
  await new Promise(r => requestAnimationFrame(r));

  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');      // fade in
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px',
  });

  items.forEach(el => io.observe(el));
});