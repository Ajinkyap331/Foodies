import { Button, Input, Modal, Switch, Card } from "antd";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const User = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState(false);
  const [edit, setedit] = useState(false);

  const nameref = useRef();
  const priceref = useRef();
  const availableref = useRef(true);

  const AddMenu = async () => {
    if (
      nameref.current === undefined ||
      nameref.current === "" ||
      priceref.current === undefined ||
      priceref.current === ""
    )
      return;
    const data = {
      name: nameref.current,
      price: priceref.current,
      available: availableref.current,
      id: location.state.id,
    };

    console.log(data);
    await axios.post("http://localhost:9000/api/mess/addmenu", data);
    getDataFromDB();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    AddMenu();
    setIsModalOpen(false);
  };
  const handleOk1 = (id) => {
    EditDatafromDB(id);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDataFromDB = async () => {
    const response = await axios.post("http://localhost:9000/api/user/get", {
      _id: location.state.id,
    });

    setdata(response);
  };

  const EditDatafromDB = async (id) => {
    const Data = {
      id: data.data[0]._id,
      _id: id,
      name: nameref.current,
      price: priceref.current,
      available: availableref.current,
    };

    console.log(Data);
    const response = await axios.post(
      "http://localhost:9000/api/mess/updatemenu",
      Data
    );

    getDataFromDB();
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <div>
      <div className="flex pt-5 items-center bg-gradient-to-r from-cyan-500 to-blue-800 flex-col h-screen">
        <div className="flex py-10 bg-white justify-center rounded-lg flex-col w-11/12 text-center gap-5 border-2 border-slate-400">
          <p className="text-3xl">Hotel Admin Page</p>
          <p className="text-xl">Name : {location.state.messname}</p>
          <p className="text-xl">Location : {location.state.location}</p>
          <section className="flex gap-10 w-full justify-center">
            <Button
              onClick={() => {
                setedit(false);
                showModal();
              }}
            >
              Add Menu
            </Button>
            <Link to={`/addmessinfo/${location.state.id}`}>
              <Button>Edit Mess</Button>
            </Link>
          </section>
        </div>
        <Modal
          title="Add Menu"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            edit ? (
              <>
                <Button
                  key="submit"
                  onClick={() => {
                    handleOk1(edit);
                  }}
                >
                  Edit Menu
                </Button>
              </>
            ) : (
              <>
                <Button
                  key="submit"
                  onClick={() => {
                    handleOk();
                  }}
                >
                  Add Menu
                </Button>
              </>
            ),
          ]}
        >
          <p className="p-3">
            <Input
              onChange={(event) => (nameref.current = event.target.value)}
              placeholder="Item Name"
            />
          </p>
          <p className="p-3">
            <Input
              onChange={(event) => (priceref.current = event.target.value)}
              placeholder="Item Price"
            />
          </p>
          <p className="p-3">
            Available :{" "}
            <Switch
              onChange={(e) => (availableref.current = e)}
              defaultChecked
            />
          </p>
        </Modal>
        <div className="m-5 flex flex-wrap items-start gap-3 w-11/12 h-3/5 overflow-auto">
          {data && (
            <>
              {data.data[0].menu.map((e) => {
                return (
                  <Card
                    title={e.name}
                    bordered={false}
                    style={{
                      width: 300,
                    }}
                  >
                    <div className="flex flex-col gap-3">
                      <p>Price : {e.price}</p>
                      <p>Available : {e.available ? "True" : "False"}</p>
                      <Button
                        onClick={() => {
                          setedit(e._id);
                          showModal();
                          nameref.current = e.name;
                          priceref.current = e.price;
                          availableref.current = e.available;
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
