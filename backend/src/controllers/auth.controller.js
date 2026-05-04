import * as userDao from "../dao/user.dao.js";
import * as utils from "../utils/utils.js";

export async function googleAuthCallback(req, res) {
  try {
    const userData = req.user;
    if (!userData || !userData.emails || userData.emails.length === 0) {
      return res.status(400).json({ error: "No email from Google profile" });
    }

    let user = await userDao.findUserByEmail(userData.emails[0].value);

    if (!user) {
      user = await userDao.createUser({
        fullname: userData.displayName,
        email: userData.emails[0].value,
      });
    }

    const token = utils.generateToken({
      id: user._id,
      fullname: user.fullname,
    });

    // Use secure: false for development (localhost), true for production
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.redirect("http://localhost:5173/");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
}
