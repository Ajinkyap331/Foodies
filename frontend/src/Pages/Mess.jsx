import React, { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import axios from "axios";
import { Button, Spin, message, Modal, Input, Switch } from "antd";

export const Mess = () => {
  const [messes, setm] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [rid, setrid] = useState("");
  const [menu , setmenu] = useState(false)

  const showModal2 = (m) => {
    setmenu(m);
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setrid("");
  };

  const getMessData = async () => {
    await axios
      .get("http://localhost:9000/api/user/getall")
      .then((data) => {
        setm(data.data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    getMessData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-800 h-screen w-screen">
      <div className="flex flex-wrap">
        {messes ? (
          messes.map((e) => {
            return (
              <Card
                style={{ width: "300px" }}
                title={"Name : " + e.messname}
                bordered={true}
                className="h-1/5 m-5"
              >
                <p className="mb-5">Location : {e.location}</p>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => showModal2(e.menu)}>Check Menu</Button>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="h-screen w-screen flex justify-center items-center">
            <Spin tip="Loading" className="bg-white p-5 rounded-xl" />
          </div>
        )}
        <Modal
          title="Check Menu"
          open={isModalOpen2}
          onCancel={handleCancel2}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                handleCancel2();
              }}
            >
              OK
            </Button>,
          ]}
        >
          {menu ? (
            menu.map((e) => {
              if (e.available)
                return (
                  <div className="m-5">
                    <div>Name : {e.name}</div>
                    <div>Price : {e.price}</div>
                  </div>
                );
            })
          ) : (
            <>Loading</>
          )}
        </Modal>
      </div>
    </div>
  );
};
