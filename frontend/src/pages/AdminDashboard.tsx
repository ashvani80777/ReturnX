import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  PackageSearch,
  CheckCircle,
  Trophy,
  Trash2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Tag,
} from "lucide-react";

import adminService, {
  type AdminDashboardResponse,
} from "@/services/adminService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<AdminDashboardResponse | null>(
    null
  );
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
    if (!confirm("Are you sure you want to delete this user?")) return;
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
    if (!confirm("Are you sure you want to delete this item?")) return;
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 font-medium text-slate-500">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <RefreshCw className="h-5 w-5 animate-spin text-orange-500" />
          <span>Loading Admin Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-lg font-semibold text-slate-800">
            Dashboard Unavailable
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Failed to load admin analytics. Please refresh.
          </p>
          <button
            onClick={loadDashboard}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <RefreshCw className="h-4 w-4" /> Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Lost Items",
      value: dashboard.totalLostItems,
      icon: PackageSearch,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      title: "Found Items",
      value: dashboard.totalFoundItems,
      icon: Tag,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Returned Items",
      value: dashboard.totalReturnedItems,
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Admin Control Center
              </h1>
              <p className="text-xs text-slate-500">
                Manage ReturnX platform users, reported items, and karma points.
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 hover:shadow-md"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`flex items-center justify-between rounded-2xl border ${card.border} bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg} ${card.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Users Management Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Users className="h-5 w-5 text-orange-500" /> Users Directory
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Phone</th>
                  <th className="px-6 py-3.5">Address</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {dashboard.users?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-xs text-slate-400"
                    >
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  dashboard.users?.map((user) => (
                    <tr
                      key={user.id}
                      className="transition duration-150 hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                            {user.firstName ? user.firstName[0] : "U"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {user.phoneNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {user.address || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Items Management Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <PackageSearch className="h-5 w-5 text-orange-500" /> Items
              Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Owner Email</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {dashboard.items?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-xs text-slate-400"
                    >
                      No reported items found.
                    </td>
                  </tr>
                ) : (
                  dashboard.items?.map((item) => (
                    <tr
                      key={item.id}
                      className="transition duration-150 hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            item.type === "LOST"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            item.status === "RETURNED"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {item.ownerEmail}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => markReturned(item.id)}
                            disabled={item.status === "RETURNED"}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 transition hover:bg-emerald-100 disabled:opacity-40 disabled:hover:bg-emerald-50"
                          >
                            <CheckCircle className="h-3.5 w-3.5" /> Returned
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Trophy className="h-5 w-5 text-amber-500" /> Karma Leaderboard
            </h2>
          </div>

          <div className="p-4">
            <div className="divide-y divide-slate-100">
              {dashboard.leaderboard?.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-400">
                  No karma points earned yet.
                </p>
              ) : (
                dashboard.leaderboard?.map((user, index) => (
                  <div
                    key={user.userEmail}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          index === 0
                            ? "bg-amber-100 text-amber-800"
                            : index === 1
                            ? "bg-slate-200 text-slate-700"
                            : index === 2
                            ? "bg-amber-700/10 text-amber-900"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        {user.userEmail}
                      </span>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold text-orange-600 border border-orange-100">
                      {user.totalPoints} pts
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;