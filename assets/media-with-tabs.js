class MediaWithTabs extends HTMLElement {
  connectedCallback() {
    this.media = this.querySelector('.media-with-tabs--media');
    this.tabs = Array.from(this.querySelectorAll('.media-with-tabs--tab'));

    if (!this.media || !this.tabs.length) return;

    this.tabs.forEach((tab, index) => {
      const btn = tab.querySelector('.media-with-tabs--button');
      if (!btn) return;
      btn.addEventListener('click', () => {
        this.setActive(index, true);
      });
    });

    this.initSlider();

    const initialIndex = this.tabs.findIndex(t => t.classList.contains('active'));
    this.setActive(initialIndex >= 0 ? initialIndex : 0, false);
  }

  initSlider() {
    if (this.slider) return;

    if (window.theme && theme.Slideshow && window.Flickity) {
      const slideCount = this.media.querySelectorAll('.carousel__slide').length;

      if (slideCount > 1) {
        const args = {
          adaptiveHeight: false,
          autoPlay: false,
          avoidReflow: true,
          pageDots: false,
          prevNextButtons: false,
          setGallerySize: false,
          wrapAround: false,
          callbacks: {
            onChange: (index) => {
              this.setActive(index, false);
            }
          }
        };

        this.slider = new theme.Slideshow(this.media, args);
      } else {
        const firstSlide = this.media.querySelector('.carousel__slide');
        if (firstSlide) firstSlide.classList.add('is-selected');
      }

      this.media.classList.add('flickity-enabled');
      this.media.dataset.initiated = 'true';
    } else {
      // Fallback: no slider available, just swap selected class
      this.media.dataset.initiated = 'false';
    }
  }

  setActive(index, syncSlider) {
    const safeIndex = Math.max(0, Math.min(index, this.tabs.length - 1));

    this.tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === safeIndex);
      const btn = tab.querySelector('.media-with-tabs--button');
      if (btn) btn.setAttribute('aria-expanded', i === safeIndex ? 'true' : 'false');
    });

    if (this.slider && syncSlider && typeof this.slider.goToSlide === 'function') {
      this.slider.goToSlide(safeIndex);
    } else if (!this.slider) {
      const slides = Array.from(this.media.querySelectorAll('.carousel__slide'));
      slides.forEach((slide, i) => slide.classList.toggle('is-selected', i === safeIndex));
    }
  }
}

if (!customElements.get('media-with-tabs')) {
  customElements.define('media-with-tabs', MediaWithTabs);
}
