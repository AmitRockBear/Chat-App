import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import photo from "../../static/excalibear.png";
import Exit from "@material-ui/icons/ExitToApp";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";
import { Context } from "../../App";
import { LOGOUT, UPDATE_CONTACTS, CHANGE_ISCHATS } from "../../Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#2a2f32",
    padding: "5px 16px",
    height: "5vh",
    // "& > *": {
    //   margin: theme.spacing(1.5),
    // },
  },
  profileContainer: {
    flexGrow: 16,
    alignSelf: "center",
    height: "4vh",
    width: "4vh",
  },
  icons: {
    alignSelf: "center",
    color: "#828689",
    height: "3vh",

    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();

  const context = useContext(Context);

  const logoutButtonClick = () => {
    axios.get("/auth/logout").then((res) => {
      console.log(res.data);
      context.dispatch({ type: LOGOUT });
    });
  };

  const newChatClick = () => {
    axios.get(`/user/allusers/${context.state.user._id}`).then((res) => {
      console.log(res.data);
      context.dispatch({ type: UPDATE_CONTACTS, payload: res.data });
      context.dispatch({
        type: CHANGE_ISCHATS,
        payload: !context.state.isChats,
      });
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.profileContainer}>
        <Avatar alt="User Photo" src={context.state.user.image_url} />
      </div>
      <div className={classes.icons}>
        <ChatIcon
          onClick={newChatClick}
          titleAccess="New Chat"
          className={classes.icon}
        />
        <Exit
          titleAccess="Logout"
          className={classes.icon}
          onClick={logoutButtonClick}
        />
      </div>
    </div>
  );
}
