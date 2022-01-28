import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";

import mongoose from "mongoose";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
// Como el trafico esta siendo direccionado a traves de un proxy de ngnix
// Express necesita saber que es un proxy confiable, por eso:
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // no encriptar cookies
    secure: true, // Usar cookies solo en https
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use("*", async () => {
  console.log("NOT FOUND");
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("DB connection succesfull");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
