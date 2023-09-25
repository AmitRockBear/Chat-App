import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { UPDATE_SEARCH_PHRASE } from "../../Actions";
import { Context } from "../../App";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    height: "5vh",
    backgroundColor: "#131c21",
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderBottom: "thin solid #3b4042",
    // borderTop: "thin solid #3b4042",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    marginLeft: "auto",
    marginBottom: "0.6vh",
    height: "2vh",
    position: "absolute",
    pointerEvents: "none",
    alignSelf: "center",
    color: "#828689",
    zIndex: 100,
  },
  inputRoot: {
    color: "#848788",
    backgroundColor: "#323739",
    borderRadius: "18px",
    height: "3.5vh",
    margin: "auto",
    flexBasis: "95%",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    alignSelf: "center",
  },
}));

export const Search = () => {
  const classes = useStyles();
  const context = useContext(Context);

  const onChangeSearchPhrase = (e) => {
    context.dispatch({ type: UPDATE_SEARCH_PHRASE, payload: e.target.value });
  };

  const { searchPhrase } = context.state;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search chat"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={onChangeSearchPhrase}
        value={searchPhrase}
      />
    </div>
  );
};

export default Search;
