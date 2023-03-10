const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User aleady exists");
    }
    const passwordHash = await bcrypt.hash(password,10);
    const user = await User.create({
        name, email, password: passwordHash , pic
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed to create the user")
    }
})

const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        res.status(401);
        throw new Error("Invalid Email")
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        res.status(401);
        throw new Error("Incorrect Password");
    }
     
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id)
    })

})

const allUsers = asyncHandler( async(req, res) => {
    const keyword = req.query.search ? 
        {
            $or : [
                {name: {
                    $regex: req.query.search, $options: "i"
                }},
                {email: {
                    $regex: req.query.search, $options: "i"
                }}
                
            ]
        } : {};
    
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}})

    return res.status(200).json({message: "Users fetched successfully",users})
})



module.exports = {registerUser, authUser, allUsers};