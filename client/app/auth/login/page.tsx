"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema, LoginTypeSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";

export default function Login() {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginTypeSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 ">
      <div>
        <Link
          href="/"
          aria-label="Medlink home"
          className="inline-flex items-center"
        >
          <Image
            src="/medlink-logo.png"
            alt="Medlink logo"
            width={80}
            height={50}
            className="object-contain p-2 justify-center"
            priority
          />
        </Link>
      </div>
      <Card className="w-full max-w-sm mx-auto ">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@gmail.com"
                  {...form.register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:text-blue-700"
                  >
                    forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  {...form.register("password")} />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-8">
              <Button
                type="submit"
                className="w-full bg-blue-900 text-white hover:bg-blue-800"
              >
                Login
              </Button>
              OR
              <Button
                variant="secondary"
                className="w-full bg-blue-900 text-white hover:bg-blue-800"
              >
                Continue with Google <LogIn className="ml-2" />
              </Button>
              <CardDescription className="text-center pt-5 ">
                Don&apos;t have an account?
              </CardDescription>
              <Button
                variant="default"
                className="text-center font-medium bg-green-600 hover:bg-green-500 "
              >
                <Link href="/auth/register">Signup Now !</Link>
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
