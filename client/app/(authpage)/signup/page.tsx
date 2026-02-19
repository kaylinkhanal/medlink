"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const SignupSchema = Yup.object({
  fullName: Yup.string().required("fullName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password required"),
});

export default function SignupPage() {
  const router = useRouter();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL +  "/signup",
        values
      );

      toast(res.data.message);
      resetForm();
      router.push("/verify"); 

    } catch (error: any) {
      toast(error?.response?.data?.message || "Signup failed");
    }
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
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
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-[#64748B]">fullName</label>
              <Field
                name="fullName"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="text-sm text-[#64748B]">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="text-sm text-[#64748B]">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-[#2A7FFF] text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Signup
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}
