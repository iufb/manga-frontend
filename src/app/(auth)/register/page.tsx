import { Form } from "@/components";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
};

export default function Register() {
  return (
    <>
      <Head>Register</Head>
      <div className=" center flex-col gap-4  bg-register rounded-md desktop:max-w-[600px] tablet:max-w-[500px]  mobile:max-w-[350px] w-full max-h-[450px] h-full">
        <h1 className="text-3xl font-bold">Register</h1>
        <Form type="register" />{" "}
        <p>
          Already have account?{" "}
          <Link href="/login" className="underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
