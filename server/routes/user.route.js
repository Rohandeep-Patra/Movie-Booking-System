const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//register a new user
router.post("/register", async (req, res) => {
  try {

    // check if user is already exists or not
    const userExists = await User.findOne({
        email: req.body.email
    })
    if(userExists){
        return res.send({
            success: false,
            message: "User already exists"
        })
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword


    //create a new user or save a user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
        success: true,
        message: "User registered successfully"
    })


  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//login a user
router.post("/login", async (req, res) => {
    try {
        //check if user exists
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user){
            return res.send({
                success: false,
                message: "User not found"
            })
        }

        //check if the password is correct or not
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.send({
                success: false,
                message: "Incorrect password"
            })
        }

        // create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY,{
            expiresIn: "7d"
        })



        res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        })

    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router