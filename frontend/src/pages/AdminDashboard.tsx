import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService, { type AdminDashboardResponse } from "@/services/adminService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try {
      await adminService.deleteUser(id);
      alert("User deleted successfully");
      loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      await adminService.deleteItem(id);
      alert("Item deleted successfully");
      loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to delete item");
    }
  };

  const markReturned = async (id: number) => {
    try {
      await adminService.markItemReturned(id);
      alert("Item marked as returned");
      loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to update item status");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-medium text-slate-500">
        Loading Admin Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="mt-10 text-center text-slate-500">
        Dashboard data is not available.
      </div>
    );
  }

  const statCards = [
    { title: "Total Users", value: dashboard.totalUsers, bg: "bg-blue-600" },
    { title: "Lost Items", value: dashboard.totalLostItems, bg: "bg-red-600" },
    { title: "Found Items", value: dashboard.totalFoundItems, bg: "bg-green-600" },
    { title: "Returned Items", value: dashboard.totalReturnedItems, bg: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Top Bar */}
      <div className="mb-8 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} rounded-xl p-5 text-white shadow-md`}
          >
            <h2 className="text-sm font-medium text-white/80">{card.title}</h2>
            <p className="mt-1 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Users Management */}
      <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">Users Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-sm font-semibold text-slate-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {dashboard.users?.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3">{user.phoneNumber || "N/A"}</td>
                  <td className="p-3">{user.address || "N/A"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="rounded bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Items Management */}
      <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">Items Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-sm font-semibold text-slate-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {dashboard.items?.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        item.type === "LOST"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">{item.ownerEmail}</td>
                  <td className="flex gap-2 p-3">
                    <button
                      onClick={() => markReturned(item.id)}
                      disabled={item.status === "RETURNED"}
                      className="rounded bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      Mark Returned
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">Leaderboard</h2>
        <div className="divide-y">
          {dashboard.leaderboard?.map((user, index) => (
            <div
              key={user.userEmail}
              className="flex items-center justify-between p-3 hover:bg-slate-50"
            >
              <span className="font-medium text-slate-700">
                #{index + 1} {user.userEmail}
              </span>
              <span className="font-bold text-orange-600">
                {user.totalPoints} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;