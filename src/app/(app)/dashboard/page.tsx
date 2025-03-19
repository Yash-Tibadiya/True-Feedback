"use client";

import MessageCard from "@/components/MessageCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IMessage } from "@/model/User.model";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy, Link, MessageSquare } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const router = useRouter();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  // const { data: session } = useSession();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/sign-in"); // Redirect to sign-in when unauthenticated
    },
  });

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptedMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages as boolean);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Error accepting messages",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Refreshed messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message ?? "Error fetching messages",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
      return;
    }
    if (session && session.user) {
      fetchMessages();
      fetchAcceptedMessages();
    }
  }, [session, setValue, fetchMessages, fetchAcceptedMessages, status, router]);

  // handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success("Success", {
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session || !session.user) {
    return null;
  }

  const { username } = session?.user as User;
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("URL Copied", {
      description: "Profile URL has been copied to clipboard",
    });
  };

  return (
    <>
      <div className="relative flex flex-col min-h-screen transition-colors duration-300 bg-gradient-to-tr from-blue-400 to-blue-800 dark:bg-black dark:bg-gradient-to-tr dark:from-black dark:to-blue-900 overflow-hidden">
        <Navbar />
        <div className="flex flex-col items-start justify-start w-full p-4 sm:p-8 md:p-12 lg:p-16 z-10">
          <div className="w-full max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="px-6 py-5 border-b border-gray-400 dark:border-gray-600 bg-white/60 dark:bg-transparent rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage your feedback and messages
              </p>
            </div>

            {/* Share Profile Section */}
            <div className="p-6 border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-transparent">
              <div className="flex items-center space-x-2 mb-3">
                <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Profile Link
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={profileUrl}
                    readOnly
                    className="w-full py-2.5 px-4 pr-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px] py-2.5"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Message Settings Section */}
            <div className="p-6 border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Message Settings
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {acceptMessages
                      ? "Accepting messages"
                      : "Not accepting messages"}
                  </span>
                  <Switch
                    {...register("acceptMessages")}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Messages Section */}
            <div className="p-6 backdrop-blur-sm bg-white/60 dark:bg-gray-700/40 rounded-b-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Your Messages
                  </h3>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 backdrop-blur-sm shadow-sm">
                    {messages.length}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => fetchMessages(true)}
                  className="border border-gray-300/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-all duration-200 shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Refresh</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Messages Grid */}
              {messages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages.map((message) => (
                    <MessageCard
                      key={message._id as string}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 backdrop-blur-sm mb-6 shadow-inner">
                    <MessageSquare className="h-10 w-10 text-blue-400 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    No messages yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    Share your profile link to start receiving anonymous
                    feedback.
                  </p>
                  <Button
                    onClick={copyToClipboard}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2.5"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Profile Link
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer removed as per your latest code */}
    </>
  );
}
