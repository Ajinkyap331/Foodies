import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import logo from "../Images/logo.png";

export const Home = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-800 h-screen w-screen">
      <div className="bg-white justify-center gap-8 w-3/12 h-3/5 rounded-xl text-center flex flex-col">
        <div className="flex justify-center ">
          <img src={logo} className="w-1/3"></img>
        </div>
        <div className="text-2xl">Welcome to Foodies</div>
        <Link to="/messes">
          <Button className="w-2/3">Browse Mess</Button>
        </Link>
        <Link to="/login">
          <Button className="w-2/3 ">Login For Owners</Button>
        </Link>
      </div>
    </div>
  );
};
