// === CAMBIO DE TEMA ===

// 1️⃣ Capturamos el botón
const btn = document.getElementById("theme-toggle");

// 2️⃣ Cargamos la preferencia guardada
const temaGuardado = localStorage.getItem("tema");

// 3️⃣ Si hay un tema guardado, aplicarlo
if (temaGuardado === "oscuro") {
  document.body.classList.add("dark-theme");
  btn.textContent = "☀️ Modo claro";
}

// 4️⃣ Evento al hacer clic
btn.addEventListener("click", () => {
  const modoOscuro = document.body.classList.toggle("dark-theme");
  
  // Cambia el texto del botón
  btn.textContent = modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  
  // Guarda la elección en localStorage
  localStorage.setItem("tema", modoOscuro ? "oscuro" : "claro");
});
