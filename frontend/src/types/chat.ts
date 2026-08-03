export type MessageStatus = "SENT" | "DELIVERED" | "READ";

export interface Message {
  id: number;
  chatRoomId: string;
  senderEmail: string;
  receiverEmail: string;
  message: string;
  status: MessageStatus;
  sentAt: string;
}

export interface MessageRequest {
  chatRoomId: string;
  message: string;
  receiverEmail: string;
}