import React, { useState, useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ChatProfile from "./ChatProfile"
import { Context } from "../../App"
import axios from "axios"
import {
  CHANGE_ISCHATS,
  CREATE_CHAT,
  UPDATE_CONTACTS,
  USER_LOGIN,
  UPDATE_RIGHT_PANEL,
} from "../../Actions"

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    backgroundColor: "#131c21",
  },
  List: {
    height: "84vh",
    overflow: "auto",
    width: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  listItem: {
    cursor: "pointer",
  },
}))

export default function ChatsList() {
  const classes = useStyles()

  const context = useContext(Context)

  const { contacts, user, isChats, searchPhrase } = context.state

  const [chatProfiles, setChatProfiles] = useState([])

  const createChat = (contact) => () => {
    axios
      .post(`/chat/create/${context.state.user._id}`, contact)
      .then((res) => {
        context.dispatch({ type: USER_LOGIN, payload: res.data })
        context.dispatch({ type: CHANGE_ISCHATS, payload: !isChats })
      })
  }

  const getUserById = async (user_id) => {
    let res = await axios.get(`/user/${user_id}`)
    return res.data
  }

  const getChatById = async (chat_id) => {
    let res = await axios.get(`/chat/${chat_id}`)
    return res.data
  }

  const getContactFromChatId = async (chat_id) => {
    let chat = await getChatById(chat_id)
    let contact_id = await chat.users.filter((user_id) => user_id != user._id)
    let contact = await getUserById(contact_id)
    return contact
  }

  const pushUsersFromChatsToContext = () => {
    let users = []
    let forEachLoopFinishedCounter = 0
    user.chats.forEach((chat_id) => {
      getContactFromChatId(chat_id).then((contact) => {
        contact.sharedChatIdWithCurrentUser = chat_id
        users.push(contact)
        forEachLoopFinishedCounter++
        if (forEachLoopFinishedCounter === user.chats.length) {
          setChatProfiles(users)
        }
      })
    })
  }

  const updateRightPanel = (contact) => async () => {
    let sharedChat = await getChatById(contact.sharedChatIdWithCurrentUser)
    context.dispatch({
      type: UPDATE_RIGHT_PANEL,
      payload: { chat: sharedChat, contact: contact },
    })
  }

  useEffect(() => {
    pushUsersFromChatsToContext()
  }, [])

  return (
    <div className={classes.root}>
      <List disablePadding={true} className={classes.List}>
        {isChats & (chatProfiles.length > 0)
          ? chatProfiles.map(
              (c) =>
                c.name.includes(searchPhrase) && (
                  <div
                    className={classes.listItem}
                    onClick={updateRightPanel(c)}
                  >
                    <ChatProfile contact={c} />
                  </div>
                )
            )
          : contacts.map(
              (c) =>
                c.name.includes(searchPhrase) && (
                  <div className={classes.listItem} onClick={createChat(c)}>
                    <ChatProfile key={c._id} contact={c} />
                  </div>
                )
            )}
      </List>
    </div>
  )
}
