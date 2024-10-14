const User = require("../../models/userModel");
const jwt = require("../../utils/jwt");
const AppError = require("../../utils/appError");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("===,: ", email, password);

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.generateToken(user._id);
    const user2 = await User.findOne({ email });

    return res.json({ token, user: user2 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "email and password must have provided!",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const hashedPassword2 = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword2;
      await existingUser.save();

      return res.status(201).json({
        message: "User password changed successfully.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginOrRegister = async (req, res, next) => {
  const { phoneNumber, spinChance } = req.body;
  const spin = spinChance || 0;
  if (!phoneNumber) {
    return next(new AppError("Phone number and spin chance are required", 400));
  }

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        spinChance: spin,
        prizeChance: 0,
      });

      console.log("User created:", user);
    }

    const token = jwt.generateToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error during login/registration:", error);
    return next(new AppError("Internal server error", 500));
  }
};
