import { Request } from "express"

export interface IGetUserAuthInfoRequest extends Request {
  downloadURL?: string;
      userId?: number;
}