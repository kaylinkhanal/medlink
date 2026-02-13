"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VerifySchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Verification code required"),
});

export default function VerifyCodePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
          Verify Your Account
        </h2>

        <Formik
          initialValues={{ email: "", code: "" }}
          validationSchema={VerifySchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await axios.post(
                "http://localhost:8080/auth/verify",
                values
              );

              toast(res.data.message);
              router.push("/login");

            } catch (error: any) {
              toast(error.response?.data?.message || "Verification failed");
            } finally {
              setLoading(false);
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
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-[#64748B]">Verification Code</label>
              <Field
                name="code"
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:border-[#2A7FFF]"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#2A7FFF] text-white py-2 rounded-lg hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
