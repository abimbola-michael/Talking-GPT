const express = require("express");
const router = express.Router();
const {
    getChat,
    getChats,
    createChat,
    updateChat,
    deleteChat
    } = require("../controllers/chatController")

router.route("/").get(getChats)
    
    
router.route("/").post(createChat)

router.route("/:id").get(getChat)


router.route("/:id").put(updateChat)

router.route("/:id").delete(deleteChat)

module.exports = router