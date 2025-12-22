const User = require("../model/Auth_user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {sendEmail} = require("../config/Nodemailer");


exports.SignupTheUser = async (req, res) => {
  try {
    // Destructure and validate input
    const {
      firstName,
      lastName,
      emailId,
      password,
      skills,
      gender,
      age,
      photoUrl,
      about,
    } = req.body;

    if (!firstName || !emailId || !password) {
      return res
        .status(400)
        .send("ERROR: First name, email, and password are required.");
    }

    console.log("Signup data received:", req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res
        .status(400)
        .send("ERROR: User with this email already exists.");
    }

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
      gender,
      age,
      photoUrl,
      about,
    });

    const savedUser = await user.save();
    console.log("User created successfully:", savedUser);

    // Generate a token
    const token = await savedUser.getJWT();
    console.log("JWT generated:", token);

    // Set the token in cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true, // Secure cookie
    });

    res
      .status(201)
      .json({ message: "User created successfully!", data: savedUser });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).send("ERROR: " + err.message);
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      // Security best practice: don't tell them if email exists or not
      return res.status(200).json({ success: true, message: "Email sent if account exists." });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Construct the URL for your Frontend
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `
      <h1>Password Reset Request</h1>
      <p>Someone requested a password reset for your BondWave account.</p>
      <p>Please click the link below to reset your password. This link expires in 10 minutes.</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail(user.emailId, "BondWave - Password Reset", "Reset your password", message);
      
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (err) {
      console.log("email could not be send", err)
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};





exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    // Hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find valid user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or expired",
      });
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.loginTheUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successful!!");
};
