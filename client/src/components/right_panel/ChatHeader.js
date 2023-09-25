import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import photo from "../../static/excalibear.png";
import { Typography } from "@material-ui/core";

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
  profile: {
    alignSelf: "center",
    height: "4vh",
    width: "4vh",
    backgroundColor: "#000",
  },
  primary: {
    alignSelf: "center",
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: "16px",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { contact } = props;
  return (
    <div className={classes.root}>
      <Avatar
        className={classes.profile}
        alt="User Photo"
        src={contact.image_url}
      />
      <Typography className={classes.primary}>{contact.name}</Typography>
    </div>
  );
}
