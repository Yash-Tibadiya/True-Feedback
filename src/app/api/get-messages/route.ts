import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user = session?.user as NextAuthUser | undefined;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(_user._id);

    // First check if the user exists
    const userExists = await User.findById(userId);

    if (!userExists) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // If user exists but has no messages, return an empty array
    if (!userExists.messages || userExists.messages.length === 0) {
      return Response.json({ success: true, messages: [] }, { status: 200 });
    }

    // If user has messages, use the aggregation pipeline
    const user = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    return Response.json(
      { success: true, messages: user[0]?.messages || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json(
      { success: false, message: "Database error", error },
      { status: 500 }
    );
  }
}
