import { useEffect, useState } from "react";
import socket from "../../socket";
import Button from "../../Shared/Components/FormElements/Button";
import "./initGame.css";

import React from "react";

export default function InitGame2({ setRoom, setOrientation, setPlayers }) {
  const [isWaiting, setIsWaiting] = useState("");

  useEffect(() => {
    socket.on("waitOver", (roomData) => {
      console.log("in wait over");
      setRoom(roomData.roomId);
      setIsWaiting(false);
    });
  }, []);

  useEffect(() => {
    socket.on("setOrientation", (orientation) => {
      console.log(orientation);
      setOrientation(orientation);
    });
  }, []);

  return (
    <div className="startgame-main">
      <div>
        <Button
          onClick={() => {
            socket.emit("searchGame");
            setIsWaiting(true);
          }}
          size={"big"}
        >
          {" "}
          Start Game
        </Button>
        {isWaiting && <h1> Searching... </h1>}
      </div>
    </div>
  );
}
