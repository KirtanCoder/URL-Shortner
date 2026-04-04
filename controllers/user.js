const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.redirect("/login");
  } catch (err) {
    console.log("Signup error:", err.message);
    return res.render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", {
        error: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("login", {
        error: "Invalid email or password",
      });
    }

    const token = setUser(user);

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.redirect("/");
  } catch (err) {
    console.log("Login error:", err.message);
    return res.render("login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};