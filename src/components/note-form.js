class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initValidation();
  }

  render() {
    this.innerHTML = `
      <form id="form" class="note-form">
        <label for="title">Judul</label>
        <input type="text" id="title" placeholder="Judul catatan" /> 
        <span class="error" id="titleError">Judul wajib diisi</span>

        <label for="body">Isi catatan</label>
        <textarea id="body" placeholder="Isi catatan"></textarea>
        <span class="error" id="bodyError">Minimal 10 karakter</span>

        <button type="submit" disabled>Tambah Catatan</button>
      </form>
    `;
  }

  initValidation() {
    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');
    const titleError = this.querySelector('#titleError');
    const bodyError = this.querySelector('#bodyError');
    const button = this.querySelector('button');
    const form = this.querySelector('#form');

    const validate = () => {
      let isValid = true;

      // Validasi Title
      if (titleInput.value.trim() === '') {
        titleError.style.display = 'block';
        isValid = false;
      } else {
        titleError.style.display = 'none';
      }

      // Validasi Body
      if (bodyInput.value.trim().length < 10) {
        bodyError.style.display = 'block';
        isValid = false;
      } else {
        bodyError.style.display = 'none';
      }

      // Enable/ disable button
      button.disabled = !isValid;
    };

    const resetValidation = () => {
      titleError.style.display = 'none';
      bodyError.style.display = 'none';
      button.disabled = true;
    };

    titleInput.addEventListener('input', validate);
    bodyInput.addEventListener('input', validate);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      this.dispatchEvent(
        new CustomEvent('add-note', {
          detail: { title, body },
          bubbles: true,
        }),
      );

      form.reset();
      resetValidation(); // reset state
    });
  }
}

customElements.define('note-form', NoteForm);
