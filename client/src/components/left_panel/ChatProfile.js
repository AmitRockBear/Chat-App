import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#131c21",
    width: "100%",
    color: "#FFF",
    borderBottom: "thin solid #3b4042",
    // borderTop: "thin solid #3b4042",
    "&:hover": {
      backgroundColor: "#323739",
    },
  },
  inline: {
    display: "inline",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    justifySelf: "center",
  },
  secondaryText: {
    color: "#828689",
  },
  // divider: {
  //   border: "1px solid #3b4042",
  //   flexBasis: "100%",
  // },
}));

export default function ChatProfile(props) {
  const classes = useStyles();

  const { contact } = props;
  return (
    <>
      <ListItem className={classes.root} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Profile"
            src={contact.image_url}
            className={classes.large}
          />
        </ListItemAvatar>
        <ListItemText
          primary={contact.name}
          // className={classes}
          secondary={
            <span className={classes.secondaryText}>
              <React.Fragment>
                {"I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            </span>
          }
        />
      </ListItem>
      {/* <span className={classes.divider}></span> */}
    </>
  );
}
