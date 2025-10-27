import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from '../firebaseConfig.js';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Mostrar datos de sensores
onValue(ref(db, "sensor/temperatura"), (s) => {
  const el = document.getElementById("temp");
  if (el) el.innerText = s.val() + " °C";
});
onValue(ref(db, "sensor/humedad"), (s) => {
  const el = document.getElementById("hum");
  if (el) el.innerText = s.val() + " %";
});

// Firebase control (exponer funciones globales para botones en JSP)
window.setModo = (modo) => {
  update(ref(db, "control"), { modo });
  if (modo === "automatico") {
    const ts = document.getElementById("tiemposSection");
    if (ts) ts.style.display = "block";
  } else {
    const ts = document.getElementById("tiemposSection");
    if (ts) ts.style.display = "none";
  }
};

window.setRele = (estado) => {
  update(ref(db, "control"), { rele: estado });
};

window.guardarTiempos = () => {
  const minOn = parseInt(document.getElementById("minOn").value || 0);
  const minOff = parseInt(document.getElementById("minOff").value || 0);
  update(ref(db, "control"), { minutosON: minOn, minutosOFF: minOff });
};

// Escuchar confirmación del modo en Firebase
onValue(ref(db, "control/modo"), (s) => {
  const modoActual = s.val();
  const estadoModo = document.getElementById("estadoModo");
  if (!estadoModo) return;
  if (modoActual === "automatico") {
    estadoModo.innerText = "✅ Modo actual: AUTOMÁTICO (confirmado)";
    estadoModo.style.color = "green";
    const ts = document.getElementById("tiemposSection");
    if (ts) ts.style.display = "block";
  } else if (modoActual === "manual") {
    estadoModo.innerText = "✅ Modo actual: MANUAL (confirmado)";
    estadoModo.style.color = "blue";
    const ts = document.getElementById("tiemposSection");
    if (ts) ts.style.display = "none";
  } else {
    estadoModo.innerText = "⚠ Modo actual: DESCONOCIDO";
    estadoModo.style.color = "red";
  }
});

// Leer tiempos previos
onValue(ref(db, "control/minutosON"), (s) => {
  const val = s.val();
  const el = document.getElementById("minOn");
  if (el && val !== null) el.value = val;
});
onValue(ref(db, "control/minutosOFF"), (s) => {
  const val = s.val();
  const el = document.getElementById("minOff");
  if (el && val !== null) el.value = val;
});

// Login con teclado numérico (local, adicional)
const PIN_CORRECTO = "88888"; 
let pinIngresado = "";

window.mostrarLogin = () => {
  const acceso = document.getElementById("accesoSection");
  const login = document.getElementById("loginSection");
  if (acceso) acceso.style.display = "none";
  if (login) login.style.display = "block";
};

window.agregarNumero = (num) => {
  if (pinIngresado.length < 5) {
    pinIngresado += num;
    actualizarDisplay();
  }
};

window.borrarNumero = () => {
  pinIngresado = pinIngresado.slice(0, -1);
  actualizarDisplay();
};

function actualizarDisplay() {
  const displayEl = document.getElementById("pinDisplay");
  if (!displayEl) return;
  let display = pinIngresado.replace(/./g, "●");
  displayEl.innerText = display.padEnd(5, "_");
}

window.verificarPIN = () => {
  const loginError = document.getElementById("loginError");
  if (pinIngresado === PIN_CORRECTO) {
    const login = document.getElementById("loginSection");
    const control = document.getElementById("controlSection");
    if (login) login.style.display = "none";
    if (control) control.style.display = "block";
    if (loginError) loginError.innerText = "";
  } else {
    if (loginError) loginError.innerText = "PIN incorrecto. Intente de nuevo.";
    pinIngresado = "";
    actualizarDisplay();
  }
};
