import axios from "axios";

const ADMIN_API = "http://localhost:8088/admin";


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


const adminClient = axios.create({
  baseURL: ADMIN_API,
  headers: {
    "Content-Type": "application/json",
  },
});


adminClient.interceptors.request.use(config => {

  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


const adminService = {

  getDashboard: async (): Promise<AdminDashboardResponse> => {

    const response =
      await adminClient.get<AdminDashboardResponse>("/dashboard");

    return response.data;

  },


  deleteUser: async (userId:number) => {

    const response =
      await adminClient.delete(`/users/${userId}`);

    return response.data;

  },


  deleteItem: async (itemId:number) => {

    const response =
      await adminClient.delete(`/items/${itemId}`);

    return response.data;

  },


  markItemReturned: async (itemId:number) => {

    const response =
      await adminClient.put(`/items/${itemId}/returned`);

    return response.data;

  }

};


export default adminService;