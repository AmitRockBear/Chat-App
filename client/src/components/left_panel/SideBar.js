import React from "react";
import Header from "./Header";
import ChatsList from "./ChatsList";
import Search from "./Search";

const SideBar = () => {
  return (
    <div>
      <Header />
      <Search />
      <ChatsList />
    </div>
  );
};

export default SideBar;
