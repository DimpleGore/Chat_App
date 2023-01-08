const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/createchat",protect , accessChat);
router.get("/fetchchat",protect,fetchChats)
router.post("/group",protect,createGroupChat)
router.post("/rename",protect,renameGroup)
router.post("/groupadd", protect,addToGroup)
router.post("/groupremove", protect,removeFromGroup)

module.exports= router