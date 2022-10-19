import io from "socket.io-client";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import UserControl from "./components/UserControl";
import ChatMessage from "./components/ChatMessage";

const socket = io.connect("http://localhost:3001");

function App() {

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  
  const handleRoomAndUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const finalData = Object.fromEntries(formData)
    setUsername(finalData.username)
    if (username !== "" && room !== "") {
      socket.emit("join_room", finalData.room);
    }
  }

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
      <Container fluid className="d-flex flex-column align-items-center mt-5 justify-content-center">
      {username ? <UserControl username={username} room={room}/> : <></>}
      <ChatMessage socket={socket} username={username} room={room}/>
      </Container>

    </>
  );
}

export default App;
