import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {User,Mail,Phone,Briefcase,Building2,IdCard,MapPin,Award} from "lucide-react";
import {getCurrentUser,getMyProfile} from "@/services/userService";

const Info=({icon,label,value}:{icon:any;label:string;value:string})=>
<div className="flex items-start gap-3">
 <div className="mt-1 text-orange-500">{icon}</div>
 <div><p className="text-sm text-slate-500">{label}</p><p className="font-medium">{value}</p></div>
</div>;

const Profile=()=>{
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

 if(loading)return <><Navbar/><div className="flex h-[80vh] items-center justify-center text-xl">Loading...</div></>;

 const initials=`${profile.firstName?.[0]||""}${profile.lastName?.[0]||""}`;

 const stats=[
  [<Award className="text-orange-500"/>,"Karma Points"],
  [<Briefcase className="text-orange-500"/>,"Items Reported"],
  [<User className="text-orange-500"/>,"Successful Returns"]
 ];

 return <>

  <div className="mx-auto max-w-6xl px-6 py-10">

   <Card className="overflow-hidden border-none shadow-lg">
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
     <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-5">
       <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-orange-500 shadow">
        {initials}
       </div>

       <div>
        <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
        <p className="mt-1 text-orange-100">{authUser.email}</p>
        <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm">{authUser.role}</span>
       </div>
      </div>

      <Button asChild className="bg-white text-orange-600 hover:bg-orange-50">
       <Link to="/profile/edit">Edit Profile</Link>
      </Button>

     </div>
    </div>
   </Card>


   <div className="mt-8 grid gap-6 md:grid-cols-3">
    {stats.map(([icon,title])=>
     <Card key={title as string}>
      <CardContent className="p-6">
       {icon}
       <h3 className="mt-3 text-3xl font-bold">0</h3>
       <p className="text-slate-500">{title}</p>
      </CardContent>
     </Card>
    )}
   </div>


   <div className="mt-8 grid gap-6 md:grid-cols-2">

    <Card>
     <CardContent className="space-y-5 p-6">
      <h2 className="text-xl font-bold">Personal Information</h2>

      <Info icon={<User/>} label="Full Name" value={`${profile.firstName} ${profile.lastName}`}/>
      <Info icon={<Mail/>} label="Email" value={authUser.email}/>
      <Info icon={<Phone/>} label="Phone" value={profile.phoneNumber||"-"}/>
      <Info icon={<MapPin/>} label="Address" value={profile.address||"-"}/>
     </CardContent>
    </Card>


    <Card>
     <CardContent className="space-y-5 p-6">
      <h2 className="text-xl font-bold">Professional Information</h2>

      <Info icon={<Building2/>} label="Department" value={profile.department||"-"}/>
      <Info icon={<Briefcase/>} label="Designation" value={profile.designation||"-"}/>
      <Info icon={<IdCard/>} label="Employee ID" value={profile.employeeId||"-"}/>
      <Info icon={<User/>} label="Bio" value={profile.bio||"-"}/>
     </CardContent>
    </Card>

   </div>

  </div>
 </>
};

export default Profile;