import { Client } from "@stomp/stompjs";
import api from "./api";

export interface ChatMessage {
  id: number;
  chatRoomId: string;
  senderEmail: string;
  receiverEmail: string;
  message: string;
  status: string;
  sentAt: string;
}

export const getChatHistory = async (
  chatRoomId: string
): Promise<ChatMessage[]> => {
  const { data } = await api.get(`/chat/${chatRoomId}`);
  return data;
};

export const sendMessage = async (
  client: Client,
  chatRoomId: string,
  senderEmail: string,
  receiverEmail: string,
  message: string
) => {
  if (!client.connected) return;

  client.publish({
    destination: "/app/chat.send",
    body: JSON.stringify({
      chatRoomId,
      senderEmail,
      receiverEmail,
      message,
    }),
  });
};