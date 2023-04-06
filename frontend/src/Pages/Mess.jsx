import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import { Button } from "antd";

export const Mess = () => {
  const [messes, setm] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/api/mess/getall").then((data) => {
      setm(data.data);
    });
  }, []);

  return (
    <div className="flex gap-3 p-10">
      {messes.map((e) => {
        {
          /* console.log(e.name) */
        }
        return (
          <Card
            // className="bg-slate-00"
            title={e.name}
            bordered={true}
            style={{
              width: 300,
            }}
          >
            <p>Location : {e.location}</p>
            <Button>Add Menu</Button>
          </Card>
        );
      })}
    </div>
  );
};
