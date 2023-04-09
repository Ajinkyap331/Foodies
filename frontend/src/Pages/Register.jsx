import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch, message } from "antd";
import { Input, Button } from "antd";

export const Register = () => {
  const navigate = useNavigate();

  const emailref = useRef("");
  const passwordref = useRef("");

  const addUser = async () => {
    console.log(emailref.current, passwordref.current);
    if (
      emailref.current === undefined ||
      passwordref.current === undefined ||
      emailref.current === "" ||
      passwordref.current === ""
    ) {
      message.error("Email and Password Cannot be Null");
      return;
    }
    const data = {
      email: emailref.current,
      password: passwordref.current,
      messid: "",
      messname: "",
      location: "",
      rating: 0.0,
      menu : []
    };

    const response = await axios.post(
      "http://localhost:9000/api/user/set",
      data
    );

    if (response.status === 200) {
      message.success("User Added SuccessFully, Login with Your Account !!!");
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-cyan-500 to-blue-800 flex-col justify-center items-center w-screen h-screen">
      <div className="flex bg-white justify-center rounded-lg flex-col w-3/12 h-3/5 text-center gap-10 border-2 border-slate-400">
        <p className="text-3xl">Register Page</p>
        <div className="flex flex-col gap-3">
          <section className="flex gap-10 justify-center items-center">
            <Input
              placeholder="Email"
              onChange={(event) => {
                emailref.current = event.target.value;
              }}
              className="w-2/3"
            />
          </section>
          <section className="flex gap-3 justify-center items-center">
            <Input
              placeholder="Password"
              onChange={(event) => {
                passwordref.current = event.target.value;
              }}
              className="w-2/3"
            />
          </section>
        </div>
        <section className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              addUser();
            }}
            className="w-2/3 rounded-xl"
          >
            Register
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="w-2/3 rounded-xl"
          >
            Login
          </Button>
        </section>
      </div>
    </div>
  );
};
