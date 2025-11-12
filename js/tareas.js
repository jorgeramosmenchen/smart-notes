// === TAREAS ===
const taskForm  = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList  = document.getElementById('task-list');

// Carga robusta desde localStorage
function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const out = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(out)) throw new Error("No es array");
    return out;
  } catch (e) {
    console.warn("[TAREAS] Fallo leyendo", key, "→ reseteando.", e);
    localStorage.removeItem(key);
    return [];
  }
}

let tareas = loadArray('tareas');

function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
  console.log("[TAREAS] Guardadas:", tareas);
}

export function renderizarTareas() {
  taskList.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${tarea}</span>
      <button class="delete" data-index="${index}">✖</button>
    `;
    taskList.appendChild(li);
  });
  console.log("[TAREAS] Render:", tareas);
}

function toast(texto, tipo = "ok") {
  const msg = document.createElement('div');
  msg.className = `msg ${tipo}`;
  msg.textContent = texto;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = taskInput.value.trim();
  if (!texto) return;
  tareas.unshift(texto);
  guardarTareas();
  renderizarTareas();
  toast("Tarea guardada ✅");
  taskInput.value = "";
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = Number(e.target.dataset.index);
    if (!Number.isNaN(index)) {
      tareas.splice(index, 1);
      guardarTareas();
      renderizarTareas();
      toast("Tarea eliminada ❌", "error");
    }
  }
});
