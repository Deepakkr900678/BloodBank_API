const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const User = require("../models/receiver")

router.use(bodyParser.json())

//GET endpoint to get the list of all blood samples available in all hospitals (Public - Everyone can access)

router.get("/users", async (req, res) => {
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

//POST endpoint to add the blood sample info (Only accessible to respective hospital)

router.post("/users", async (req, res) => {
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

//PUT endpoint to update the respective blood info (Only accessible to respective hospital)

router.put("/users/:id", async (req, res) => {
    try{
        const users = await User.findOneAndUpdate({_id:req.params.id},req.body);
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

//DELETE endpoint to delete the respective blood info (Only accessible to respective hospital)

router.delete("/users/:id", async (req, res) => {
    try{
        const users = await User.deleteOne({_id:req.params.id});
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


router.get("*", (req, res) => {
    res.status(400).json({
        status:"Failed",
        message:"Invalid Request"
    })
})


module.exports = router;