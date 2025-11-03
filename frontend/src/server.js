const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '8080', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Handle WebSocket upgrade requests
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url);

    console.log(`WebSocket upgrade request for path: ${pathname}`);

    // Check if it's a WebSocket request to /ws/*
    if (pathname && pathname.startsWith('/ws/')) {
      // Determine backend URL
      const backendHost = process.env.INTERNAL_API_URL
        ? process.env.INTERNAL_API_URL.replace('http://', '').replace('https://', '')
        : '127.0.0.1:8000';

      const backendWsUrl = `ws://${backendHost}${pathname}`;

      console.log(`Proxying WebSocket connection to: ${backendWsUrl}`);

      // Create WebSocket connection to backend
      const backendWs = new WebSocket(backendWsUrl);

      // Create WebSocket connection to client
      const wss = new WebSocket.Server({ noServer: true });

      wss.handleUpgrade(request, socket, head, (clientWs) => {
        console.log(`WebSocket client connected for ${pathname}`);

        // Forward messages from backend to client
        backendWs.on('message', (data) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(data);
          }
        });

        // Forward messages from client to backend
        clientWs.on('message', (data) => {
          if (backendWs.readyState === WebSocket.OPEN) {
            backendWs.send(data);
          }
        });

        // Handle backend connection open
        backendWs.on('open', () => {
          console.log(`Backend WebSocket connected: ${backendWsUrl}`);
        });

        // Handle errors
        backendWs.on('error', (error) => {
          console.error('Backend WebSocket error:', error);
          clientWs.close();
        });

        clientWs.on('error', (error) => {
          console.error('Client WebSocket error:', error);
          backendWs.close();
        });

        // Handle close
        backendWs.on('close', () => {
          console.log(`Backend WebSocket closed for ${pathname}`);
          clientWs.close();
        });

        clientWs.on('close', () => {
          console.log(`Client WebSocket closed for ${pathname}`);
          backendWs.close();
        });
      });
    } else {
      socket.destroy();
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket proxy enabled for /ws/* endpoints`);
  });
});
