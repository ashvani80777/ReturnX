import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import NotificationPopover from "./NotidicationPopover";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const active = (p: string) => location.pathname === p;

  const navClass = (p: string) =>
    active(p)
      ? "font-semibold text-orange-500"
      : "text-slate-600 transition hover:text-orange-500";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menu = (items: [string, string][]) =>
    items.map(([to, text]) => (
      <Link
        key={to}
        to={to}
        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-orange-50 hover:text-orange-500"
      >
        {text}
      </Link>
    ));

  const Drop = ({
    title,
    items,
  }: {
    title: string;
    items: [string, string][];
  }) => (
    <div className="group relative">
      <button className="flex items-center gap-1 text-slate-600 transition hover:text-orange-500">
        {title}
        <ChevronDown size={16} />
      </button>

      <div className="invisible absolute left-0 top-8 w-56 rounded-xl border bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {menu(items)}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white">
            X
          </div>
          <span className="text-2xl font-bold text-slate-800">
            Return<span className="text-orange-500">X</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {token ? (
            <>
              <Link to="/" className={navClass("/")}>
                Home
              </Link>

              <Drop
                title="Items"
                items={[
                  ["/lost-items", "Lost Items"],
                  ["/found-items", "Found Items"],
                  ["/items/create-lost", "Report Lost"],
                  ["/items/create-found", "Report Found"],
                ]}
              />

              <Drop
                title="My Activity"
                items={[
                  ["/my-items", "My Items"],
                  ["/claims", "My Claims"],
                  ["/owner-chats", "Incoming Chats"],
                ]}
              />

              <Link to="/leaderboard" className={navClass("/leaderboard")}>
                Leaderboard
              </Link>

              <Link to="/profile" className={navClass("/profile")}>
                Profile
              </Link>

              <Link to="/dashboard" className={navClass("/dashboard")}>
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={navClass("/")}>
                Home
              </Link>

              <Link to="/lost-items" className={navClass("/lost-items")}>
                Lost Items
              </Link>

              <Link to="/found-items" className={navClass("/found-items")}>
                Found Items
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <NotificationPopover />

              <Button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;