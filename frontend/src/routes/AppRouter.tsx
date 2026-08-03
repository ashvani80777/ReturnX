import {Routes,Route} from "react-router-dom";

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
import Notifications from "@/pages/Notification";

import ProtectedRoute from "./ProtectedRoute";


const Private=({children}:{children:React.ReactNode})=>
 <ProtectedRoute>
  {children}
 </ProtectedRoute>;



const AppRouter=()=>(
<Routes>


 <Route path="/" element={<Home/>}/>

 <Route path="/login" element={<Login/>}/>

 <Route path="/register" element={<Register/>}/>
 <Route path="/lost-items" element={<LostItems/>}/>

 <Route path="/found-items" element={<FoundItems/>}/>

 <Route path="/items/:id" element={<ItemDetails/>}/>



 {[
  ["/dashboard",<Dashboard/>],
  ["/profile",<Profile/>],
  ["/profile/edit",<EditProfile/>],
  ["/items/create-lost",<CreateLostItem/>],
  ["/items/create-found",<CreateFoundItem/>],
  ["/my-items",<MyItems/>],
  ["/items/edit/:id",<EditItem/>],
  ["/claims",<MyClaims/>],
  ["/leaderboard",<Leaderboard/>],
  ["/notifications",<Notifications/>],

  ["/chat/:chatRoomId",<ChatPage/>]

 ].map(([path,element])=>

  <Route
   key={path as string}
   path={path as string}
   element={
    <Private>
     {element}
    </Private>
   }
  />

 )}



</Routes>
);


export default AppRouter;