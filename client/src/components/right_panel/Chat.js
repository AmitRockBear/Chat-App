import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ChatBubble from "./ChatBubble";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#131c21",
    flexDirection: "column",
    margin: "5px 0 0 0",
  },
  list: {
    height: "80vh",
    width: "100%",
    display: "block",
    overflow: "auto",
  },
}));

export default function Chat(props) {
  const classes = useStyles();
  const { chat } = props;
  return (
    <div className={classes.root}>
      {/* <Container> */}
      <List className={classes.list}>
        {chat.messages.map((message) => (
          <ChatBubble key={message.createdAt} message={message} />
        ))}
      </List>
      {/* </Container> */}
    </div>
  );
}
