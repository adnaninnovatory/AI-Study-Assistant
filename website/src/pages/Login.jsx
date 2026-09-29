import React, { useState } from "react";
import bgImage from "@/assets/images/bg-1.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import logo from "@/assets/icons/logo.png";
function Login() {
  const [remember, setRemember] = useState(false);
  return (
    <div className="flex md:justify-normal justify-center">
      {/* Left Side */}
      <div className="w-1/2  md:block hidden relative ">
        <img src={bgImage} className="w-full min-h-screen object-fill backdrop-blur-xl" />
        <div className = "flex flex-col gap-6 absolute top-0 lg:m-24  md:m-16">
          <div className="flex gap-1">
            <img src={logo} className="" />
            <h2 className="text-white font-semibold text-2xl leading-8 mt-2">DocuMind AI</h2>
          </div>
          <div className="w-md flex flex-col gap-6">
            <h1 className="text-white font-bold text-5xl leading-16">Curation through <span className="text-[#4E45E4]">intelligence.</span> </h1>
            <p className="text-[#EDEAFF] text-[18px]">
              Enter a digital environment that feels less like a database and
              more like a high-end editorial workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 max-w-125 md:max-w-1/2 lg:px-24  lg:py-16 md:p-16 sm:p-8 py-8 px-4">
        <h1 className="font-bold text-3xl mb-3">Welcome back</h1>
        <p className="font-medium text-base text-foreground-muted">
          Please enter your details to sign in.
        </p>

        {/* Form */}
        <form className="mt-8">
          <div className="mb-6 gap-3 flex flex-col">
            <Label
              htmlFor="email"
              className="uppercase font-semibold text-foreground-muted tracking-widest"
            >
              EMAIL ADDRESS
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-input-background py-5 px-4 rounded-3xl h-13.75 text-base"
            />
          </div>

          <div className="mb-6 gap-3 flex flex-col">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="uppercase font-semibold text-foreground-muted tracking-widest"
              >
                PASSWORD
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#4E45E4] hover:text-[#3a31c4]"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-input-background py-5 px-4 rounded-3xl h-13.75 text-base"
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <Label
              htmlFor="remember"
              className="flex items-center gap-2 text-base text-foreground-muted"
            >
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked)}
              />
              Remember me for 30 days
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4E45E4] hover:bg-[#3a31c4] text-white py-5 px-4 rounded-3xl h-13.75 text-xl font-semibold cursor-pointer"
          >
            Sign In
          </Button>
        </form>

        <p className="text-base text-muted-foreground mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#4E45E4] hover:text-[#3a31c4]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
