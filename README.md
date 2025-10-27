# 🌱 Proyecto Hidroponía EPS Vedia

## 📘 Descripción General

Este proyecto fue desarrollado por estudiantes y docentes de la **Escuela de Educación Técnica N°1 de Vedia** como parte del programa de **innovación educativa y sustentabilidad**.  
El sistema permite **automatizar el riego de una huerta hidropónica** mediante un **ESP32**, controlando la **bomba de agua**, la **temperatura** y la **humedad ambiental**, con **conexión a Firebase** y una **interfaz web interactiva**.

---

## ⚙️ Componentes Principales

### 🧠 Hardware
- **ESP32** (microcontrolador principal)  
- **Sensor DHT11 o AHT20** – mide temperatura y humedad  
- **Módulo de relé 5V** – activa/desactiva la bomba de riego  
- **Fuente de alimentación 5V / 3.3V**  
- **Bomba de agua 220V**  
- **Conexión WiFi local**

### 💻 Software
| Archivo | Descripción |
|----------|--------------|
| **TemporizadorFinal_DH11_PaginaEps_VersionFirebase3.ino** | Código Arduino para el ESP32: lee datos del sensor, controla el relé y sincroniza con Firebase. |
| **index.html** | Página principal del sitio web. |
| **proyecto.html** | Explicación del proyecto. |
| **nosotros.html** | Presentación del equipo de trabajo. |
| **huerta.html** | Panel de control: muestra clima y controla la bomba. |
| **js/app.js** | Conexión y actualización con Firebase. |
| **css/estilos.css** | Estilos visuales del sitio. |

---

## 🔌 Conexión entre ESP32 y Firebase

El **ESP32** se comunica con **Firebase Realtime Database** utilizando la librería `FirebaseESP32`.

### 🔁 Flujo de Datos

1. El ESP32 **lee temperatura y humedad** del sensor.  
2. Envía los valores a Firebase:  
   ```plaintext
   /datos/temp = 25.4
   /datos/hum = 68.2
   ```
3. La web `huerta.html` **lee esos datos en tiempo real** y los muestra.  
4. El usuario puede cambiar el **modo** y el **estado del relé** desde la interfaz.  
5. El ESP32 **lee los cambios** y actúa en consecuencia.

---

## 🌐 Interfaz Web

### Funciones Principales
- Visualiza **temperatura** y **humedad** del invernadero.  
- **Acceso protegido por PIN** (5 dígitos).  
- **Modo Manual:** encender o apagar la bomba desde la web.  
- **Modo Automático:** configurar minutos de encendido y apagado.

---

## 🔥 Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).  
2. Activar **Realtime Database** y establecer reglas públicas de prueba:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
3. Copiar las credenciales del proyecto y pegarlas en `js/app.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     databaseURL: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

---

## 🧩 Librerías Necesarias (Arduino IDE)

- `WiFi.h` (incluida con ESP32)  
- `FirebaseESP32`  
- `DHT sensor library` o `Adafruit AHTX0`  
- `ArduinoJson`  
- `NTPClient`

---

## 🔧 Flujo de Funcionamiento

```text
+-------------+        +-------------+        +-------------+
|  Interfaz   | <----> |   Firebase  | <----> |    ESP32    |
|   Web (HTML)|        |   Database  |        |  + DHT11 +  |
|   + JS + CSS|        |   Realtime  |        |   + Relé    |
+-------------+        +-------------+        +-------------+
```

---

## 🔒 Seguridad

- Acceso protegido por **PIN de 5 dígitos**.  
- Validación del PIN en el cliente (JavaScript).

---

## 🚀 Deploy en Firebase Hosting

```bash
firebase login
firebase init
firebase deploy
```

⚠️ Asegúrate de seleccionar el **proyecto correcto** en la configuración (`firebase.json`).

---

## 🧠 Créditos

**Proyecto Hidroponía EPS Vedia**  
Desarrollado por estudiantes y docentes de la  
**Escuela de Educación Técnica N°1 de Vedia**
