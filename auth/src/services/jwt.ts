import jwt from "jsonwebtoken";
import { UserDoc } from "../models/user-model";

export class Jwt {
  static generate(user: UserDoc) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
  }

  static getPayload(token: string) {
    return jwt.verify(token, process.env.JWT_KEY!);
  }
}
