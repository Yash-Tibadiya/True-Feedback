import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: NextAuthUser = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status to accept messages:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: NextAuthUser = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User status fetched successfully",
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user status to accept messages:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching user status to accept messages",
      },
      { status: 500 }
    );
  }
}
