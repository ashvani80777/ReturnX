import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  IdCard,
  MapPin,
  Award,
} from "lucide-react";
import { getCurrentUser, getMyProfile } from "@/services/userService";

interface AuthUser {
  email?: string;
  role?: string;
}

interface UserProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  department?: string;
  designation?: string;
  employeeId?: string;
  bio?: string;
}

interface InfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Info = ({ icon, label, value }: InfoProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-orange-500">{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  </div>
);

const Profile = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, profileRes] = await Promise.all([
          getCurrentUser(),
          getMyProfile(),
        ]);
        setAuthUser(userRes);
        setProfile(profileRes);
      } catch (e) {
        console.error("Error fetching profile details:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-xl text-slate-500">
        Loading profile...
      </div>
    );
  }

  const fullName =
    profile?.firstName || profile?.lastName
      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
      : "User";

  const initials =
    `${profile?.firstName?.[0] || ""}${profile?.lastName?.[0] || ""}`.toUpperCase() ||
    "U";

  const stats = [
    { icon: <Award className="text-orange-500" />, title: "Karma Points", value: "0" },
    { icon: <Briefcase className="text-orange-500" />, title: "Items Reported", value: "0" },
    { icon: <User className="text-orange-500" />, title: "Successful Returns", value: "0" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Profile Header */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-orange-500 shadow">
                {initials}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{fullName}</h1>
                <p className="mt-1 text-orange-100">{authUser?.email || "-"}</p>
                <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                  {authUser?.role || "USER"}
                </span>
              </div>
            </div>

            <Button asChild className="bg-white text-orange-600 hover:bg-orange-50">
              <Link to="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              {stat.icon}
              <h3 className="mt-3 text-3xl font-bold text-slate-800">
                {stat.value}
              </h3>
              <p className="text-slate-500">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Personal Information
            </h2>

            <Info icon={<User />} label="Full Name" value={fullName} />
            <Info icon={<Mail />} label="Email" value={authUser?.email || "-"} />
            <Info
              icon={<Phone />}
              label="Phone"
              value={profile?.phoneNumber || "-"}
            />
            <Info
              icon={<MapPin />}
              label="Address"
              value={profile?.address || "-"}
            />
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Professional Information
            </h2>

            <Info
              icon={<Building2 />}
              label="Department"
              value={profile?.department || "-"}
            />
            <Info
              icon={<Briefcase />}
              label="Designation"
              value={profile?.designation || "-"}
            />
            <Info
              icon={<IdCard />}
              label="Employee ID"
              value={profile?.employeeId || "-"}
            />
            <Info icon={<User />} label="Bio" value={profile?.bio || "-"} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;