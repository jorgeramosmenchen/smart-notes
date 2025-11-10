console.log("Smart Notes + Tasks listo 👋");

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList  = document.getElementById('task-list');

const noteForm  = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesBox  = document.getElementById('notes-container');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if(!text) return;
  const li = document.createElement('li');
  li.innerHTML = `<span>${text}</span> <button class="delete">✖</button>`;
  taskList.prepend(li);
  taskInput.value = "";
});

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if(!text) return;
  const div = document.createElement('div');
  div.className = "note";
  div.innerHTML = `<div>${text}</div><div class="muted">guardada (versión demo)</div>`;
  notesBox.prepend(div);
  noteInput.value = "";
});
