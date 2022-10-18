import io from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import HelloUser from "./components/HelloUser";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room States
  const [room, setRoom] = useState("");

  // Chat State
  const [chat, setChat] = [];

  // Username State
  const [username, setUsername] = useState("");

  //Messages States
  const [message, setMessage] = useState({ username: "", message: "" });
  const [messageReceived, setMessageReceived] = useState(" ");

  const handleRoomAndUser = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const finalData = Object.fromEntries(formData)
    
    setUsername(finalData.username)
    console.log(finalData)

  }

  //Function for onChange Message
  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const addUserAndJoinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="text-light" href="#home">
            Chat Rooms
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end">
            <Form className="d-flex" onSubmit={handleRoomAndUser}>
            <Nav.Link href="#home" className="text-light">
              Room:
            </Nav.Link>
            <Form.Control name="room" type="text" onChange={(event) => { setRoom(event.target.value); }} placeholder="Ex: 5..."/>
            <Nav.Link href="#home" className="text-light">
              Username:
            </Nav.Link>
            <Form.Control type="text" name="username" placeholder="Ex: NoobMaster69..."/>
            <Button className="ms-2" variant="light" type="submit">Join</Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
      
      {username ? <HelloUser username={username} room={room}/> : <></>}
      
      {/* 
      <input
        placeholder="Message..."
        type="text"
        onChange={handleInput}
        value={message.message}
      />
      <button onClick={sendMessage}>Send Messagem</button>

      <h1>Message</h1>
      {messageReceived} */}
    </>
  );
}

export default App;
