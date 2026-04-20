class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'body', 'archived', 'id'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const archived = this.getAttribute('archived') === 'true';

    this.innerHTML = `
      <div class="note-card ${archived ? 'archived' : ''}">
        <h3>${title}</h3>
        <p>${body}</p>

           <div class="note-actions">
           <button class="archive-btn">
           ${archived ? 'Unarchive' : 'Archive'}
           <button class="delete-btn">Hapus</button>
        </button>
         </div>
      </div>
    `;

    // EVENT DELETE
    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id: this.getAttribute('id') },
          bubbles: true,
        }),
      );
    });

    // EVENT ARCHIVE
    this.querySelector('.archive-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('toggle-archive', {
          detail: {
            id: this.getAttribute('id'),
            archived,
          },
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define('note-item', NoteItem);
