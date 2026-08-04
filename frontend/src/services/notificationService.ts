import api from "./api";

export interface NotificationResponse {
  id: number;
  title: string;
  message: string;
  type: string;
  status: string;
  referenceId: string;
  referenceType: string;
  createdAt: string;
  readAt: string | null;
}

export interface NotificationPage {
  content: NotificationResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const getNotifications = async () => {
  const { data } = await api.get<NotificationPage>(
    "/notifications"
  );
  return data;
};

export const getUnreadCount = async () => {
  const { data } = await api.get<number>(
    "/notifications/unread-count"
  );
  return data;
};

export const markAsRead = async (id: number) => {
  const { data } = await api.patch(
    `/notifications/${id}/read`
  );
  return data;
};

export const markAllAsRead = async () => {
  await api.patch("/notifications/read-all");
};