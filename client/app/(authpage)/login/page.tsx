"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const LoginSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
    .required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/login",
        values
      );

      toast.success(res.data.message);

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      if (res.data.user.role === "hospitalstaff") {
        router.push("/hospital-dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[380px]">

        <div className="flex justify-center mb-4">
          <Image
            src="/medLinkLogo.png"
            alt="Medlink Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 text-center">
          Medlink Login
        </h2>

        <Formik
          initialValues={{ phone: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">

            {/* Phone */}
            <div>
              <label className="text-sm text-[#64748B]">Phone Number</label>
              <Field
                name="phone"
                type="text"
                placeholder="98XXXXXXXX"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#64748B]">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2A7FFF] text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </Form>
        </Formik>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-[#2A7FFF] cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}