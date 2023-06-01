import { Form } from "@/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};
export default function Login() {
  return (
    <>
      <div className=" center flex-col gap-4  bg-register rounded-md desktop:max-w-[600px] tablet:max-w-[500px]  mobile:max-w-[350px] w-full max-h-[450px] h-full">
        <h1 className="text-3xl font-bold">Login</h1>
        <Form type="login" />
        <p>
          Don&apos;t have account?{" "}
          <Link href="/register" className="underline font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
