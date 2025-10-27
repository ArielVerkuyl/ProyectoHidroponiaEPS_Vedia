PROYECTO HIDROPONÍA EPS VEDIA
=============================

DESCRIPCIÓN GENERAL
-------------------
Este proyecto fue desarrollado por estudiantes y docentes de la Escuela de Educación Técnica N°1 de Vedia como parte del programa de innovación educativa y sustentabilidad.
El sistema permite automatizar el riego de una huerta hidropónica mediante un ESP32, controlando la bomba de agua, la temperatura y la humedad ambiental, con conexión a Firebase y una interfaz web interactiva.

COMPONENTES PRINCIPALES
-----------------------
HARDWARE:
- ESP32 (microcontrolador principal)
- Sensor DHT11 o AHT20 (mide temperatura y humedad)
- Módulo de relé 5V (activa/desactiva la bomba de riego)
- Fuente de alimentación 5V / 3.3V
- Bomba de agua 220V
- Conexión WiFi local

SOFTWARE:
- TemporizadorFinal_DH11_PaginaEps_VersionFirebase3.ino → código Arduino para el ESP32
- index.html → página principal del sitio web
- proyecto.html → información del proyecto
- nosotros.html → información sobre los integrantes
- huerta.html → panel de control con temperatura, humedad y control de bomba
- js/app.js → conexión con Firebase
- css/estilos.css → estilos visuales

CONEXIÓN ENTRE ESP32 Y FIREBASE
-------------------------------
El ESP32 se comunica con Firebase Realtime Database utilizando la librería FirebaseESP32.

Flujo de datos:
1. El ESP32 lee temperatura y humedad del sensor DHT11.
2. Envía los valores a Firebase:
   /datos/temp = 25.4
   /datos/hum = 68.2
3. La web huerta.html lee esos datos en tiempo real.
4. El usuario puede cambiar el modo de control (manual o automático) y encender/apagar la bomba.
5. El ESP32 lee los cambios y actúa según el modo seleccionado.

INTERFAZ WEB
-------------
Funciones principales:
- Visualizar temperatura y humedad del invernadero.
- Acceso protegido por PIN de 5 dígitos.
- Modo Manual: encender/apagar bomba desde la web.
- Modo Automático: configurar minutos de encendido/apagado.

CONFIGURACIÓN DE FIREBASE
-------------------------
1. Crear un proyecto en Firebase Console.
2. Activar Realtime Database y permitir lectura/escritura pública para pruebas.
3. Copiar las credenciales del proyecto e insertarlas en js/app.js.

INSTALACIÓN DE LIBRERÍAS ARDUINO
---------------------------------
- WiFi.h (incluida con ESP32)
- FirebaseESP32
- DHT sensor library o Adafruit AHTX0
- ArduinoJson
- NTPClient

FLUJO DE FUNCIONAMIENTO
-----------------------
Interfaz Web ↔ Firebase Database ↔ ESP32 (con sensor y relé)

SEGURIDAD
----------
- El acceso al control de bomba está protegido por PIN.
- El PIN se valida en el cliente (JavaScript).

DEPLOY
------
Para subir el sitio a Firebase Hosting:
    firebase login
    firebase init
    firebase deploy

CREDITOS
--------
Proyecto Hidroponía EPS Vedia
Desarrollado por estudiantes y docentes de la
Escuela de Educación Técnica N°1 de Vedia
