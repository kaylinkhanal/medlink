// "use client";

// import Link from "next/link";
// import Image from "next/image";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { registerSchema, RegisterTypeSchema } from "@/lib/validation/auth";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function RegisterPage() {
//   const form = useForm<RegisterTypeSchema>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = (data: RegisterTypeSchema) => {
//     console.log("REGISTER DATA:", data);
//   };

//   return (
//     <div className="flex flex-col gap-2 min-h-screen items-center justify-center bg-zinc-100 px-4">
//                 <div className="flex justify-center">
//             <Link href="/" aria-label="Medlink home">
//               <Image
//                 src="/medlink-logo.png"
//                 alt="Medlink logo"
//                 width={60}
//                 height={50}
//                 className="object-contain"
//                 priority
//               />
//             </Link>
//           </div>

//       <Card className="w-full max-w-sm">

//         <CardContent>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             {/* Name */}
//             <div className="grid gap-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 placeholder="John Doe"
//                 {...form.register("name")}
//               />
//               {form.formState.errors.name?.message && (
//                 <p className="text-sm text-red-600">
//                   {form.formState.errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="username@gmail.com"
//                 {...form.register("email")}
//               />
//               {form.formState.errors.email?.message && (
//                 <p className="text-sm text-red-600">
//                   {form.formState.errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 {...form.register("password")}
//               />
//               {form.formState.errors.password?.message && (
//                 <p className="text-sm text-red-600">
//                   {form.formState.errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="grid gap-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 {...form.register("confirmPassword")}
//               />
//               {form.formState.errors.confirmPassword?.message && (
//                 <p className="text-sm text-red-600">
//                   {form.formState.errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-500"
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting ? "Creating..." : "Create account"}
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="flex flex-col gap-3">
//           <p className="text-sm text-zinc-600">
//             Already have an account?{" "}
//             <Link href="/auth/login" className="font-medium text-blue-700">
//               Login
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterTypeSchema } from "@/lib/validation/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/date-picker";

export default function RegisterPage() {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bloodGroup: "O+",
      address: "",
      dob: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterTypeSchema) => {
    console.log("REGISTER DATA:", data);
  };

  const errors = form.formState.errors;

  return (
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="flex justify-center">
        <Link href="/" aria-label="Medlink home">
          <Image
            src="/medlink-logo.png"
            alt="Medlink logo"
            width={60}
            height={50}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to become a donor and save lives!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="flex flex-row gap-3">
              <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  placeholder="Hari"
                  {...form.register("name")}
                />
                {errors.name?.message && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Prasad"
                  {...form.register("middleName")}
                />
                {errors.middleName?.message && (
                  <p className="text-sm text-red-600">{errors.middleName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="name"
                  placeholder="Sharma"
                  {...form.register("name")}
                />
                {errors.name?.message && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="username@gmail.com"
                {...form.register("email")}
              />
              {errors.email?.message && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+97798XXXXXXXX"
                {...form.register("phone")}
              />
              {errors.phone?.message && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-row gap-5 justify-around">
              {/* Blood Group */}
              <div className="grid gap-2">
                <Label>Blood Group</Label>
                <Select
                  value={form.watch("bloodGroup")}
                  onValueChange={(value) =>
                    form.setValue("bloodGroup", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                {errors.bloodGroup?.message && (
                  <p className="text-sm text-red-600">
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <DatePicker />
                {/* <Input id="dob" type="dat" {...form.register("dob")} /> */}
                {errors.dob?.message && (
                  <p className="text-sm text-red-600">{errors.dob.message}</p>
                )}
              </div>

              

              {/* Address */}
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Kathmandu"
                  {...form.register("address")}
                />
                {errors.address?.message && (
                  <p className="text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              {errors.password?.message && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...form.register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-zinc-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-blue-700">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
