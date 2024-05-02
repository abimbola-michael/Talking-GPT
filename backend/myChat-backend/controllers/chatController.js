const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatmodel")
//@desc Get all chats
//@route GET /api/chats
//@access public

const getChats =asyncHandler( async(req, res) =>{
   const chats = await Chat.find()
    res.status(200).json(chats)
})
//@desc Create new chats
//@route POST /api/chats
//@access public

const createChat = asyncHandler(async(req, res) =>{
    console.log("The request body is :", req.body)
   const {name, message} = req.body
    if(!name || !message ) {
        res.status(400)
        throw new Error ("All fields are mandatory")
    }
    const chat = await Chat.create({
        name,
        message,
    })
    res.status(201).json(chat)
})
//@desc Get  chat by Id
//@route GET /api/chats
//@access public

const getChat = asyncHandler(async(req, res) => {
    const chat = await Chat.findById(req.params.id)
    if (!chat){
        res.status(404)
        throw new Error ("Chat not found")
    }
    res.status(200).json(chat)
})
//@desc get previous chat by id
//@route GET /api/chats/:id
//@access public

const updateChat =  asyncHandler(async(req, res) => {
    const chat = await Chat.findById(req.params.id)
    if (!chat){
        res.status(404)
        throw new Error ("Chat not found")
    }
    const updatedChat = await Chat.findById(
        req.params.id,
        req.body,
        {new: true}
    )
    
    res.status(200).json(updatedChat)
})

//@desc Delete chat by id
//@route DELETE /api/chats/:id
//@access public

const deleteChat = asyncHandler(async(req, res) => {
    const chat = await Chat.findById(req.params.id)
    if (!chat){
        res.status(404)
        throw new Error ("Chat not found")
    }
    await Chat.remove()
    res.status(200).json(chat)
})


module.exports = {getChats, createChat,getChat, updateChat, deleteChat}