import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";

import LostItems from "@/pages/items/LostItems";
import FoundItems from "@/pages/items/FoundItems";
import CreateLostItem from "@/pages/items/CreateLostItem";
import CreateFoundItem from "@/pages/items/CreateFoundItem";
import MyItems from "@/pages/items/MyItems";
import ItemDetails from "@/pages/items/ItemDetails";
import EditItem from "@/pages/items/EditItem";

import MyClaims from "@/pages/claims/MyClaims";

import ChatPage from "@/pages/chat/ChatPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Lost Items */}
        <Route
          path="/lost-items"
          element={
            <ProtectedRoute>
              <LostItems />
            </ProtectedRoute>
          }
        />

        {/* Found Items */}
        <Route
          path="/found-items"
          element={
            <ProtectedRoute>
              <FoundItems />
            </ProtectedRoute>
          }
        />

        {/* Create Lost Item */}
        <Route
          path="/items/create-lost"
          element={
            <ProtectedRoute>
              <CreateLostItem />
            </ProtectedRoute>
          }
        />

        {/* Create Found Item */}
        <Route
          path="/items/create-found"
          element={
            <ProtectedRoute>
              <CreateFoundItem />
            </ProtectedRoute>
          }
        />

        {/* My Items */}
        <Route
          path="/my-items"
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          }
        />

        {/* Item Details */}
        <Route
          path="/items/:id"
          element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          }
        />

        {/* Edit Item */}
        <Route
          path="/items/edit/:id"
          element={
            <ProtectedRoute>
              <EditItem />
            </ProtectedRoute>
          }
        />

        {/* Claims */}
        <Route
          path="/claims"
          element={
            <ProtectedRoute>
              <MyClaims />
            </ProtectedRoute>
          }
        />

        {/* Chat */}
        <Route
          path="/chat/:chatRoomId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;