import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  // Guard: if the callback is visited directly (no `code` or `error` query),
  // redirect to the auth start which includes the required `scope` param.
  (req, res, next) => {
    const hasOAuthParams = req.query && (req.query.code || req.query.error);
    if (!hasOAuthParams) {
      return res.redirect("/api/auth/google");
    }
    next();
  },
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.json({
      message: "Google authentication successful",
      user: req.user,
    });
  }
);

export default authRouter;
