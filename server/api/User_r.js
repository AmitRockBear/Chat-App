const express = require("express")
const router = express.Router()
const { getUserById, getAllUsersButI } = require("../models/User")

router.get("/:id", (req, res) => {
  getUserById(req.params.id).then((user) => {
    res.json(user)
  })
})

router.get("/allusers/:id", (req, res) => {
  getAllUsersButI(req.params.id).then((users) => {
    res.json(users)
  })
})

module.exports = router
