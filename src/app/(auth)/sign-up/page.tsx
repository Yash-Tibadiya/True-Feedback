"use client";

import * as z from "zod";
import Link from "next/link";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const debounced = useDebounceCallback(setUsername, 300);

  // Zod validation implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            AxiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success("Success", {
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error signing up:", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        AxiosError.response?.data.message ?? "Error signing up";
      toast.error("Error", {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white lg:flex-row dark:bg-black dark:bg-gradient-to-tr bg-gradient-to-tr from-white to-stone-900 dark:from-black dark:to-blue-900 overflow-hidden">
        {/* Left column - Form */}
        <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8 md:p-12 lg:p-16">
          <ModeToggle />
          <div className="w-full max-w-md">
            <div className="mb-8 space-y-4">
              <div className="w-12 h-12 mb-2">
                <Image
                  src="/extra/feedback_2159429.png"
                  alt="Image"
                  width={300}
                  height={300}
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Get started!
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Please enter your email address to receive the code.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Username
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <Input
                          {...field}
                          className="pl-10 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                          placeholder="Username"
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                        />
                      </div>
                      {isCheckingUsername && (
                        <div className="flex items-center mt-1">
                          <Loader2 className="w-4 h-4 mr-2 text-blue-500 animate-spin" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Checking username...
                          </span>
                        </div>
                      )}
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-sm mt-1 ${
                            usernameMessage === "Username is unique"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <Input
                          {...field}
                          name="email"
                          className="pl-10 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                          placeholder="Email"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        We&apos;ll send you a verification code
                      </p>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <Input
                          type="password"
                          {...field}
                          name="password"
                          placeholder="Password"
                          className="pl-10 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                      </div>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-black transition-colors mt-2.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Send code"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Image (visible on larger screens) */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-0 flex justify-center">
            <div className="flex items-center justify-center w-full h-full">
              {/* TODO: add background image  */}
              <div>
                <Image
                  src="/extra/bg2.png"
                  alt="Integration Platform"
                  width={500}
                  height={500}
                  className="rounded-lg w-3/5 h-3/5 "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
