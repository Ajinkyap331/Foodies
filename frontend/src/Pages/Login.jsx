import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();

  const checkLogin = async () => {
    const data = {
      email: emailref.current,
      password: passwordref.current,
    };

    const response = await axios.post(
      "http://localhost:9000/api/user/get",
      data
    );

    // console.log(response.data[0].messid === "");
    if (response.status === 200) {
      if (response.data.length === 0) {
        message.error("Invalid User Or Password");
      } else {
        message.success("Login Successfull !!!");
        if (response.data[0].messid === "")
          navigate("/addmessinfo/" + response.data[0]._id);
        else
          navigate("/user", {
            state: {
              messname: response.data[0].messname,
              location: response.data[0].location,
              id : response.data[0]._id
            },
          });
      }
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-cyan-500 to-blue-800 flex-col justify-center items-center w-screen h-screen">
      <div className="flex shadow-md bg-white justify-center rounded-lg flex-col w-3/12 h-3/5 text-center gap-10">
        <p className="text-3xl">Login Page</p>
        <div className="flex flex-col gap-3">
          <section className="">
            <Input
              onChange={(event) => {
                emailref.current = event.target.value;
              }}
              className="w-3/4"
              placeholder="Email"
            />
          </section>
          <section className="flex gap-3 justify-center items-center">
            <Input.Password
              onChange={(event) => {
                passwordref.current = event.target.value;
              }}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className="w-3/4"
            />
          </section>
        </div>

        <section className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              checkLogin();
            }}
            className="w-3/4 rounded-xl "
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="w-3/4 rounded-xl"
          >
            Register
          </Button>
        </section>
      </div>
    </div>
  );
};
