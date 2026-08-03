import { Client } from "@stomp/stompjs";
import type { Message, MessageRequest } from "@/types/chat";

const WS_URL = "ws://localhost:8085/ws-chat";

let client: Client | null = null;

export const connectSocket = (
  chatRoomId: string,
  onMessage: (message: Message) => void
) => {
  const token = localStorage.getItem("token");

  client = new Client({
    brokerURL: WS_URL,
    reconnectDelay: 5000,

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    onConnect: () => {
      client?.subscribe(`/topic/chat/${chatRoomId}`, (frame) => {
        onMessage(JSON.parse(frame.body));
      });
    },

    onStompError: (frame) => {
      console.error("STOMP Error:", frame.headers.message);
    },

    onWebSocketError: (error) => {
      console.error("WebSocket Error:", error);
    },
  });

  client.activate();
};

export const disconnectSocket = () => {
  client?.deactivate();
};

export const sendMessage = (payload: MessageRequest) => {
  if (!client?.connected) return;

  client.publish({
    destination: "/app/chat.send",
    body: JSON.stringify(payload),
  });
};