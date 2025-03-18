"use client";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { ApiResponse } from "@/types/ApiResponse";
import { verifySchema } from "@/schemas/verifySchema";
import { ModeToggle } from "@/components/mode-toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  // Zod validation implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast.success("Success", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error verifying code:", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          AxiosError.response?.data.message ?? "Error verifying code",
      });
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen transition-colors duration-300 bg-white dark:bg-black dark:bg-gradient-to-tr bg-gradient-to-tr from-white to-blue-950 dark:from-black dark:to-blue-900 overflow-hidden">
        {/* Form Content */}
        <ModeToggle />
        <div className="flex flex-col items-start justify-center w-full p-4 sm:p-8 md:p-12 lg:pl-20 lg:pr-0 z-10">
          <div className="w-full max-w-lg lg:pl-20">
            <div className="mb-8 space-y-4">
              <div className="w-16 h-16 mb-2">
                <Image
                  src="/extra/saas.png"
                  alt="Image"
                  width={300}
                  height={300}
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Join True Feedback!
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Enter the verification code sent to your email.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Verification Code
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <Input
                          {...field}
                          name="code"
                          className="pl-10 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                          placeholder="Enter your verification code"
                        />
                      </div>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-black transition-colors mt-2.5"
                >
                  Verify
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Background Image - Positioned to be half-shown/half-hidden */}
        <div className="absolute top-0 right-0 h-full w-7/10 overflow-hidden hidden lg:block">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4">
            <Image
              src="/extra/bg2.png"
              alt="Integration Platform"
              width={1920}
              height={1080}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
