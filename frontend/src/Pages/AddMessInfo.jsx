import React, { useRef } from "react";
import axios from "axios";
import { Input, Button } from "antd";

export const AddMessInfo = () => {
  const nameref = useRef();
  const locationref = useRef();

  const addDataOfMess = () => {
    axios.post("http://localhost:9000/api/mess/set", {
      name: nameref.current,
      location: locationref.current,
      menu: [],
      rating: 0,
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="flex justify-center flex-col w-2/3 h-2/3 text-center gap-10 border-2 border-black">
          <p className="text-3xl">Add Mess Data</p>
          <section className="flex gap-8 justify-center items-center">
            <p>Name : </p>
            <Input
              onChange={(event) => {
                nameref.current = event.target.value;
              }}
              className="w-fit"
            />
          </section>
          <section className="flex gap-3 justify-center items-center">
            <p>Location : </p>
            <Input
              onChange={(event) => {
                locationref.current = event.target.value;
              }}
              className="w-fit"
            />
          </section>
          <section className="flex gap-3 justify-center items-center">
            <Button onClick={() => addDataOfMess()}>Add Mess</Button>
          </section>
        </div>
      </div>
    </div>
  );
};
