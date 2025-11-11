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

// === NOTAS ===
let notas = JSON.parse(localStorage.getItem('notas')) || [];

function guardarNotas() {
  localStorage.setItem('notas', JSON.stringify(notas));
}

function renderizarNotas() {
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
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = noteInput.value.trim();
  if(!texto) return;
  notas.unshift(texto);
  guardarNotas();
  renderizarNotas();
  noteInput.value = "";
});

notesBox.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete-note')){
    const index = e.target.dataset.index;
    notas.splice(index, 1);
    guardarNotas();
    renderizarNotas();
  }
});

// === CARGAR TODO AL INICIAR ===
renderizarTareas();
renderizarNotas();


