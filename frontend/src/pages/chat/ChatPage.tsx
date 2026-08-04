import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { Send, MessageCircle } from "lucide-react";

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

  const email = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token") || "";

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
    } catch (error) {
      console.error(error);
    }
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
            if (prev.some((m) => m.id === msg.id)) {
              return prev;
            }
            return [...prev, msg];
          });
        });
      },

      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      },

      onWebSocketError: (error) => {
        console.error("WebSocket Error:", error);
      },
    });

    client.activate();
    stomp.current = client;
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    if (!stomp.current?.connected) {
      console.log("Socket not connected");
      return;
    }

    await sendMessage(stomp.current, chatRoomId, email, text);
    setText("");
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden px-6 py-6">
      <Card className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden border-none shadow-xl">
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <MessageCircle />
            </div>

            <div>
              <h1 className="text-2xl font-bold">ReturnX Chat</h1>
              <p className="text-sm text-orange-100">
                Coordinate item handover safely
              </p>
            </div>
          </div>
        </div>

        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-slate-400">
                No messages yet
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.senderEmail === email ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                    m.senderEmail === email
                      ? "rounded-br-none bg-orange-500 text-white"
                      : "rounded-bl-none border bg-white text-slate-700"
                  }`}
                >
                  <p className="mb-1 text-xs opacity-70">
                    {m.senderEmail === email ? "You" : "User"}
                  </p>

                  <p className="text-sm">{m.message}</p>
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Message Input */}
          <div className="flex shrink-0 gap-3 border-t bg-white p-4">
            <Input
              value={text}
              placeholder="Write a message..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="h-12 rounded-xl"
            />

            <Button
              onClick={handleSend}
              className="h-12 w-12 rounded-xl bg-orange-500 hover:bg-orange-600"
            >
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;