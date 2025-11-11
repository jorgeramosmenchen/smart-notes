console.log("Smart Notes + Tasks con almacenamiento local 👋");

// === ELEMENTOS DOM ===
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList  = document.getElementById('task-list');

const noteForm  = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesBox  = document.getElementById('notes-container');

// === ESTADO ===
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// === FUNCIONES ===

// Guardar en localStorage
function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Renderizar tareas en pantalla
function renderizarTareas() {
  taskList.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${tarea}</span>
      <button class="delete" data-index="${index}">✖</button>
    `;
    taskList.appendChild(li);
  });
}

// Añadir nueva tarea
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = taskInput.value.trim();
  if(!texto) return;
  tareas.unshift(texto); // Añadir al principio
  guardarTareas();
  renderizarTareas();
  taskInput.value = "";
});

// Eliminar tarea
taskList.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete')){
    const index = e.target.dataset.index;
    tareas.splice(index, 1);
    guardarTareas();
    renderizarTareas();
  }
});

// === NOTAS (demo, sin guardado todavía) ===
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = noteInput.value.trim();
  if(!texto) return;
  const div = document.createElement('div');
  div.className = "note";
  div.innerHTML = `<div>${texto}</div><div class="muted">guardada (demo)</div>`;
  notesBox.prepend(div);
  noteInput.value = "";
});

// === CARGAR AL INICIAR ===
renderizarTareas();

