const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const Message = require("../Models/messageModel");
const Chat = require("../Models/chatModel");



const sendMessage = asyncHandler(async(req,res) => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({message: "Missing required parameters"});l
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try{
      var message = await Message.create(newMessage);

      message = await message.populate("sender","name pic")

      message = await message.populate("chat");

      message = await User.populate(
        message,{
           path: "chat.users",
           select: "name pic email" 
        }
      )

      await Chat.findByIdAndUpdate(req.body.chatId,
        {latestMessage: message}
        )

     return res.status(200).json(message);

    }catch(error){
        return res.status(400).json({message: error.message})
    }
})

const allMessages = asyncHandler(async(req,res) => {
    try{
        const messages = await Message.find({
            chat: req.params.chatId
        }).populate("sender","name pic email")
        .populate("chat");
        return res.status(200).json(messages);
    }catch(error){
        return res.status(400).json({message: error.message})
    }
})

module.exports = {sendMessage, allMessages}