import { Trophy, Medal, Star, PackageCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeaderboardUser {
  rank: number;
  name: string;
  karma: number;
  returned: number;
}

const Leaderboard = () => {
  const users: LeaderboardUser[] = [
    { rank: 1, name: "Top Contributor", karma: 950, returned: 24 },
    { rank: 2, name: "Helpful Member", karma: 820, returned: 19 },
    { rank: 3, name: "Active Finder", karma: 700, returned: 15 },
  ];

  const info = [
    {
      title: "Found Item Report",
      text: "Help someone by reporting a found item.",
    },
    {
      title: "Successful Return",
      text: "Earn points when items reach owners.",
    },
    {
      title: "Community Trust",
      text: "Build reputation inside ReturnX.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Banner */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Trophy size={35} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">ReturnX Leaderboard</h1>
            <p className="mt-2 text-orange-100">
              Top contributors helping reunite lost items.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.rank}
            className={`border-none shadow-lg ${
              user.rank === 1 ? "ring-2 ring-orange-400" : ""
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                {user.rank === 1 ? <Trophy /> : <Medal />}
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                #{user.rank} {user.name}
              </h2>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Star size={16} className="text-orange-500" />
                    Karma
                  </span>
                  <span className="font-bold text-slate-800">{user.karma}</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <PackageCheck size={16} className="text-green-500" />
                    Returned
                  </span>
                  <span className="font-bold text-slate-800">{user.returned}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How Karma Works Section */}
      <Card className="mt-10 border-none shadow-md">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-slate-800">How Karma Works</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {info.map((item) => (
              <div key={item.title} className="rounded-xl bg-orange-50 p-5">
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;