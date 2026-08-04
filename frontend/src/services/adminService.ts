import api from "./api";

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  profileImage?: string;
  department?: string;
  designation?: string;
}

export interface ItemResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  status: string;
  location: string;
  imageUrl: string;
  ownerEmail: string;
  createdAt: string;
}

export interface LeaderboardUser {
  userEmail: string;
  totalPoints: number;
}

export interface AdminDashboardResponse {
  totalUsers: number;
  totalLostItems: number;
  totalFoundItems: number;
  totalReturnedItems: number;
  users: UserResponse[];
  items: ItemResponse[];
  leaderboard: LeaderboardUser[];
}

const adminService = {
  getDashboard: async (): Promise<AdminDashboardResponse> => {
    const response = await api.get<AdminDashboardResponse>("/admin/dashboard");
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  deleteItem: async (itemId: number) => {
    const response = await api.delete(`/items/admin/${itemId}`);
    return response.data;
  },

  markItemReturned: async (itemId: number) => {
    const response = await api.put(`/items/admin/${itemId}/returned`);
    return response.data;
  }
};

export default adminService;