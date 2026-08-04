import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Building2,
  Briefcase,
  Phone,
  IdCard,
  MapPin,
  FileText,
} from "lucide-react";
import { getMyProfile, updateProfile } from "@/services/userService";
import type { UserProfile, UpdateProfileRequest } from "@/services/userService";

interface FieldProps {
  icon?: React.ReactNode;
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextFieldProps {
  icon?: React.ReactNode;
  label: string;
  name: string;
  value?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    firstName: "",
    lastName: "",
    employeeId: "",
    department: "",
    designation: "",
    phoneNumber: "",
    address: "",
    bio: "",
    preferences: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        employeeId: data.employeeId || "",
        department: data.department || "",
        designation: data.designation || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        bio: data.bio || "",
        preferences: data.preferences || "",
      });
    } catch (e) {
      console.error(e);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return alert("Profile not found");

    try {
      setSaving(true);
      await updateProfile(profile.id, formData);
      alert("Profile updated successfully.");
      navigate("/profile");
    } catch (e) {
      console.error("Update Error:", e);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-xl text-slate-500">
        Loading profile details...
      </div>
    );
  }

  const fields = [
    { icon: <User size={16} />, label: "First Name", name: "firstName" },
    { icon: <User size={16} />, label: "Last Name", name: "lastName" },
    { icon: <IdCard size={16} />, label: "Employee ID", name: "employeeId" },
    { icon: <Building2 size={16} />, label: "Department", name: "department" },
    { icon: <Briefcase size={16} />, label: "Designation", name: "designation" },
    { icon: <Phone size={16} />, label: "Phone Number", name: "phoneNumber" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Card className="border-none shadow-xl">
        <div className="rounded-t-xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="mt-2 text-orange-100">
            Update your ReturnX profile details.
          </p>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            {fields.map((f) => (
              <Field
                key={f.name}
                icon={f.icon}
                label={f.label}
                name={f.name}
                value={formData[f.name as keyof UpdateProfileRequest]}
                onChange={handleChange}
              />
            ))}

            <TextField
              icon={<MapPin size={16} />}
              label="Address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
            />

            <TextField
              icon={<FileText size={16} />}
              label="Bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
            />

            <TextField
              label="Preferences"
              name="preferences"
              rows={3}
              value={formData.preferences}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 md:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const Field = ({ icon, label, name, value, onChange }: FieldProps) => (
  <div>
    <Label>
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Label>
    <Input
      name={name}
      value={value || ""}
      onChange={onChange}
      className="mt-2"
    />
  </div>
);

const TextField = ({
  icon,
  label,
  name,
  value,
  rows = 3,
  onChange,
}: TextFieldProps) => (
  <div className="md:col-span-2">
    <Label>
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Label>
    <Textarea
      name={name}
      rows={rows}
      value={value || ""}
      onChange={onChange}
      className="mt-2"
    />
  </div>
);

export default EditProfile;