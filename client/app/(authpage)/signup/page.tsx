"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const SignupSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  role: Yup.string()
    .oneOf(["user", "hospitalstaff"])
    .required("Role is required"),
});

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);

      const { confirmPassword, ...data } = values;

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/signup",
        data
      );

      toast.success(res.data.message);

      localStorage.setItem("verifyPhone", values.phone);
      resetForm();
      router.push("/verify");

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
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
          Medlink Signup
        </h2>

        <Formik
          initialValues={{
            fullName: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "user",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="text-sm text-[#64748B]">Full Name</label>
              <Field
                name="fullName"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

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

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-[#64748B]">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-sm text-[#64748B]">Register As</label>
              <Field
                as="select"
                name="role"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              >
                <option value="user">User</option>
                <option value="hospitalstaff">Hospital Staff</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2A7FFF] text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Signup"}
            </button>

          </Form>
        </Formik>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-[#2A7FFF] cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}