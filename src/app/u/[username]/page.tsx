"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-messages", {
        ...data,
        username,
      });

      toast.success("Success", {
        description: response.data.message,
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Error sending message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen transition-colors duration-300 bg-gradient-to-tr from-blue-400 to-blue-800 dark:bg-black dark:bg-gradient-to-tr dark:from-black dark:to-blue-900 overflow-hidden">
      <div className="flex flex-col items-start justify-start w-full p-4 sm:p-8 md:p-12 lg:p-16 z-10">
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/30 dark:bg-gray-700/40 rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Public Profile Link
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">
                      Send Anonymous Message to @{username}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none w-full py-3 px-4 rounded-lg bg-white/60 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-950 font-semibold dark:text-gray-200 focus:ring-2 focus:ring-blue-500 shadow-inner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400 text-sm" />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isLoading ? (
                  <Button
                    disabled
                    className="bg-blue-500 dark:bg-blue-600 text-white py-2.5 px-6 rounded-lg opacity-70"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 px-8 py-2.5 rounded-lg"
                  >
                    Send It
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <div className="space-y-6 my-8">
            <div className="space-y-2">
              <Button
                onClick={fetchSuggestedMessages}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200"
                disabled={isSuggestLoading}
              >
                {isSuggestLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Suggest Messages</span>
                )}
              </Button>
              <p className="text-sm text-gray-900 dark:text-gray-400 mt-2">
                Click on any message below to select it.
              </p>
            </div>
            <Card className="border border-gray-300/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="border-b border-gray-400 dark:border-gray-600 pb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Messages
                </h3>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {error ? (
                  <p className="text-red-500 dark:text-red-400">
                    {error.message}
                  </p>
                ) : (
                  parseStringMessages(completion).map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border border-gray-300/50 dark:border-gray-700/50 bg-white dark:bg-gray-800 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-all duration-200 shadow-sm text-left justify-start px-4 py-3"
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
          <Separator className="my-6 border-gray-200 dark:border-gray-700" />
          <div className="text-center">
            <div className="mb-4 text-gray-800 dark:text-gray-300 font-medium">
              Get Your Message Board
            </div>
            <Link href={"/sign-up"}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2.5 rounded-lg">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="text-center py-4 sticky bottom-0 z-50 bg-blue-500/20 dark:bg-blue-950/70 backdrop-blur-sm mt-auto">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} True Feedback. All rights reserved.
        </p>
      </div> */}
    </div>
  );
}
