import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {

  await dbConnect();

  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    // validate username with zod
    const result = UsernameQuerySchema.safeParse({ username });
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(", ")
              : "Invalid username",
        },
        { status: 400 }
      );
    }

    if (!username) {
      return Response.json(
        { success: false, message: "Username not provided" },
        { status: 400 }
      );
    }

    const existingVerifiedUser = await User.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
