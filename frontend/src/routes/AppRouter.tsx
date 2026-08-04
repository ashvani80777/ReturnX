import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

import LostItems from "@/pages/items/LostItems";
import FoundItems from "@/pages/items/FoundItems";
import ItemDetails from "@/pages/items/ItemDetails";

import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";

import CreateLostItem from "@/pages/items/CreateLostItem";
import CreateFoundItem from "@/pages/items/CreateFoundItem";

import MyItems from "@/pages/items/MyItems";
import EditItem from "@/pages/items/EditItem";

import MyClaims from "@/pages/claims/MyClaims";
import ChatPage from "@/pages/chat/ChatPage";

import Leaderboard from "@/pages/Leaderboard";

import ProtectedRoute from "./ProtectedRoute";
import OwnerChats from "@/pages/chat/OwnerChat";
import AdminDashboard from "@/pages/AdminDashboard";

const Private = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/lost-items" element={<LostItems />} />
    <Route path="/found-items" element={<FoundItems />} />
    <Route path="/items/:id" element={<ItemDetails />} />

    {/* Protected Routes */}
    {[
      ["/dashboard", <Dashboard />],
      ["/profile", <Profile />],
      ["/profile/edit", <EditProfile />],
      ["/items/create-lost", <CreateLostItem />],
      ["/items/create-found", <CreateFoundItem />],
      ["/my-items", <MyItems />],
      ["/items/edit/:id", <EditItem />],
      ["/claims", <MyClaims />],
      ["/leaderboard", <Leaderboard />],
      ["/chat/:chatRoomId", <ChatPage />],
      ["/owner-chats", <OwnerChats />],
      ["/admin/dashboard", <AdminDashboard />],
    ].map(([path, element]) => (
      <Route
        key={path as string}
        path={path as string}
        element={<Private>{element as React.ReactNode}</Private>}
      />
    ))}
  </Routes>
);

export default AppRouter;