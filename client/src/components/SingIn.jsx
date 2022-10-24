import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";

const SingIn = ({ setRoom, setUsername, joinRoomAndAddUsername }) => {
  return (
    <div className="main-app-signed-in">
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
            <FaUser className="icon-nav-field username-icon" />
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
      <main className="sign-in-welcome">
        <div className="box-information">
          <h3>
            Welcome to chat rooms, here you can chat with your friends without
            login and history, all your messages will be deleted when you leave.
          </h3>
        </div>
      </main>
    </div>
  );
};

export default SingIn;
