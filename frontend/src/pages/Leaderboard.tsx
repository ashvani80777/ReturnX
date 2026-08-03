import {Trophy,Medal,Star,PackageCheck} from "lucide-react";
import {Card,CardContent} from "@/components/ui/card";

const Leaderboard=()=>{

 const users=[
  {rank:1,name:"Top Contributor",karma:950,returned:24},
  {rank:2,name:"Helpful Member",karma:820,returned:19},
  {rank:3,name:"Active Finder",karma:700,returned:15}
 ];

 const info=[
  ["Found Item Report","Help someone by reporting a found item."],
  ["Successful Return","Earn points when items reach owners."],
  ["Community Trust","Build reputation inside ReturnX."]
 ];

 return <div className="mx-auto max-w-6xl px-6 py-10">

  <div className="mb-10 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-white shadow-xl">
   <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
     <Trophy size={35}/>
    </div>
    <div>
     <h1 className="text-4xl font-extrabold">ReturnX Leaderboard</h1>
     <p className="mt-2 text-orange-100">Top contributors helping reunite lost items.</p>
    </div>
   </div>
  </div>


  <div className="grid gap-6 md:grid-cols-3">
   {users.map(user=>
    <Card key={user.rank} className={`border-none shadow-lg ${user.rank===1?"ring-2 ring-orange-400":""}`}>
     <CardContent className="p-6 text-center">

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
       {user.rank===1?<Trophy/>:<Medal/>}
      </div>

      <h2 className="text-xl font-bold">
       #{user.rank} {user.name}
      </h2>

      {[
       [<Star size={16} className="text-orange-500"/>,"Karma",user.karma],
       [<PackageCheck size={16} className="text-green-500"/>,"Returned",user.returned]
      ].map(([icon,label,value])=>
       <div key={label as string} className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
        <span className="flex items-center gap-2">{icon}{label}</span>
        <b>{value}</b>
       </div>
      )}

     </CardContent>
    </Card>
   )}
  </div>


  <Card className="mt-10">
   <CardContent className="p-8">

    <h2 className="text-2xl font-bold text-slate-800">
     How Karma Works
    </h2>

    <div className="mt-5 grid gap-4 md:grid-cols-3">
     {info.map(([title,text])=>
      <div key={title} className="rounded-xl bg-orange-50 p-5">
       <p className="font-semibold">{title}</p>
       <p className="mt-2 text-sm text-slate-600">{text}</p>
      </div>
     )}
    </div>

   </CardContent>
  </Card>

 </div>
};

export default Leaderboard;