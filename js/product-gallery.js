document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('.gallery-main');
    const thumbs = [...gallery.querySelectorAll('.thumb')];
    const prev = gallery.querySelector('.gallery-prev');
    const next = gallery.querySelector('.gallery-next');
    let index = Math.max(0, thumbs.findIndex(t => t.classList.contains('active')));

    const show = (i) => {
      if (!thumbs.length) return;
      index = (i + thumbs.length) % thumbs.length;
      const thumb = thumbs[index];
      main.src = thumb.dataset.src;
      main.alt = thumb.dataset.alt || '';
      thumbs.forEach((t, n) => t.classList.toggle('active', n === index));
    };

    const updateLightbox = () => {
      if (!lightbox || !lightboxImage || !thumbs[index]) return;
      const thumb = thumbs[index];
      lightboxImage.src = thumb.dataset.src;
      lightboxImage.alt = thumb.dataset.alt || main.alt || '';
      if (lightboxCaption) lightboxCaption.textContent = thumb.dataset.alt || '';
    };

    const openLightbox = () => {
      if (!lightbox) return;
      updateLightbox();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const lightboxShow = (i) => {
      show(i);
      updateLightbox();
    };

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));
    prev?.addEventListener('click', (event) => { event.stopPropagation(); show(index - 1); });
    next?.addEventListener('click', (event) => { event.stopPropagation(); show(index + 1); });
    main?.addEventListener('click', openLightbox);

    lightboxPrev?.addEventListener('click', (event) => {
      event.stopPropagation();
      lightboxShow(index - 1);
    });
    lightboxNext?.addEventListener('click', (event) => {
      event.stopPropagation();
      lightboxShow(index + 1);
    });
    lightboxClose?.addEventListener('click', (event) => {
      event.stopPropagation();
      closeLightbox();
    });
  });

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
});
