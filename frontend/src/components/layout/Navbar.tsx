import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import NotificationPopover from "./NotidicationPopover";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const token = localStorage.getItem("token");

  const active = (p: string) => location.pathname === p;

  const navClass = (p: string) =>
    active(p)
      ? "font-semibold text-orange-500"
      : "text-slate-600 transition hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400";

  const logout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const menu = (items: [string, string][]) =>
    items.map(([to, text]) => (
      <Link
        key={to}
        to={to}
        onClick={closeMobileMenu}
        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-400"
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
      <button className="flex items-center gap-1 text-slate-600 transition hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400">
        {title}
        <ChevronDown size={16} />
      </button>

      <div className="invisible absolute left-0 top-8 w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900">
        {menu(items)}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white">
            X
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Return<span className="text-orange-500">X</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
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

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-amber-400" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {token ? (
            <>
              <NotificationPopover />

              <Button
                onClick={logout}
                className="hidden bg-orange-500 hover:bg-orange-600 sm:inline-flex"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* MOBILE MENU HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY / DRAWER */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <div className="flex flex-col space-y-4">
            {token ? (
              <>
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={navClass("/")}
                >
                  Home
                </Link>

                {/* Items Category Mobile */}
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Items
                  </span>
                  <div className="space-y-1 pl-2">
                    {menu([
                      ["/lost-items", "Lost Items"],
                      ["/found-items", "Found Items"],
                      ["/items/create-lost", "Report Lost"],
                      ["/items/create-found", "Report Found"],
                    ])}
                  </div>
                </div>

                {/* My Activity Mobile */}
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    My Activity
                  </span>
                  <div className="space-y-1 pl-2">
                    {menu([
                      ["/my-items", "My Items"],
                      ["/claims", "My Claims"],
                      ["/owner-chats", "Incoming Chats"],
                    ])}
                  </div>
                </div>

                <Link
                  to="/leaderboard"
                  onClick={closeMobileMenu}
                  className={navClass("/leaderboard")}
                >
                  Leaderboard
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={navClass("/profile")}
                >
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={navClass("/dashboard")}
                >
                  Dashboard
                </Link>

                <div className="border-t border-slate-200 pt-2 dark:border-slate-800">
                  <Button
                    onClick={logout}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={navClass("/")}
                >
                  Home
                </Link>

                <Link
                  to="/lost-items"
                  onClick={closeMobileMenu}
                  className={navClass("/lost-items")}
                >
                  Lost Items
                </Link>

                <Link
                  to="/found-items"
                  onClick={closeMobileMenu}
                  className={navClass("/found-items")}
                >
                  Found Items
                </Link>

                <div className="flex flex-col gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
                  <Button
                    variant="outline"
                    asChild
                    onClick={closeMobileMenu}
                    className="w-full"
                  >
                    <Link to="/login">Login</Link>
                  </Button>

                  <Button
                    asChild
                    onClick={closeMobileMenu}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;