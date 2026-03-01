if (!customElements.get('toggle-box')) {
  class ToggleBox extends HTMLElement {
    connectedCallback() {
      if (this._connected) return;
      this._connected = true;

      const button = this.querySelector('.toggle-box--button');
      if (!button) return;

      button.addEventListener('click', (e) => {
        e.preventDefault();

        const group = this.closest('.toggle-boxes--inner');
        if (group) {
          group.querySelectorAll('toggle-box[open]').forEach((el) => {
            if (el !== this) el.removeAttribute('open');
          });
        }

        if (this.hasAttribute('open')) {
          this.removeAttribute('open');
        } else {
          this.setAttribute('open', '');
        }
      });
    }
  }

  customElements.define('toggle-box', ToggleBox);
}

if (!customElements.get('scroll-shadow')) {
  class ScrollShadow extends HTMLElement {}
  customElements.define('scroll-shadow', ScrollShadow);
}
