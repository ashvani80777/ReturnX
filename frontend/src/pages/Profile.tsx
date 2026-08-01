import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getCurrentUser, getMyProfile } from "@/services/userService";

const Profile = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
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

    loadProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-10">

        <Card className="shadow-sm">

          <CardContent className="space-y-6 p-8">

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-3xl font-bold">
                  My Profile
                </h1>

                <p className="text-slate-500">
                  View your personal information.
                </p>

              </div>

              <Button asChild>
                <Link to="/profile/edit">
                  Edit Profile
                </Link>
              </Button>

            </div>

            <hr />

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <p className="text-sm text-slate-500">First Name</p>
                <p>{profile.firstName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Last Name</p>
                <p>{profile.lastName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p>{authUser.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p>{authUser.role}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Department</p>
                <p>{profile.department || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Designation</p>
                <p>{profile.designation || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p>{profile.phoneNumber || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Employee ID</p>
                <p>{profile.employeeId || "-"}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-slate-500">Address</p>
                <p>{profile.address || "-"}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-slate-500">Bio</p>
                <p>{profile.bio || "-"}</p>
              </div>

            </div>

          </CardContent>

        </Card>

      </div>
    </>
  );
};

export default Profile;