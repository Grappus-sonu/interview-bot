import { useEffect } from 'react';
import io from 'socket.io-client';

type props = {
  baseurl: string,
  events: {[type: string]: (...args: any[]) => any}
}

const useSocket = ({
  baseurl,
  events
}: props) => {
  const socket = io(baseurl);
  useEffect(() => {
    Object.entries(events).forEach(([type, event]) => {
      socket.on(type, event);
    });

    return () => {
      Object.entries(events).forEach(([type, event]) => {
        socket.off(type, event);
      });
      socket.close();
    }
  }, [])

  return socket;
}

export default useSocket