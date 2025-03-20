import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User.model";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User as NextAuthUser } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: NextApiRequest,
  response: NextApiResponse,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: NextAuthUser = session?.user;

  if (!session || !_user) {
    return response.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }

  try {
    const updateResult = await User.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return response.status(404).json({
        message: "Message not found or already deleted",
        success: false
      });
    }

    return response.status(200).json({
      message: "Message deleted",
      success: true
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return response.status(500).json({
      message: "Error deleting message",
      success: false
    });
  }
}
