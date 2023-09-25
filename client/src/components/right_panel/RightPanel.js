import React, { useContext } from "react";
import ChatHeader from "./ChatHeader";
import Chat from "./Chat";
import TextInput from "./TextInput";
import { Context } from "../../App";

const SideBar = () => {
  const context = useContext(Context);
  const { rightPanelContact, rightPanelChat } = context.state;
  return (
    <div>
      <ChatHeader contact={rightPanelContact} />
      <Chat chat={rightPanelChat} />
      <TextInput />
    </div>
  );
};

export default SideBar;
