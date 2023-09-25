const express = require("express");
const { appendMessage, insertChat, getChatById } = require("../models/Chat");
const router = express.Router();

router.post("/create/:id", (req, res) => {
  insertChat(req.params.id, req.body).then((user) => {
    console.log(user);
    res.json(user);
  });
});

router.get("/:id", (req, res) => {
  getChatById(req.params.id).then((chat) => {
    console.log(chat);
    res.json(chat);
  });
});

router.post("/:userId/:chatId/appendMsg", (req, res) => {
  appendMessage(req.params.userId, req.params.chatId, req.body.message).then(
    (updatedChat) => {
      console.log(updatedChat);
      res.json(updatedChat);
    }
  );
});

module.exports = router;
