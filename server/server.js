const http = require('http');
const WebSocket = require('ws');

// 1. Crear el servidor HTTP base
const server = http.createServer((req, res) => {
  // Implementación del endpoint /health para monitoreo (ej. OpenShift/Kubernetes liveness probe)
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      connections: wss.clients.size 
    }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// 2. Adjuntar el servidor WebSocket al servidor HTTP existente
const wss = new WebSocket.Server({ server });

let nextClientId = 1;

// 3. Lógica principal de WebSocket
wss.on('connection', (ws) => {
  // Asignar ID incremental al nuevo cliente
  const clientId = nextClientId++;
  
  console.log(`[INFO] Cliente ${clientId} conectado.`);

  // Enviar mensaje de bienvenida al cliente recién conectado
  ws.send(JSON.stringify({ 
    type: 'welcome', 
    message: `Hola cliente ${clientId}` 
  }));

  // Escuchar mensajes entrantes del cliente
  ws.on('message', (messageAsString) => {
    try {
      // Intentamos parsear el mensaje (se espera { text: '...' })
      const data = JSON.parse(messageAsString);
      
      if (data.text) {
        // Formatear el mensaje a retransmitir
        const broadcastData = JSON.stringify({ 
          type: 'message', 
          from: clientId, 
          text: data.text 
        });

        // Reenviar a TODOS los clientes conectados
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastData);
          }
        });
      }
    } catch (error) {
      console.error(`[ERROR] No se pudo parsear el mensaje del cliente ${clientId}:`, error);
    }
  });

  // Manejar desconexión del cliente
  ws.on('close', () => {
    console.log(`[INFO] Cliente ${clientId} se ha desconectado.`);
    
    // Notificar a los demás clientes
    const disconnectMsg = JSON.stringify({ 
      type: 'info', 
      message: `Cliente ${clientId} se desconectó` 
    });

    wss.clients.forEach((client) => {
      // No tiene sentido enviarle el mensaje al cliente que se acaba de cerrar
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(disconnectMsg);
      }
    });
  });
});

// 4. Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP y WebSocket escuchando en el puerto ${PORT}`);
});
