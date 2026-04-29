import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import authRouter from "./routes/auth.route.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    }
  )
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);

export default app;
