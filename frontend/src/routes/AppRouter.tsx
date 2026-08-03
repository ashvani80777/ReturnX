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

import ProtectedRoute from "./ProtectedRoute";


const AppRouter = () => {

  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lost-items" element={<LostItems />} />
      <Route path="/found-items" element={<FoundItems />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


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


      <Route
        path="/items/create-lost"
        element={
          <ProtectedRoute>
            <CreateLostItem />
          </ProtectedRoute>
        }
      />


      <Route
        path="/items/create-found"
        element={
          <ProtectedRoute>
            <CreateFoundItem />
          </ProtectedRoute>
        }
      />


      <Route
        path="/my-items"
        element={
          <ProtectedRoute>
            <MyItems />
          </ProtectedRoute>
        }
      />


      <Route
        path="/items/edit/:id"
        element={
          <ProtectedRoute>
            <EditItem />
          </ProtectedRoute>
        }
      />


      <Route
        path="/claims"
        element={
          <ProtectedRoute>
            <MyClaims />
          </ProtectedRoute>
        }
      />


      <Route
        path="/chat/:chatRoomId"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />


    </Routes>
  );

};


export default AppRouter;