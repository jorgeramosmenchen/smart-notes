// === NOTAS ===
const noteForm  = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesBox  = document.getElementById('notes-container');

function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const out = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(out)) throw new Error("No es array");
    return out;
  } catch (e) {
    console.warn("[NOTAS] Fallo leyendo", key, "→ reseteando.", e);
    localStorage.removeItem(key);
    return [];
  }
}

let notas = loadArray('notas');

function guardarNotas() {
  localStorage.setItem('notas', JSON.stringify(notas));
  console.log("[NOTAS] Guardadas:", notas);
}

export function renderizarNotas() {
  notesBox.innerHTML = "";
  notas.forEach((nota, index) => {
    const div = document.createElement('div');
    div.className = "note";
    div.innerHTML = `
      <div>${nota}</div>
      <div class="muted">guardada</div>
      <button class="delete-note" data-index="${index}">✖</button>
    `;
    notesBox.prepend(div);
  });
  console.log("[NOTAS] Render:", notas);
}

function toast(texto, tipo = "ok") {
  const msg = document.createElement('div');
  msg.className = `msg ${tipo}`;
  msg.textContent = texto;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = noteInput.value.trim();
  if (!texto) return;
  notas.unshift(texto);
  guardarNotas();
  renderizarNotas();
  toast("Nota guardada 📝");
  noteInput.value = "";
});

notesBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-note')) {
    const index = Number(e.target.dataset.index);
    if (!Number.isNaN(index)) {
      notas.splice(index, 1);
      guardarNotas();
      renderizarNotas();
      toast("Nota eliminada 🗑️", "error");
    }
  }
});
