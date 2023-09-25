import React, { useContext } from "react";
import { Context } from "../../App";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  msg: {
    width: "100%",
    display: "flex",
    flexGrow: 0,
    // flexDirection: "column",
    height: "auto",
    overflow: "hidden",
  },
  myBubble: {
    minHeight: "57px",

    flexGrow: 0,
    display: "flex",
    maxWidth: "50%",
    height: "auto",
    background: "#054740",
    borderRadius: "5px",
    margin: "10px 25px 3px auto",
    boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.2)",
  },
  otherBubble: {
    minHeight: "57px",
    flexGrow: 0,
    display: "flex",
    maxWidth: "50%",
    height: "auto",
    background: "#262d31",
    borderRadius: "5px",
    margin: "10px auto 3px 25px",
    boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.2)",
  },
  txt: {
    padding: "20px 0px 8px 0px",
    display: "flex",
    flexDirection: "column",
    selfAlign: "center",
    // width: "100%",
  },
  name: {
    fontWeight: "600",
    fontSize: "14px",
    display: "inline-table",
    padding: "0 0 0 15px",
    margin: "0 0 4px 0",
    color: "#3498db",
  },
  timestamp: {
    fontSize: "11px",
    padding: "0 5px 0 5px",
    // display: "table",
    float: "right",
    // position: "relative",
    textTransform: "uppercase",
    color: "#999",
    alignSelf: "flex-end",
    // marginBottom: "auto",
  },
  message: {
    fontSize: "14px",
    // fontWeight: "500",
    padding: "0 5px",
    // margin: "auto",
    color: "#FFF",
    // display: "table",
  },
  bubbleArrow: {
    position: "absolute",
    float: "left",
    left: "-11px",
    top: "0px",
    "& .alt": {
      bottom: "20px",
      left: "auto",
      right: "4px",
      float: "right",
    },
    "&:after": {
      content: "",
      position: "absolute",
      borderTop: "15px solid #ebebeb",
      borderLeft: "15px solid transparent",
      borderRadius: "4px 0 0 0px",
      width: 0,
      height: 0,
      //box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
      //looks like I can't give a shadow to the arrows
    },
    "& .alt:after": {
      borderTop: "15px solid #DCF8C6",
      transform: "scaleX(-1)",
    },
  },
}));

export default function ChatProfile(props) {
  const classes = useStyles();
  const { message } = props;
  const context = useContext(Context);
  const { user } = context.state;
  const timestamp = message.createdAt.split(".")[0].replace("T", " ");

  const bubbleClass =
    user._id === message.user_id ? classes.myBubble : classes.otherBubble;
  console.log(bubbleClass);
  return (
    <>
      <div className={classes.msg}>
        <div className={bubbleClass}>
          <div className={classes.txt}>
            {/* <span className={classes.name}>Mike</span>
            <span className={classes.timestamp}>10:20 pm</span> */}
            <span className={classes.message}>{message.text}</span>
            <span className={classes.timestamp}>{timestamp}</span>
          </div>
          <div className={classes.bubbleArrow}></div>
        </div>
      </div>{" "}
    </>
  );
}
