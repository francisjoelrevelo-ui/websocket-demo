# Proyecto de Chat en Tiempo Real (WebSockets)

Este proyecto es una aplicación web de chat en tiempo real desarrollada con **Node.js**, **Express** y **WebSockets (ws)**.

## Estructura del Proyecto

- `client/`: Contiene la interfaz gráfica del usuario (HTML, CSS y JavaScript Vanilla).
- `server/`: Contiene la lógica del servidor de Node.js y la configuración de WebSockets.

## Instrucciones de Ejecución Local

Para ejecutar este proyecto en tu computadora, sigue estos pasos:

1. **Instalar dependencias:**
   Abre una terminal, navega a la carpeta `server/` y ejecuta:
   ```bash
   cd server
   npm install
   ```

2. **Iniciar el Servidor:**
   En la misma carpeta `server/`, ejecuta el siguiente comando para levantar el servidor en el puerto 8080:
   ```bash
   node server.js
   ```

3. **Abrir el Cliente:**
   Abre el archivo `client/index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge).

4. **Conectar:**
   En la interfaz web, asegúrate de que la URL de conexión sea `ws://localhost:8080` y haz clic en el botón **Conectar**. ¡Ahora puedes abrir múltiples pestañas para simular diferentes usuarios chateando!

## Despliegue (OpenShift)

El proyecto incluye archivos `Dockerfile` preparados para su contenedorización y despliegue en entornos como Red Hat OpenShift o Kubernetes.
