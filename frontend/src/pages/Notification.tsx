import { useEffect, useState } from "react";

import {
  Bell,
  CheckCircle,
  Package,
  MessageCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  getNotifications,
  type NotificationResponse,
} from "@/services/notificationService";

const Notifications = () => {

  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

    try {

      const data = await getNotifications();

      setNotifications(data.content);

    } catch (error) {

      console.error(error);

    }

  };

  const getIcon = (type: string) => {

    switch (type) {

      case "ITEM_CLAIMED":
        return <Package className="text-orange-500" />;

      case "CHAT_MESSAGE":
        return <MessageCircle className="text-blue-500" />;

      case "ITEM_RETURNED":
        return <CheckCircle className="text-green-500" />;

      default:
        return <Bell className="text-orange-500" />;

    }

  };

  return (

    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-orange-100 p-3">

          <Bell
            className="text-orange-500"
            size={28}
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-slate-500">
            Stay updated with ReturnX activity.
          </p>

        </div>

      </div>

      {

        notifications.length === 0 ?

          (

            <Card>

              <CardContent className="py-16 text-center text-slate-500">

                No notifications available.

              </CardContent>

            </Card>

          )

          :

          (

            <div className="space-y-4">

              {

                notifications.map((notification) => (

                  <Card
                    key={notification.id}
                    className={`transition hover:shadow-md ${
                      notification.status === "UNREAD"
                        ? "border-orange-300"
                        : ""
                    }`}
                  >

                    <CardContent className="flex items-center gap-5 p-5">

                      <div className="rounded-full bg-slate-100 p-3">

                        {getIcon(notification.type)}

                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold text-slate-800">

                          {notification.title}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {notification.message}

                        </p>

                      </div>

                      <span className="text-xs text-slate-400">

                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}

                      </span>

                    </CardContent>

                  </Card>

                ))

              }

            </div>

          )

      }

    </div>

  );

};

export default Notifications;