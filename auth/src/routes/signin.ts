import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { UnautorizedError } from "../errors/unauthorized-error";
import { runValidators } from "../middlewares/run-validators";
import { User } from "../models/user-model";
import { Jwt } from "../services/jwt";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  runValidators,
  async (req: Request, res: Response) => {
    // Obtener usuario
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnautorizedError();
    }

    const isPasswordCorrect = await Password.compare(user.password, password);

    if (!isPasswordCorrect) {
      throw new UnautorizedError();
    }

    const jwt = Jwt.generate(user);

    req.session = {
      jwt,
    };

    res.json({ jwt });
  }
);

export { router as signInRouter };
