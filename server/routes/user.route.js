import { Router } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const router = Router();

// register a new user
router.post("/register", async (req, res) => {
  try {
    // check if user is already exists or not
    const userExists = await User.findOne({
      email: req.body.email,
    });

    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists !!",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create a new User
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;
