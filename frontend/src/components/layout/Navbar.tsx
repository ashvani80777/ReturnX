import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/login"}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white">
            X
          </div>

          <span className="text-2xl font-bold text-slate-800">
            Return<span className="text-orange-500">X</span>
          </span>
        </Link>

        {/* Navigation */}
        {token && (
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/dashboard"
              className={`transition ${
                isActive("/dashboard")
                  ? "font-semibold text-orange-500"
                  : "text-slate-600 hover:text-orange-500"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className={`transition ${
                isActive("/profile")
                  ? "font-semibold text-orange-500"
                  : "text-slate-600 hover:text-orange-500"
              }`}
            >
              My Profile
            </Link>
          </nav>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">

          {!token ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Logout
            </Button>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;