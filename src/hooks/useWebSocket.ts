import { useState, useEffect } from 'react';

interface RateData {
  symbol: string;
  timestamp: number;
  bid: number;
  ask: number;
  spot: number;
  change: number;
}

interface WebSocketMessage {
  channel: string;
  event: string;
  data: {
    [key: string]: RateData;
  };
}

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<{ [key: string]: RateData }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    
    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        setError(null);
        
        // Send a subscription message if required by your server
        ws.send(JSON.stringify({
          event: 'subscribe',
          channel: 'rates'
        }));
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log('Raw WebSocket message:', event.data);
          console.log('Parsed WebSocket message:', message);
          
          if (message.channel === 'rates' && message.event === 'data') {
            setData(prevData => {
              const newData = {
                ...prevData,
                ...message.data
              };
              console.log('Updated WebSocket data:', newData);
              return newData;
            });
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
          console.error('Raw message:', event.data);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket error occurred');
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setIsConnected(false);
        setError('WebSocket connection closed');
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, 3000);
      };
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  return { data, isConnected, error };
}; 