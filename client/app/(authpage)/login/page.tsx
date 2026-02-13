"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function LoginPage() {
  const router = useRouter();
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
          Medlink Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(
                "http://localhost:8080/auth/login",
                values
              );

              toast(res.data.message);
              router.push("/dashboard"); 

              if (res.data.token) {
                localStorage.setItem("token", res.data.token);
              }

            } catch (error: any) {
              toast(error.response?.data || "Login failed");
            }
          }}
        >
          <Form className="flex flex-col gap-4">

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
              className="bg-[#2EC4B6] text-white py-2 rounded-lg hover:bg-teal-600 transition"
            >
              Login
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}
