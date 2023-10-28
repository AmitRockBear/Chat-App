import { Container } from "@material-ui/core"
import "./App.css"
import SideBar from "./components/left_panel/SideBar"
import RightPanel from "./components/right_panel/RightPanel"
import { makeStyles } from "@material-ui/core/styles"
import React, { useReducer, useEffect } from "react"
import axios from "axios"
import GoogleButton from "react-google-button"
import reducer from "./Reducer"
import { USER_LOGIN } from "./Actions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "19px",
    marginBottom: "19px",
    height: "100%",
    // height: "calc(100% - 38px)",
  },
  sidebar: {
    flexGrow: 1,
    flexBasis: "34.8%",
    borderRight: "thin solid #3b4042",
  },
  content: { backgroundColor: "#212121", flexGrow: 1, flexBasis: "65%" },
  center: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}))

export const Context = React.createContext(null)

function App() {
  const classes = useStyles()

  const [state, dispatch] = useReducer(reducer, {
    user: null,
    contacts: [],
    isChats: true,
    rightPanelContact: {
      image_url: "",
      name: "",
    },
    rightPanelChat: {
      messages: [],
    },
    searchPhrase: "",
  })

  const getLoggedUserData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/logged/user`)
      .then((res) => {
        dispatch({ type: USER_LOGIN, payload: res.data.user })
      })

    setTimeout(getLoggedUserData, 10000)
  }

  useEffect(() => {
    getLoggedUserData()
  }, [])

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        {state.user ? (
          <Context.Provider value={{ state, dispatch }}>
            <div className={classes.sidebar}>
              <SideBar />
            </div>
            <div className={classes.content}>
              <RightPanel />
            </div>
          </Context.Provider>
        ) : (
          <a href={process.env.REACT_APP_SERVER_URL}>
            <GoogleButton className={classes.center} />
          </a>
        )}
      </div>
    </Container>
  )
}

export default App
