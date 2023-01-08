const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

//create or fetch one to one chat
const accessChat = asyncHandler( async (req,res) => {
    const {userId} = req.body;

    if(!userId){
        return res.status(400).json({message: "UserId param not sent with request"})
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage");
    console.log(isChat)

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    console.log(isChat)

    if(isChat.length>0){
        return res.status(200).json({message: "Chat fetch successfully", chat:isChat[0]});
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try{
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            )

            return res.status(200).json({message: "Chat created successfully",chat: FullChat})

        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }
})

const fetchChats = asyncHandler( async (req,res) => {
    try{
        console.log(req.user._id)
       Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
       .populate("users","-password")
       .populate("groupAdmin","-password")
       .populate("latestMessage")
       .sort({updatedAt: -1})
       .then(async (results)=> {
        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email"
        })
        return res.status(200).json({message: "Chats fetched successfully",results})
       })
        
    }catch(error){
        return res.status(400).json({message: error.message})
    }
})

const createGroupChat = asyncHandler( async(req,res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).json({message: "Please Fill all the fields"})
    }

    var users = JSON.parse(req.body.users);

    if(users.length<2){
        return res.status(400).json({message: "More than 2 users are required to form a group chat"})
    }

    users.push(req.user);
    //console.log(req.user)

    try{

       const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id
        })

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
          .populate("users","-password")
          .populate("groupAdmin","-password")

        return res.status(200).json({message:"Group chat created successfully",fullGroupChat})

    }catch(error){
        return res.status(400).json({message: error.message})
    }
})

const renameGroup = asyncHandler(async (req,res) => {
    const {chatId, chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new: true
        }
    ).populate("users", "-password")
    .populate("groupAdmin","-password")

    if(!updatedChat){
        return res.status(404).json({message: "Chat Not Found"})
    }else{
        return res.status(200).json({message: "Group Chat Updated Successfully",updatedChat})
    }
})

const addToGroup = asyncHandler( async(req,res) => {
    const {chatId, userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {users: userId}
        },
        {
            new: true
        }
    ).populate("users", "-password")
    .populate("groupAdmin","-password")

    if(!added){
        return res.status(404).json({message: "Chat Not Found"})
    }else{
        return res.status(200).json({message: "User Updated Successfully",added})
    }
})

const removeFromGroup = asyncHandler( async(req,res) => {
    const {chatId, userId} = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users: userId}
        },
        {
            new: true
        }
    ).populate("users", "-password")
    .populate("groupAdmin","-password")

    if(!removed){
        return res.status(404).json({message: "Chat Not Found"})
    }else{
        return res.status(200).json({message: "User Updated Successfully",removed})
    }
})




module.exports= {accessChat, fetchChats, createGroupChat,renameGroup, addToGroup, removeFromGroup}