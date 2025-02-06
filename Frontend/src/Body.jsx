import React from "react";
import Nabvar from "./Nabvar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Body() {
  return (
    <div>
      <Nabvar />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Body;
