import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "./components/ui/toast";
import { ThemeProvider } from "./context/ThemeContext";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {!hideNavbar && <Navbar />}
      <AppRouter />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}

function App() {
  return (
    // 💡 SABSE BOHOT IMPORTANT: ThemeProvider outer-most level par hona chahiye!
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;