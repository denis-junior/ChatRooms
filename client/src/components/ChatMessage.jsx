import React, { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const ChatMessage = ({socket, username, room}) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {

    if(currentMessage !== ""){
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
      }
      await socket.emit("send_message", messageData);

    }
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessageList((list) => [...list, data]);
      console.log(data)
    });
  }, [socket]);

  return (
    <Card className="mt-3" style={{ width: "40rem" }}>
      <Card.Header as="h4" className="text-center">
        Chat
      </Card.Header>
      {/* <ListGroup variant="flush" className="p-4">
        <div>
          <div className="btn btn-outline-success">
            <p className="text-start">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div className="text-end">
          <div className="btn btn-outline-primary">
            <p className="text-end">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div>
          <div className="btn btn-outline-success">
            <p className="text-start">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div className="text-end">
          <div className="btn btn-outline-primary">
            <p className="text-end">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div>
          <div className="btn btn-outline-success">
            <p className="text-start">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div className="text-end">
          <div className="btn btn-outline-primary">
            <p className="text-end">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div>
          <div className="btn btn-outline-success">
            <p className="text-start">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
        <div className="text-end">
          <div className="btn btn-outline-primary">
            <p className="text-end">name</p>
            <p>Dapibus ac facilisis in</p>
          </div>
        </div>
      </ListGroup> */}
      <Card.Footer className="d-flex">
        <Form.Control
          type="text"
          placeholder="Enter message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <Button
          variant="outline-secondary"
          onClick={sendMessage}
          className="ms-2"
        >
          Send
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ChatMessage;
