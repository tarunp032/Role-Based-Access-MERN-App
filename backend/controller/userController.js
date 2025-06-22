const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "ptarunxyzabc";

// ✅ CREATE USER
exports.createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const alreadyEmail = await User.findOne({ email });
  if (alreadyEmail) {
    return res
      .status(400)
      .json({ message: "User email already exists. Please use another." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name,
    email,
    phone,
    password: hash,
    role,
  });

  await newUser.save();

  return res
    .status(200)
    .json({ message: "User created successfully", newUser });
};

// ✅ GET ALL USERS (for admin)
exports.userGet = async (req, res) => {
  const result = await User.find();
  return res.status(200).send(result);
};

// ✅ LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alreadyEmail = await User.findOne({ email });
    if (!alreadyEmail) {
      return res
        .status(400)
        .json({ message: "User does not exist. Please signup first." });
    }

    const isPasswordValid = await bcrypt.compare(password, alreadyEmail.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: alreadyEmail.email, id: alreadyEmail._id },
      secretKey
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      role: alreadyEmail.role,
      name: alreadyEmail.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};