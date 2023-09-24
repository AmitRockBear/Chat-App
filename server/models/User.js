const mongoose = require("mongoose");
const { use } = require("passport");

const user_schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    chats: {
      type: [mongoose.ObjectId],
      default: [],
    },
  },
  { _id: false }
);

const User = new mongoose.model("User", user_schema);

module.exports = {
  createUser: async (profile) => {
    try {
      const { sub, name, picture, email } = profile._json;
      const user = await new User({
        _id: sub,
        name: name,
        email: email,
        image_url: picture,
      }).save();
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  getAllUsersButI: async (id) => {
    try {
      const users = await User.find();
      // console.log(users);
      const filteredUsers = await users.filter((user) => user._id != id);
      return filteredUsers;
    } catch (error) {
      console.error(error);
    }
  },
  insertChatToUser: async (user_ids, chat_id) => {
    for (const id of user_ids) {
      let user = await User.findById(id);
      user.chats.push(chat_id);
      await user.save();
    }
  },
};
