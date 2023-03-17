const express = require("express");
const router = express.Router();
const User = require("../models/receiver")

//GET endpoint to get all the blood info that the hospital uploaded (Only accessible to respective hospital)

router.get("/posts", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status:"Success",
            data: users
        })
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

//POST Endpoint to request a blood sample (Only accessible to receiver)

router.post("/posts", async (req, res) => {
    try{
        const users = await User.create({
            name:req.body.name,
            email:req.body.email,
            blood:req.body.blood
        });
        res.status(200).json({
            status:"Success",
            users
        })
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

//GET endpoint to get the list of all receivers who have requested a particular blood group from its blood bank (Only accessible to respective hospital)

router.get("/posts", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status:"Success",
            data: users
        })
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports = router;
