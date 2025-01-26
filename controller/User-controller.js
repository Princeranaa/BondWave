const User = require("../model/User_model");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

// exports.SignupTheUser = async (req, res) => {
//   try {
//     // Validation of data
//     validateSignUpData(req);

//     const { firstName, lastName, emailId, password, skills, gender, age, photoUrl, about } = req.body;

//     // Encrypt the password
//     const passwordHash = await bcrypt.hash(password, 10);
//     //   console.log(passwordHash);

//     //   Creating a new instance of the User model
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       skills,
//       gender, 
//       age,
//       photoUrl,
//       about,
//       password: passwordHash,
//     });


//     const savedUser = await user.save();
//     console.log(savedUser)
//     const token = await savedUser.getJWT();
//     console.log(token)

//     res.cookie("token", token, {
//       expires: new Date(Date.now() + 8 * 3600000),
//     });

//     res.json({ message: "User Added successfully!", data: savedUser });
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// };


exports.SignupTheUser = async (req, res) => {
  try {
    // Destructure and validate input
    const { firstName, lastName, emailId, password, skills, gender, age, photoUrl, about } = req.body;

    if (!firstName || !emailId || !password) {
      return res.status(400).send("ERROR: First name, email, and password are required.");
    }

    console.log("Signup data received:", req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("ERROR: User with this email already exists.");
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

    res.status(201).json({ message: "User created successfully!", data: savedUser });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).send("ERROR: " + err.message);
  }
};


exports.loginTheUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).send("ERROR: Email and password are required.");
    }

    console.log("Login attempt:", { emailId, password });

    // Find the user by email
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("User not found for email:", emailId);
      return res.status(401).send("ERROR: Invalid email or password.");
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for email:", emailId);
      return res.status(401).send("ERROR: Invalid email or password.");
    }

    // Generate a token
    const token = await user.getJWT();
    console.log("JWT generated:", token);

    // Set the token in cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true, // Secure cookie
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("ERROR: " + err.message);
  }
};

exports.logout=  async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
 
  res.send("Logout Successful!!");
};


