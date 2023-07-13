import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type props = {
  baseurl: string,
  events: {[type: string]: (...args: any[]) => any}
}
const useSocket = ({
  baseurl,
  events
}: props) => {
  
  const [socket, setSocket] = useState<any>(io(baseurl, {autoConnect: false}));

  useEffect(() => {
    setSocket(io(baseurl, {autoConnect: false}))
  }, [baseurl])

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect()
    };
  }, [socket]);
  
  useEffect(() => {
    Object.entries(events).forEach(([type, event]) => socket.on(type, event));

    return () => {
      Object.entries(events).forEach(([type, event]) => socket.off(type, event));
    }
  }, [events])

  return socket;
}

export default useSocket