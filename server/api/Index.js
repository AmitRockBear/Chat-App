const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const passportSetup = require("./auth/passport-setup")
const passport = require("passport")
const cookieSession = require("cookie-session")
const user = require("./routes/User_r")
const auth = require("./routes/Auth_r")
const chat = require("./routes/Chat_r")
const app = express()

dotenv.config()

app.use(express.json())
app.use(cors())

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
)

app.use(passport.initialize())
app.use(passport.session())
passportSetup(passport)

const uri = process.env.MONGO_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected To DB"))
  .catch((err) => {
    throw err
  })

// Configuring routes
app.use("/auth", auth)
app.use("/user", user)
app.use("/chat", chat)

// app.listen(process.env.PORT, () =>
//   console.log(`Listenning to port ${process.env.PORT}`)
// )

module.exports = app
