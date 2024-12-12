// Login.js
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLoginSuccess }) {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign-In and Create Account
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Sign-In
  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      toast.success("Login successful!");
      localStorage.setItem("isAuthenticated", "true");
      onLoginSuccess();
    } else {
      toast.error("Invalid email or password!");
    }
  };

  // Handle Create Account
  const handleCreateAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === formData.email);

    if (userExists) {
      toast.error("Account already exists with this email!");
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
    } else {
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("Account created successfully!");
      setIsSignIn(true); // Switch to Sign-In view
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignIn ? "Sign In" : "Create Account"}
        </h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Action Button */}
        <button
          onClick={isSignIn ? handleSignIn : handleCreateAccount}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>

        {/* Toggle View */}
        <p className="mt-4 text-center text-sm">
          {isSignIn ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignIn(false)}
              >
                Create one
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </span>
            </>
          )}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
