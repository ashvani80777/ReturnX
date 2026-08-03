import { Bell, CheckCircle, Package, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Notifications = () => {

  const notifications = [
    {
      id:1,
      icon:<Package className="text-orange-500"/>,
      title:"New claim received",
      text:"Someone claimed your found item.",
      time:"2 min ago"
    },
    {
      id:2,
      icon:<MessageCircle className="text-blue-500"/>,
      title:"New message",
      text:"You have a new chat message.",
      time:"10 min ago"
    },
    {
      id:3,
      icon:<CheckCircle className="text-green-500"/>,
      title:"Item returned",
      text:"Your item has been successfully returned.",
      time:"1 hour ago"
    }
  ];


  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-orange-100 p-3">
          <Bell className="text-orange-500" size={28}/>
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-slate-500">
            Stay updated with ReturnX activity.
          </p>
        </div>
      </div>



      <div className="space-y-4">

        {notifications.map((n)=>(

          <Card key={n.id} className="transition hover:shadow-md">

            <CardContent className="flex items-center gap-5 p-5">

              <div className="rounded-full bg-slate-100 p-3">
                {n.icon}
              </div>


              <div className="flex-1">

                <h3 className="font-semibold text-slate-800">
                  {n.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {n.text}
                </p>

              </div>


              <span className="text-xs text-slate-400">
                {n.time}
              </span>


            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
};


export default Notifications;