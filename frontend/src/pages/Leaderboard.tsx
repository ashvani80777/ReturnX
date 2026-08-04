import { useEffect, useState } from "react";
import { Trophy, Medal, Star, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getLeaderboard,
  type LeaderboardUser,
} from "@/services/rewardService";

const Leaderboard = () => {
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboardUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-lg font-medium text-slate-500">
        Loading Leaderboard...
      </div>
    );
  }

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

      {/* Dynamic Leaderboard Cards */}
      {leaderboardUsers.length === 0 ? (
        <Card className="border-none py-12 text-center shadow-md">
          <CardContent>
            <p className="text-lg font-semibold text-slate-600">
              No leaderboard activity yet.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Be the first to report and return items to earn karma points!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {leaderboardUsers.map((user, index) => {
            const rank = index + 1;
            const displayName = user.userEmail
              ? user.userEmail.split("@")[0]
              : `User #${rank}`;

            return (
              <Card
                key={user.userEmail || index}
                className={`border-none shadow-lg transition hover:shadow-xl ${
                  rank === 1 ? "ring-2 ring-orange-400" : ""
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    {rank === 1 ? <Trophy /> : <Medal />}
                  </div>

                  <h2
                    className="truncate text-xl font-bold text-slate-800 capitalize"
                    title={user.userEmail}
                  >
                    #{rank} {displayName}
                  </h2>
                  <p className="mb-3 truncate text-xs text-slate-400">
                    {user.userEmail}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                      <span className="flex items-center gap-2 font-medium text-slate-600">
                        <Star size={16} className="fill-orange-500 text-orange-500" />
                        Karma Points
                      </span>
                      <span className="font-extrabold text-orange-600">
                        {user.totalPoints}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                      <span className="flex items-center gap-2 font-medium text-slate-600">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Badge
                      </span>
                      <span className="font-bold text-slate-700">
                        {rank === 1
                          ? "Top Contributor"
                          : rank === 2
                          ? "Helpful Member"
                          : "Active Finder"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

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