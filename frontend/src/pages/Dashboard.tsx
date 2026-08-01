import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getMyProfile } from "@/services/userService";

const Dashboard = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const auth = await getCurrentUser();
        const user = await getMyProfile();

        setAuthUser(auth);
        setProfile(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex h-[80vh] items-center justify-center text-xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome,
            <span className="text-orange-500">
              {" "}
              {profile.firstName}
            </span>
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome to your ReturnX Dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <Card className="shadow-sm">
            <CardContent className="space-y-4 p-6">

              <h2 className="text-xl font-semibold">
                Account Information
              </h2>

              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-medium">
                  {profile.firstName} {profile.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p>{authUser.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Role
                </p>

                <p>{authUser.role}</p>
              </div>

            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="space-y-4 p-6">

              <h2 className="text-xl font-semibold">
                Profile Information
              </h2>

              <div>
                <p className="text-sm text-slate-500">
                  Department
                </p>

                <p>{profile.department || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Designation
                </p>

                <p>{profile.designation || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p>{profile.phoneNumber || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <p>{profile.profileStatus}</p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
};

export default Dashboard;