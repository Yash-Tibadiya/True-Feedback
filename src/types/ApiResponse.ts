import { IMessage } from "@/model/User.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAccesptingMessages?: boolean;
  messages?: Array<IMessage>;
}
