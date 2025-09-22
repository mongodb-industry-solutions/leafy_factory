// Update WebSocket connection for Kanopy compatibility
useEffect(() => {
  const connectWebSocket = async () => {
    try {
      // Get WebSocket URL from proxy API
      const wsConfig = await fetch(`/api/ws/stream_sensor/${machineId}`);
      const { wsUrl } = await wsConfig.json();
      
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log(`WebSocket connected for machine ${machineId}`);
        setConnectionStatus('connected');
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle sensor data...
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };
      
      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnectionStatus('disconnected');
      };
      
      setWebSocket(ws);
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setConnectionStatus('error');
    }
  };

  if (machineId) {
    connectWebSocket();
  }

  return () => {
    if (webSocket) {
      webSocket.close();
    }
  };
}, [machineId]);