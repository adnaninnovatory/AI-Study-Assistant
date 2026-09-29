import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
const ForgotPassword = () => {
  return (
    <div className="flex  justify-center">
      {/* Left Side */}
      {/* <div className="w-1/2 min-h-screen h-auto md:block hidden relative ">
            <img src={bgImage} className="w-full h-fit object-cover backdrop-blur-xl" />
            <div className = "flex flex-col gap-6 absolute top-0 lg:m-24  md:m-16">
              <div className="flex gap-1">
                <img src={logo} className="" />
                <h2 className="text-white font-semibold text-2xl leading-8 mt-2">Fluid Intelligence</h2>
              </div>
              <div className="w-md flex flex-col gap-6">
                <h1 className="text-white font-bold text-5xl leading-16">Curation through <span className="text-[#4E45E4]">intelligence.</span> </h1>
                <p className="text-[#EDEAFF] text-[18px]">
                  Enter a digital environment that feels less like a database and
                  more like a high-end editorial workspace.
                </p>
              </div>
            </div>
          </div> */}

      {/* Right Side */}
      <div className="md:w-1/2 max-w-125 md:max-w-1/2 lg:p-24  md:p-16 sm:p-8 py-8 px-4">
        <h1 className="font-bold text-3xl mb-3">Forgot Password?</h1>
        <p className="font-medium text-base text-foreground-muted">
          No worries, it happens. Please enter the email address associated with
          your account.
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
          <Button
            type="submit"
            className="w-full bg-[#4E45E4] hover:bg-[#3a31c4] text-white py-5 px-4  rounded-3xl h-13.75 text-xl font-semibold cursor-pointer"
          >
            Send Reset Link

            <FaArrowRight  className="text-white h-3 w-3 ml-1"/>
          </Button>
        </form>

        <Link to={"/login"} className="text-sm mt-6 text-center flex items-center justify-center text-[#4E45E4] hover:text-[#3a31c4] gap-2">
          <ChevronLeft className="h-4 w-4 text-[#4E45E4]"/>
          Return to sign in  
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
