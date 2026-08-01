import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerUser } from "@/services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const message = await registerUser(formData);

      setSuccess(message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardHeader className="text-center">
          <h1 className="text-4xl font-bold">
            Return<span className="text-orange-500">X</span>
          </h1>

          <CardTitle className="mt-4">
            Create Account
          </CardTitle>

          <CardDescription>
            Register a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <div className="rounded bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded bg-green-100 p-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-500"
              >
                Login
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;