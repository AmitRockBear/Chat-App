const mongoose = require("mongoose");
const { getUserById, insertChatToUser } = require("./User");

const chat_schema = new mongoose.Schema({
  messages: {
    type: [
      new mongoose.Schema(
        {
          text: {
            type: String,
            required: true,
          },
          user_id: {
            type: String,
            required: true,
          },
        },
        {
          timestamps: true,
        }
      ),
    ],
    default: [],
  },
  users: {
    type: [String],
    required: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
});

const Chat = new mongoose.model("Chat", chat_schema);

const createChat = async (users_list) => {
  try {
    const chat = await new Chat({
      users: users_list,
    }).save();
    return chat;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  appendMessage: async (userId, chatId, msgText) => {
    try {
      const chat = await Chat.findById(chatId);
      chat.messages.push({ text: msgText, user_id: userId });
      await chat.save();
      return chat;
    } catch (error) {
      console.error(error);
    }
  },
  insertUserId: async (id, user) => {
    try {
      const chat = await Chat.findById(id);
      chat.users.push(user._id);
      await chat.save();
      return chat;
    } catch (error) {
      console.error(error);
    }
  },
  updateChatName: async (id, name) => {
    try {
      const chat = await Chat.update({ _id: id }, { name: name });
      return chat;
    } catch (error) {
      console.error(error);
    }
  },
  insertChat: async (id, contact) => {
    try {
      let user = await getUserById(id);
      let { chats } = user;
      for (const chat_id of chats) {
        let chat = await Chat.findById(chat_id);
        if (chat) {
          if (chat.isGroup === false)
            for (const user_id of chat.users) {
              if (contact._id === user_id) {
                return user;
              }
            }
        }
      }
      console.log("entered else");
      let chat = await createChat([id, contact._id]);

      await insertChatToUser([id, contact._id], chat._id);
      let connected_user = await getUserById(id);

      return connected_user;
    } catch (error) {
      console.error(error);
    }
  },
  getChatById: async (id) => {
    try {
      const chat = await Chat.findById(id);
      return chat;
    } catch (error) {
      console.error(error);
    }
  },
};
