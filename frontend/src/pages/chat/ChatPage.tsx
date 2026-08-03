import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  getChatHistory,
  sendMessage,
  type ChatMessage,
} from "@/services/chatService";

const ChatPage = () => {
  const { chatRoomId = "" } = useParams();
  const { state } = useLocation();

  const email = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token") || "";

  const ownerEmail = state?.ownerEmail || "";
  const claimerEmail = state?.claimerEmail || "";

  const receiverEmail =
    email === ownerEmail ? claimerEmail : ownerEmail;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");

  const stomp = useRef<Client | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHistory();
    connectSocket();

    return () => {
      stomp.current?.deactivate();
    };
  }, [chatRoomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const data = await getChatHistory(chatRoomId);
      setMessages(data);
    } catch {}
  };

  const connectSocket = () => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-chat",

      reconnectDelay: 5000,

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        client.subscribe(`/topic/chat/${chatRoomId}`, (frame) => {
          const msg: ChatMessage = JSON.parse(frame.body);

          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        });
      },
    });

    client.activate();
    stomp.current = client;
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!stomp.current?.connected) return;

    const tempMessage: ChatMessage = {
      id: Date.now(),
      chatRoomId,
      senderEmail: email,
      receiverEmail,
      message: text,
      status: "SENT",
      sentAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    await sendMessage(
      stomp.current,
      chatRoomId,
      email,
      receiverEmail,
      text
    );

    setText("");
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">Chat</h2>

          <div className="h-[500px] overflow-y-auto rounded-lg border p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-slate-500">
                No messages yet.
              </p>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.senderEmail === email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-sm rounded-xl px-4 py-2 ${
                    m.senderEmail === email
                      ? "bg-orange-500 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          <div className="flex gap-3">
            <Input
              value={text}
              placeholder="Type message..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <Button
              onClick={handleSend}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;