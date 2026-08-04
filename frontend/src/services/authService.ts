import axios from "axios";
import api from "./api";

const adminApi=axios.create({
  baseURL:"http://localhost:8088/admin/auth",
  headers:{
    "Content-Type":"application/json",
  },
});

export interface RegisterRequest{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  phoneNumber:string;
  address:string;
}

export interface LoginRequest{
  email:string;
  password:string;
}

export interface AuthResponse{
  token:string;
  email?:string;
  role:string;
}

export const loginUser=async(data:LoginRequest):Promise<AuthResponse>=>{
  const response=await api.post<AuthResponse>("/auth/login",data);
  return response.data;
};

export const loginAdmin=async(data:LoginRequest):Promise<AuthResponse>=>{

  const response =
      await adminApi.post<AuthResponse>(
          "/login",
          data
      );


  const authData = response.data;


  localStorage.setItem(
      "token",
      authData.token
  );


  localStorage.setItem(
      "role",
      authData.role
  );


  return authData;
};

export const registerUser=async(data:RegisterRequest):Promise<string>=>{
  const response=await api.post<string>("/auth/register",data);
  return response.data;
};