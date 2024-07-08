import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SignData {
  pollId: string;
  title: string;
  selectedOption: string;
}

// type Action = "connect" | "disconnect" | "sign" | "signed" | "cancel-signature-request"

type WebSocketMessage =
  | {
      action: "connect";
      peerId: string;
      publicKey: string;
    }
  | { action: "disconnect" }
  | { action: "sign"; data: SignData; hash: string; signatureId: string }
  | { action: "signed"; signatureId: string; signature: string }
  | { action: "cancel-signature-request"; signatureId: string };

interface WebSocketContextType {
  socket: WebSocket | null;
  messages: WebSocketMessage[];
  sendMessage: (msg: WebSocketMessage) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://bot.zk-voting.com");

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const newMessage: WebSocketMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (msg: WebSocketMessage) => {
    if (socket) {
      socket.send(JSON.stringify(msg));
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useWebSocket() {
  return useContext(WebSocketContext);
}
