import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { nepshow } from "../../images";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        data,
      );
      return res.data;
    },
    onSuccess: (data) => {
      sessionStorage.setItem("user_email", formData.email);
      alert(data.message);
      navigate("/verifyemail");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Error");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.password_confirmation)
      nextErrors.password_confirmation = "Passwords do not match";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate(formData);
  };

  return (
    <div className="custom-bg min-h-screen">
      <div className="h-screen flex justify-center items-center bg-black bg-opacity-90">
        <div className="relative mx-auto w-full max-w-md px-6 pt-8 pb-8 border-[1px] border-[#81808053] sm:rounded-md sm:px-10 backdrop-blur-[2px]-sm bg-[#000000a1]">
          <img src={nepshow} className="h-14 mx-auto" />
          <h2 className="text-center text-2xl text-gray-300 mt-2">
            REGISTER YOUR ACCOUNT
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full mb-1 p-2 bg-transparent border text-white"
              onChange={handleChange}
              value={formData.name}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mb-2">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-1 p-2 bg-transparent border text-white"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mb-2">{errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full mb-1 p-2 bg-transparent border text-white"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mb-2">{errors.password}</p>
              )}
              <span
                className="absolute right-2 top-2 text-white cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                👁
              </span>
            </div>

            <div className="relative">
              <input
                type={showCPass ? "text" : "password"}
                name="password_confirmation"
                placeholder="Confirm Password"
                className="w-full mb-1 p-2 bg-transparent border text-white"
                onChange={handleChange}
                value={formData.password_confirmation}
              />
              {errors.password_confirmation && (
                <p className="text-red-400 text-sm mb-2">
                  {errors.password_confirmation}
                </p>
              )}
              <span
                className="absolute right-2 top-2 text-white cursor-pointer"
                onClick={() => setShowCPass(!showCPass)}
              >
                👁
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 py-2 text-white"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
