import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import Image from "next/image";
export default function CardDemo() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 ">
            <div >
                <Link href="/" aria-label="Medlink home" className="inline-flex items-center">
                    <Image src="/medlink-logo.png" alt="Medlink logo" width={60} height={50} className="object-contain p-2 justify-center" priority />
                </Link>
            </div>
            <Card className="w-full max-w-sm mx-auto ">

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="username@gmail.com"
                                    required
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
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full bg-blue-900 text-white hover:bg-blue-800">
                        Login
                    </Button>
                    OR
                    <Button variant="secondary" className="w-full bg-blue-900 text-white hover:bg-blue-800">
                        Continue with Google 
                    </Button>
                    <CardDescription className="text-center pt-5 ">Don&apos;t have an account?
                    </CardDescription>
                    <Button variant="default" className="text-center font-medium bg-green-600 hover:bg-green-500 ">Signup Now ! </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
