import React, {useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const ChatMessage = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.removeListener('receive_message')
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="main-chat">
    <Card className="box-chat">
      <Card.Header as="h4" className="text-center header-chat">
        Chat
      </Card.Header>
      <Card.Body className="body-chat">
        <ListGroup variant="flush" className="p-4">
          {messageList.map((messageContent, key) => {
            if (username === messageContent.author) {
              return (
                <div key={key} className="mt-3 text-end">
                  <div className="btn btn-outline-primary" style={{width: "10rem"}}>
                    <p className="text-end">{messageContent.author}</p>
                    <p className="text-end">{messageContent.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={key} className="mt-3">
                  <div className="btn btn-outline-success" style={{width: "10rem"}}>
                    <p className="text-start">{messageContent.author}</p>
                    <p className="text-start">{messageContent.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </ListGroup>
      </Card.Body>
      <Card.Footer className="footer-chat">
        <Form.Control
          type="text"
          placeholder="Enter message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          value={currentMessage}
          />
        <Button
          variant="outline-light"
          onClick={sendMessage}
          className="ms-2"
          >
          Send
        </Button>
      </Card.Footer>
    </Card>
    </div>
  );
};

export default ChatMessage;
