import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import adminService,{type AdminDashboardResponse} from "@/services/adminService";

const AdminDashboard=()=>{
    const navigate=useNavigate();
    const [dashboard,setDashboard]=useState<AdminDashboardResponse|null>(null);
    const [loading,setLoading]=useState(true);

    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };

    const loadDashboard=async()=>{
        try{
            setLoading(true);
            const data=await adminService.getDashboard();
            setDashboard(data);
        }catch(error){
            console.error("Dashboard error",error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadDashboard();
    },[]);

    const deleteUser=async(id:number)=>{
        if(!confirm("Delete this user?"))return;
        try{
            await adminService.deleteUser(id);
            alert("User deleted");
            loadDashboard();
        }catch(error){
            console.error(error);
            alert("User delete failed");
        }
    };

    const deleteItem=async(id:number)=>{
        if(!confirm("Delete this item?"))return;
        try{
            await adminService.deleteItem(id);
            alert("Item deleted");
            loadDashboard();
        }catch(error){
            console.error(error);
            alert("Item delete failed");
        }
    };

    const markReturned=async(id:number)=>{
        try{
            await adminService.markItemReturned(id);
            alert("Item marked returned");
            loadDashboard();
        }catch(error){
            console.error(error);
            alert("Failed");
        }
    };

    if(loading)return <div className="h-screen flex justify-center items-center">Loading Dashboard...</div>;
    if(!dashboard)return <div className="text-center mt-10">Dashboard not available</div>;

    return(
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center bg-white rounded-xl shadow p-4 mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-600 text-white px-5 py-2 rounded-lg">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                {[
                    ["Total Users",dashboard.totalUsers,"blue"],
                    ["Lost Items",dashboard.totalLostItems,"red"],
                    ["Found Items",dashboard.totalFoundItems,"green"],
                    ["Returned",dashboard.totalReturnedItems,"purple"]
                ].map(([title,value,color])=>(
                    <div className={`bg-${color}-600 text-white p-5 rounded-xl`} key={title}>
                        <h2>{title}</h2>
                        <p className="text-3xl font-bold">{value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-10">
                <h2 className="text-2xl font-bold mb-5">Users Management</h2>
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboard.users?.map(user=>(
                            <tr key={user.id} className="border-b">
                                <td className="p-3">{user.firstName} {user.lastName}</td>
                                <td className="p-3">{user.phoneNumber}</td>
                                <td className="p-3">{user.address}</td>
                                <td className="p-3 text-center">
                                    <button onClick={()=>deleteUser(user.id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-10">
                <h2 className="text-2xl font-bold mb-5">Items Management</h2>
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Owner</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboard.items?.map(item=>(
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{item.title}</td>
                                <td className="p-3">{item.type}</td>
                                <td className="p-3">{item.status}</td>
                                <td className="p-3">{item.ownerEmail}</td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={()=>markReturned(item.id)} className="bg-green-600 text-white px-3 py-2 rounded">Returned</button>
                                    <button onClick={()=>deleteItem(item.id)} className="bg-red-600 text-white px-3 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-2xl font-bold mb-5">Leaderboard</h2>
                {dashboard.leaderboard?.map((user,index)=>(
                    <div key={user.userEmail} className="flex justify-between border-b p-3">
                        <span>#{index+1} {user.userEmail}</span>
                        <span className="font-bold">{user.totalPoints} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;