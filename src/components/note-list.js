import Swal from 'sweetalert2';
import {
  getNotes,
  getArchivedNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../api/notesApi.js';
import './note-item.js';

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
    this.archivedNotes = [];
    this.showArchived = false;
  }

  async connectedCallback() {
    // ADD
    this.handleAddNote = async (e) => {
      const { title, body } = e.detail;
      await this.addNote(title, body);
    };

    // DELETE
    this.handleDeleteNote = async (e) => {
      const { id } = e.detail;

      const result = await Swal.fire({
        title: 'Yakin?',
        text: 'Catatan akan dihapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      });

      if (!result.isConfirmed) return;

      try {
        await deleteNote(id);
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          timer: 1200,
          showConfirmButton: false,
        });

        await this.loadNotes();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Tidak bisa menghapus catatan',
        });
      }
    };

    // ARCHIVE / UNARCHIVE
    this.handleToggleArchive = async (e) => {
      const { id, archived } = e.detail;

      try {
        if (archived) {
          await unarchiveNote(id);
        } else {
          await archiveNote(id);
        }

        Swal.fire({
          icon: 'success',
          title: archived ? 'Unarchive!' : 'Diarsipkan!',
          timer: 1200,
          showConfirmButton: false,
        });

        await this.loadNotes();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Tidak bisa mengubah status',
        });
      }
    };

    document.addEventListener('add-note', this.handleAddNote);
    document.addEventListener('delete-note', this.handleDeleteNote);
    document.addEventListener('toggle-archive', this.handleToggleArchive);

    await this.loadNotes();
  }

  disconnectedCallback() {
    document.removeEventListener('add-note', this.handleAddNote);
    document.removeEventListener('delete-note', this.handleDeleteNote);
    document.removeEventListener('toggle-archive', this.handleToggleArchive);
  }

  async loadNotes() {
    this.innerHTML = `
  <div class="loading-container">
    <div class="spinner"></div>
  </div>
`;

    try {
      this.notes = await getNotes();
      this.archivedNotes = await getArchivedNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal memuat data',
        text: 'Periksa koneksi internet',
      });

      this.innerHTML = '<p> Gagal memuat data</p>';
      return;
    }

    this.render();
  }

  async addNote(title, body) {
    try {
      await createNote(title, body);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Catatan berhasil ditambahkan',
        timer: 1500,
        showConfirmButton: false,
      });
      await this.loadNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Tidak bisa menambahkan catatan',
      });
    }
  }

  render() {
    const currentNotes = this.showArchived ? this.archivedNotes : this.notes;

    this.innerHTML = `
     <div class="tabs">
  <button class="tab ${!this.showArchived ? 'active' : ''}" id="show-active">
    Active
  </button>
  <button class="tab ${this.showArchived ? 'active' : ''}" id="show-archived">
    Archived
  </button>
</div>

      ${
        currentNotes.length === 0
          ? `<div class="empty-state"><p>Tidak ada catatan</p></div>`
          : `
          <div class="notes-grid">
            ${currentNotes
              .map(
                (note) => `
              <note-item 
                id="${note.id}"
                title="${note.title}" 
                body="${note.body}"
                archived="${note.archived}">
              </note-item>
            `,
              )
              .join('')}
          </div>
        `
      }
    `;

    // TAB EVENT
    this.querySelector('#show-active').onclick = () => {
      this.showArchived = false;
      this.render();
    };

    this.querySelector('#show-archived').onclick = () => {
      this.showArchived = true;
      this.render();
    };
  }
}

customElements.define('note-list', NoteList);
