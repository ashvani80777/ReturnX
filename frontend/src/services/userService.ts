import api from "./api";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface UserProfile {
  id: number;
  authUserId: number;

  firstName: string;
  lastName: string;

  employeeId: string;
  department: string;
  designation: string;

  phoneNumber: string;
  profileImage: string;

  address: string;
  bio: string;
  preferences: string;

  profileStatus: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;

  employeeId: string;
  department: string;
  designation: string;

  phoneNumber: string;

  address: string;
  bio: string;
  preferences: string;
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/auth/me");
  return response.data;
};

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>("/users/me");
  return response.data;
};

export const updateProfile = async (
  id: number,
  data: UpdateProfileRequest
): Promise<UserProfile> => {
  const response = await api.put<UserProfile>(`/users/${id}`, data);
  return response.data;
};