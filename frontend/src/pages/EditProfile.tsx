import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  getMyProfile,
  updateProfile,
} from "@/services/userService";

import type {
  UserProfile,
  UpdateProfileRequest,
} from "@/services/userService";


const EditProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    } catch (error) {
      console.error(error);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!profile) return;

    try {
      setSaving(true);

      await updateProfile(profile.id, formData);

      alert("Profile updated successfully.");

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center text-lg">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Card className="shadow-sm">
          <CardContent className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Edit Profile
              </h1>

              <p className="mt-2 text-slate-500">
                Update your personal information.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-6 md:grid-cols-2"
            >
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="preferences">Preferences</Label>
                <Textarea
                  id="preferences"
                  name="preferences"
                  rows={4}
                  value={formData.preferences}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;