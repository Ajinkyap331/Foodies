import React, { useRef } from "react";
import axios from "axios";
import { Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";

export const AddMessInfo = () => {
  const { id } = useParams();
  console.log(id);
  const nameref = useRef();
  const locationref = useRef();
  const navigate = useNavigate();

  const addDataOfMess = async () => {
    const response = await axios.post("http://localhost:9000/api/mess/set", {
      messname: nameref.current,
      location: locationref.current,
      id: id,
    });
    if (response.status === 200) {
      message.success("Mess Added Succesfully !!!");
      navigate("/user", {
        state: {
          messname: nameref.current,
          location: locationref.current,
          id : id
        },
      });
    } else message.error("Error Encountered !!!");
  };

  return (
    <div>
      <div className="flex bg-gradient-to-r from-cyan-500 to-blue-800 flex-col justify-center items-center w-screen h-screen">
        <div className="flex bg-white justify-center rounded-lg flex-col w-3/12 h-3/5 text-center gap-10 border-2 border-slate-400">
          <p className="text-3xl">Add Mess Data</p>
          <div className="flex gap-3 flex-col">
            <section className="flex gap-8 justify-center items-center">
              <Input
                placeholder="Name"
                onChange={(event) => {
                  nameref.current = event.target.value;
                }}
                className="w-2/3"
              />
            </section>
            <section className="flex gap-3 justify-center items-center">
              <Input
                placeholder="Location"
                onChange={(event) => {
                  locationref.current = event.target.value;
                }}
                className="w-2/3"
              />
            </section>
          </div>

          <section className="flex gap-3 justify-center items-center">
            <Button onClick={() => addDataOfMess()}>Add Mess</Button>
          </section>
        </div>
      </div>
    </div>
  );
};
