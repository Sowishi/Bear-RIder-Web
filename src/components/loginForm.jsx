"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function LoginForm() {
  return (
    <form className="flex w-7/12 flex-col gap-10 shadow-xl p-20 rounded-md">
      <h1 className="font-bold text-3xl">Admin Login</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>

      <Button type="submit" color={"failure"} className="p-3">
        Login
      </Button>
    </form>
  );
}
