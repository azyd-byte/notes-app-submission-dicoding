class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        header {
          background: #6366f1;
          color: white;
          padding: 16px 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        h1 {
          margin: 0;
          font-size: 20px;
        }
      </style>

      <header>
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
