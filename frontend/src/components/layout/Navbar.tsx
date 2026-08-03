import { Link,useLocation,useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar=()=>{
  const navigate=useNavigate();
  const location=useLocation();
  const token=localStorage.getItem("token");

  const isActive=(path:string)=>location.pathname===path;

  const navClass=(path:string)=>
    isActive(path)
    ?"font-semibold text-orange-500"
    :"text-slate-600 transition hover:text-orange-500";

  const logout=()=>{
    localStorage.clear();
    navigate("/");
  };

  return(
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



{token&&(
<nav className="hidden items-center gap-6 lg:flex">

<Link to="/dashboard" className={navClass("/dashboard")}>
Dashboard
</Link>

<Link to="/lost-items" className={navClass("/lost-items")}>
Lost Items
</Link>

<Link to="/found-items" className={navClass("/found-items")}>
Found Items
</Link>

<Link to="/items/create-lost" className={navClass("/items/create-lost")}>
Report Lost
</Link>

<Link to="/items/create-found" className={navClass("/items/create-found")}>
Report Found
</Link>

<Link to="/my-items" className={navClass("/my-items")}>
My Items
</Link>

<Link to="/claims" className={navClass("/claims")}>
My Claims
</Link>

<Link to="/profile" className={navClass("/profile")}>
Profile
</Link>

</nav>
)}



<div className="flex items-center gap-3">

{!token?(
<>
<Button variant="ghost" asChild>
<Link to="/login">
Login
</Link>
</Button>

<Button asChild className="bg-orange-500 hover:bg-orange-600">
<Link to="/register">
Register
</Link>
</Button>
</>
):(
<Button
onClick={logout}
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