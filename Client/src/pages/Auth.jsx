import React, { useContext } from "react";
import { useState } from "react";
import TextInput from "../Component/TextInput";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { signup, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formType, setFormType] = useState("signup");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === "signup") {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await signup(form);
        alert("SignUp Successfull...");
        navigate('/featurespage')
      } catch (error) {
        alert("SignUp failed");
        console.log(error);
      }
    } else {
      try {
        await login(form);
        navigate('/featurespage')
        alert("Login Successfull...");
      } catch (error) {
        alert("Login failed...");
        console.log(error);
      }
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "signup" ? "login" : "signup");
    // Reset form when switching
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="w-[450px] bg-white drop-shadow-2xl rounded py-6">
        <div className="flex items-center justify-between px-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {formType === "signup" ? "Sign Up Form" : "Login Form"}
          </h2>
          <div
            onClick={() => navigate("/")}
            className="h-10 w-10 transition-all duration-200 hover:bg-gray-100 flex items-center justify-center rounded-full drop-shadow-2xl"
          >
            <X />
          </div>
        </div>
        {formType === "signup" && (
          <TextInput
            type="text"
            name="name"
            value={form.name} // Pass the value
            handleChange={handleChange} // This matches what TextInput expects
            placeholder="Enter Your name..."
            label="Full Name"
          />
        )}

        <TextInput
          type="email"
          name="email"
          value={form.email}
          handleChange={handleChange}
          placeholder="Enter your email..."
          label="Email"
        />

        <TextInput
          type="password"
          name="password"
          value={form.password}
          handleChange={handleChange}
          placeholder="Enter your password..."
          label="Password"
        />
        {formType === "signup" && (
          <TextInput
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            handleChange={handleChange}
            placeholder="Confirm your password..."
            label="Confirm Password"
          />
        )}

        <div className="px-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            {formType === "signup" ? "Sign Up" : "Login"}
          </button>
        </div>

        <div className="px-6 text-center py-4">
          <p>
            {formType === "signup"
              ? "You have already account?"
              : "You are visiting first time?"}{" "}
            <span
              onClick={toggleFormType}
              className="cursor-pointer text-blue-500 font-bold"
            >
              {formType === "signup" ? "Login" : "signup"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
