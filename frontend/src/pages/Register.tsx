import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

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

import AuthLayout from "@/components/auth/AuthLayout";
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

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout formSide="left">

      <Card className="w-full max-w-lg rounded-2xl shadow-xl">

        <CardHeader className="pb-4 text-center">

          <h1 className="text-4xl font-bold">
            Return<span className="text-orange-500">X</span>
          </h1>

          <CardTitle className="mt-3">
            Create Account
          </CardTitle>

          <CardDescription>
            Join ReturnX and reconnect lost items
          </CardDescription>

        </CardHeader>


        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-3">


            {error && (
              <div className="rounded-md bg-red-100 p-2 text-sm text-red-600">
                {error}
              </div>
            )}


            {success && (
              <div className="rounded-md bg-green-100 p-2 text-sm text-green-600">
                {success}
              </div>
            )}



            <div className="grid grid-cols-2 gap-3">

              <div className="space-y-1">
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>


              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>

            </div>



            <div className="grid grid-cols-2 gap-3">

              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>


              <div className="space-y-1">
                <Label>Password</Label>

                <div className="relative">

                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-slate-500 hover:text-orange-500"
                  >
                    {
                      showPassword
                      ? <EyeOff size={18}/>
                      : <Eye size={18}/>
                    }
                  </button>

                </div>

              </div>

            </div>



            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>



            <div className="space-y-1">
              <Label>Address</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>



            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>



            <p className="pt-1 text-center text-sm">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>

            </p>


          </form>

        </CardContent>

      </Card>

    </AuthLayout>
  );
};

export default Register;