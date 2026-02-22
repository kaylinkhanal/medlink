"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const verify = async () => {
    try {
      const phone = localStorage.getItem("verifyPhone");

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/verify-otp",
        { phone, otp }
      );

      toast.success(res.data.message);
      router.push("/login");

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={verify}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
}