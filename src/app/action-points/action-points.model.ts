import { type User } from "../user/user.model";

export interface ActionPoints {
  user: User;
  apGenerated: number;
  apUsed: number;

}
