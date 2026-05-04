import { Router } from "express";
import passport from "passport";
import { googleAuthCallback } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

// Guard: only allow callback with OAuth params (code or error from Google)
authRouter.get(
  "/google/callback",
  (req, res, next) => {
    const hasOAuthParams = req.query && (req.query.code || req.query.error);
    if (!hasOAuthParams) {
      return res.status(400).json({
        error:
          "Invalid callback: missing OAuth parameters. Start from /api/auth/google",
      });
    }
    next();
  },
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  googleAuthCallback
);

export default authRouter;
