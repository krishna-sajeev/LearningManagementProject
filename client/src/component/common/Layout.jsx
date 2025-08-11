import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ role, children }) => {
  return (
    <Sidebar role={role}>
      {children}
    </Sidebar>
  );
};

export default Layout;
