import io from "socket.io-client";
import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import UserControl from "./components/UserControl";
import { FaUsers } from "react-icons/fa";
import "./App.css";

const socket = io.connect("http://192.168.1.60:3001");

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
      <header className="nav-main">
        <p className="nav-logo">Chat Rooms</p>
        <nav className="nav-control">
          <div className="nav-field">
          <FaUsers className="icon-nav-field" />
            <input
              className="nav-input"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
              placeholder="Room"
            />
          </div>
          <div className="nav-field">
          <FaUsers className="icon-nav-field" />
            <input
              className="nav-input"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              placeholder=" Username"
            />
          </div>
          <button
            className="button-nav"
            variant="light"
            onClick={joinRoomAndAddUsername}
          >
            Join
          </button>
        </nav>
      </header>


      {showChat ? (
        <>
          <ChatMessage socket={socket} username={username} room={room} />
          <UserControl username={username} room={room} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
