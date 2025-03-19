"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Clock, Trash2 } from "lucide-react";
import { IMessage } from "@/model/User.model";

import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type MessageCardProps = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast.success("Message deleted successfully", {
      description: response.data.message,
    });
    onMessageDelete(message._id as string);
  };

  // Format the date if it exists
  const formattedDate = message.created_at
    ? formatDistanceToNow(new Date(message.created_at), { addSuffix: true })
    : "Recently";

  return (
    <Card className="overflow-hidden transition-all duration-300 border-0 shadow-md group bg-gradient-to-tl from-blue-400 to-blue-700 dark:from-black/70 dark:to-blue-900 backdrop-blur-sm hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-white">
            Anonymous Feedback
          </CardTitle>
          <CardDescription className="flex items-center mt-1 text-sm text-blue-100 dark:text-gray-400">
            <Clock className="inline-block w-3 h-3 mr-1" />
            {formattedDate}
          </CardDescription>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-white/70 transition-opacity duration-200 rounded-full opacity-0 group-hover:opacity-100 hover:text-red-200 hover:bg-red-500/20 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-0 shadow-xl dark:bg-gray-900">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-gray-900 dark:text-white">
                Delete this message?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete this
                message from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-gray-700 bg-gray-100 border-0 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-6">
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-900">
          <p className="text-gray-800 whitespace-pre-wrap dark:text-gray-200">
            {message.content || "No message content"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
