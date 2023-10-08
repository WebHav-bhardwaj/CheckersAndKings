import { Container } from "@mui/material";
import Games from "../Components/Games";

import { useEffect, useState, useCallback, useContext } from "react";
import socket from "../../socket";

import InitGame from "../Components/InitGame";

import { AuthContext } from "../../Shared/Context/auth-context";

export default function Game() {

  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");

  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [players, setPlayers] = useState([]);

  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers("");
  }, []);

  useEffect(() => {
    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData);
      setPlayers(roomData.players);
    });
  }, []);

  useEffect(() => {
    console.log(auth.user.email);
    setUsername(auth.user?.name);
    socket.emit("username", username, auth.user?.userId);
  }, [username, auth.user.email]);

  return (
    <Container>
      {room ? (
        <Games
          room={room}
          orientation={orientation}
          username={username}
          players={players}
          cleanup={cleanup}
        />
      ) : (
        <InitGame
          setRoom={setRoom}
          setOrientation={setOrientation}
          setPlayers={setPlayers}
        />
      )}
    </Container>
  );
}
