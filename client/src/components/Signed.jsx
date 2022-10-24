import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";

const Signed = ({ username, room }) => {
  return (
    <header className="nav-main">
      <p className="nav-logo">Chat Rooms</p>
      <nav className="nav-control">
        <div className="nav-field">
          <FaUsers className="icon-nav-field" />
          <input
            className="nav-input"
            type="text"
            // onChange={(event) => setRoom(event.target.value)}
            value={`Room: ${room}`}
            disabled={true}
            placeholder="Room"
          />
        </div>
        <div className="nav-field">
          <FaUser className="icon-nav-field username-icon" />
          <input
            className="nav-input"
            type="text"
            // onChange={(event) => setUsername(event.target.value)}
            disabled={true}
            value={`Username: ${username}`}
            placeholder=" Username"
          />
        </div>
      </nav>
    </header>
  );
};

export default Signed;
