import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Package,Search,PlusCircle,MessageCircle,Trophy,UserRound,ShieldCheck} from "lucide-react";
import {Card,CardContent} from "@/components/ui/card";
import {getCurrentUser,getMyProfile} from "@/services/userService";

const Dashboard=()=>{
 const [authUser,setAuthUser]=useState<any>(null);
 const [profile,setProfile]=useState<any>(null);
 const [loading,setLoading]=useState(true);

 useEffect(()=>{
  (async()=>{
   try{
    setAuthUser(await getCurrentUser());
    setProfile(await getMyProfile());
   }catch(e){console.error(e)}
   finally{setLoading(false)}
  })();
 },[]);

 if(loading)return <div className="flex h-screen items-center justify-center text-xl text-slate-600">Loading Dashboard...</div>;

 const actions=[
  ["Report Lost",<Package/>,"/items/create-lost"],
  ["Report Found",<PlusCircle/>,"/items/create-found"],
  ["Search Items",<Search/>,"/found-items"],
  ["My Claims",<MessageCircle/>,"/claims"]
 ];

 const stats=[
  ["📦","Items Reported","12"],
  ["🤝","Returned","8"],
  ["💬","Active Claims","2"],
  ["🏆","Karma Points","520"]
 ];

 return <div className="min-h-screen bg-slate-50 px-6 py-10">
  <div className="mx-auto max-w-7xl">

   <div className="mb-10">
    <h1 className="text-4xl font-extrabold text-slate-900">
     Welcome, <span className="text-orange-500"> {profile?.firstName}</span> 👋
    </h1>
    <p className="mt-3 text-slate-600">Manage your lost items, claims and recovery activities from one place.</p>
   </div>

   <div className="mb-10 grid gap-6 md:grid-cols-4">
    {actions.map(([title,icon,link])=>
     <Link key={title as string} to={link as string}>
      <Card className="group cursor-pointer transition hover:-translate-y-1 hover:shadow-xl">
       <CardContent className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
         {icon}
        </div>
        <h3 className="mt-4 font-bold text-slate-800">{title}</h3>
       </CardContent>
      </Card>
     </Link>
    )}
   </div>


   <div className="mb-10 grid gap-6 md:grid-cols-4">
    {stats.map(stat=>
     <Card key={stat[1]}>
      <CardContent className="p-6 text-center">
       <div className="text-3xl">{stat[0]}</div>
       <h2 className="mt-3 text-3xl font-bold text-orange-500">{stat[2]}</h2>
       <p className="text-slate-500">{stat[1]}</p>
      </CardContent>
     </Card>
    )}
   </div>


   <div className="grid gap-8 lg:grid-cols-3">

    <Card className="lg:col-span-2">
     <CardContent className="p-8">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
       <UserRound className="text-orange-500"/> Profile Overview
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
       {[
        ["Name",`${profile.firstName} ${profile.lastName}`],
        ["Email",authUser.email],
        ["Department",profile.department||"-"],
        ["Designation",profile.designation||"-"]
       ].map(([a,b])=>
        <div key={a}>
         <p className="text-sm text-slate-500">{a}</p>
         <p className="font-semibold">{b}</p>
        </div>
       )}
      </div>
     </CardContent>
    </Card>


    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
     <CardContent className="p-8">
      <Trophy size={40}/>
      <h2 className="mt-5 text-3xl font-bold">520</h2>
      <p className="text-orange-100">Karma Points</p>
      <div className="mt-6 flex items-center gap-2">
       <ShieldCheck size={20}/> Trusted Helper
      </div>
     </CardContent>
    </Card>

   </div>

  </div>
 </div>
};

export default Dashboard;