const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const User = require("../models/receiver")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "RESTAPI";

const { body, validationResult } = require('express-validator');
router.use(bodyParser.json())

//Register

router.post("/register", body('email').isEmail(), body("name").isAlpha(),
    body('password').isLength({ min: 6, max: 16 }), async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Email already exists"
                });
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: err.message
                    });
                }
                const user = await User.create({
                    name,
                    email,
                    password: hash
                })
                return res.json({
                    status: "Success",
                    user
                })
            });
        } catch (e) {
            res.status(500).json({
                status: "failed",
                message: e.message
            })
        }
    })

//Login   

router.post("/login", body('email').isEmail(), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "User does not exist"
            });
        }

//Comparing Password

        bcrypt.compare(password, user.password, function (err, result) {
            if(err){
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                });
            }
            if(result){

                //token will be used to track the user for further operation

               const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);

                return res.status(200).json({
                    status: "Success",
                    message: "Login Successful",
                    token
                });
            }else{
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid Credential !! Please provide correct email/password"
                });
            }
        });

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }

})

module.exports = router;