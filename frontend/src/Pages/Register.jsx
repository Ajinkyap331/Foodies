import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Switch } from "antd";
import { Input, Button } from "antd";

export const Register = () => {
  const navigate = useNavigate();

  const emailref = useRef();
  const passwordref = useRef();
  const ownerref = useRef(true);

  const addUser = async () => {
    const data = {
      email: emailref.current,
      password: passwordref.current,
      mess: "",
      owner: ownerref.current,
    };

    const response = await axios.post(
      "http://localhost:9000/api/user/set",
      data
    );
    console.log(response);
  };

  return (
    <div className="flex bg-gradient-to-r from-cyan-500 to-blue-800 flex-col justify-center items-center w-screen h-screen">
      <div className="flex bg-white justify-center rounded-lg flex-col w-3/12 h-3/5 text-center gap-10 border-2 border-slate-400">
        <p className="text-3xl">Register Page</p>
        <section className="flex gap-10 justify-center items-center">
          <p>Email : </p>
          <Input
            onChange={(event) => {
              emailref.current = event.target.value;
            }}
            className="w-fit"
          />
        </section>
        <section className="flex gap-3 justify-center items-center">
          <p>Password : </p>
          <Input
            onChange={(event) => {
              passwordref.current = event.target.value;
            }}
            className="w-fit"
          />
        </section>
        <section className="flex gap-3 justify-center items-center">
          <p>Owner of a Mess ? </p>
          <Switch
            className="bg-black "
            defaultChecked
            onChange={() => {
              ownerref.current = !ownerref.current;
            }}
          />
        </section>
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
