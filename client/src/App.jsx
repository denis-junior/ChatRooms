import io from "socket.io-client";
import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import "./App.css";
import SingIn from "./components/SingIn";
import Signed from "./components/Signed";

// const socket = io.connect("http://18.228.7.126:3001");
// const socket = io.connect("https://chat-room-server.vercel.app");
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoomAndAddUsername = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="main-app">
      {showChat ? (
        <>
          <Signed room={room} username={username}/>
          <ChatMessage socket={socket} username={username} room={room} />
        </>
      ) : (
        <SingIn setRoom={setRoom} setUsername={setUsername} joinRoomAndAddUsername={joinRoomAndAddUsername}/>
      )}
    </div>
  );
}

export default App;
