import React, { useState } from "react";
import centerDecor from "@/assets/images/visual-decor.png";
import rightDecor from "@/assets/images/bg-decor.png";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ChevronLeft } from "lucide-react";
const OTPVerify = () => {
      const [value, setValue] = useState("")
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center relative overflow-hidden">
      <img
        src={centerDecor}
        className="absolute top-1/2 left-1/2 transform -translate-1/2 max-w-3xl max-h-3xl"
      />

      <div className="max-w-md absolute">
        <h1 className="font-bold text-3xl mb-3 text-center">
          Check your email
        </h1>
        <p className="font-medium text-base text-foreground-muted text-center mb-6">
          We've sent a 6-digit security code to m***@aether.ai. Enter it below
          to continue.
        </p>

        <div className="w-full   p-10 bg-white rounded-4xl drop-shadow-2xl">
          <div className="space-y-6 mb-4">
            <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#4E45E4] hover:bg-[#3a31c4] text-white py-5 px-4  rounded-3xl h-13.75 text-xl font-semibold cursor-pointer"
          >
            Verify Identity
            <FaArrowRight className="text-white h-3 w-3 ml-1" />
          </Button>

          <div className="flex items-center gap-2 justify-center mt-6 mb-4">
            <CiStopwatch className="h-5 w-5 text-foreground-muted"/>
            <p className="text-muted-foreground text-sm">
              Resend code in <span className="text-[#4E45E4] font-semibold">0:54</span>
            </p>
          </div>
          <Link className="flex justify-center font-semibold text-foreground-muted">Didn't receive a code?</Link>
          <Link to={"/login"} className="text-sm mt-6 text-center flex items-center justify-center text-[#4E45E4] hover:text-[#3a31c4] gap-2">
          <ChevronLeft className="h-4 w-4 text-[#4E45E4]"/>
          Return to sign in  
        </Link>
        </div>
      </div>

      <img
        src={rightDecor}
        className="absolute -right-10 -bottom-10 max-w-125 max-h-125"
      />
    </div>
  );
};

export default OTPVerify;
