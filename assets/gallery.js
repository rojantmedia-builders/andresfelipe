if (!customElements.get('theme-gallery')) {
  class ThemeGallery extends HTMLElement {}
  customElements.define('theme-gallery', ThemeGallery);
}
