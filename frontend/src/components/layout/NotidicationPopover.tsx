import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  Package,
  MessageCircle,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import {
  getNotifications,
  type NotificationResponse,
} from "@/services/notificationService";

export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      const list = Array.isArray(data) ? data : data?.content || [];
      setNotifications(list);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "ITEM_CLAIMED":
        return <Package className="h-4 w-4 text-orange-500" />;
      case "CHAT_MESSAGE":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "ITEM_RETURNED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-slate-700 hover:bg-orange-50 hover:text-orange-600"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 rounded-2xl p-0 shadow-2xl border-slate-200 sm:w-96"
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Bell className="h-4 w-4 text-orange-500" />
          <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
        </div>

        {/* Scrollable Notification List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-1">
          {loading ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No notifications available.
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-slate-50"
              >
                <div className="mt-0.5 shrink-0 rounded-full bg-slate-100 p-2">
                  {getIcon(notification.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-xs font-semibold text-slate-800">
                      {notification.title}
                    </p>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>

                  <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}