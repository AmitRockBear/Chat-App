import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import photo from "../../static/excalibear.png";
import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Send from "@material-ui/icons/Send";
import { Context } from "../../App";
import axios from "axios";
import { UPDATE_CHAT } from "../../Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#2a2f32",
    // padding: "5px 16px",
    height: "6.6vh",
    // "& > *": {
    //   margin: theme.spacing(1.5),
    // },
  },
  inputRoot: {
    color: "#848788",
    backgroundColor: "#33383b",
    borderRadius: "18px",
    height: "auto",
    margin: "auto",
    flexBasis: "90%",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    alignSelf: "center",
  },
  sendIcon: {
    flexBasis: "8%",
    alignSelf: "center",
  },
}));

export default function TextInput() {
  const classes = useStyles();

  const context = useContext(Context);
  const { rightPanelChat, user } = context.state;
  const [msgInput, setMsgInput] = useState("");

  const onChangeInput = (e) => {
    console.log(msgInput);
    setMsgInput(e.target.value);
  };
  console.log(rightPanelChat);

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    if (msgInput.length > 0) {
      let res = await axios.post(
        `/chat/${user._id}/${rightPanelChat._id}/appendMsg`,
        { message: msgInput }
      );
      setMsgInput("");
      context.dispatch({ type: UPDATE_CHAT, payload: { chat: res.data } });
    }
  };

  return (
    <form onSubmit={onSubmitMessage} className={classes.root}>
      <InputBase
        placeholder="Type a message"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={msgInput}
        onChange={onChangeInput}
      />
      <Send
        className={classes.sendIcon}
        style={{ color: "#787c7f", fontSize: "25px" }}
        onClick={onSubmitMessage}
      />
    </form>
  );
}
