"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("Both email and password are required!", {
        position: "top-right",
      });
      return;
    }

    if (email === "admin@admin.com" && password === "admin") {
      toast.success("Login successful!", { position: "top-right" });
      navigate("/admin-dashboard");
    } else {
      toast.error("Invalid email or password.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="flex w-7/12 flex-col gap-10 shadow-2xl p-20 rounded-md">
        <h1 className="font-bold text-3xl">Admin Login</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            onChange={(event) => setEmail(event.target.value)}
            id="email1"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            onChange={(event) => setPassword(event.target.value)}
            id="password1"
            type="password"
            required
            placeholder="Password"
          />
        </div>

        <Button onClick={handleSubmit} color={"failure"} className="p-3">
          Login
        </Button>
      </form>
    </>
  );
}
