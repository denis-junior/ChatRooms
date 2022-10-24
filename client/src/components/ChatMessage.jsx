import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    socket.removeListener("receive_message");
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
          <ScrollToBottom className="scroll-message">
            {messageList.map((messageContent, key) => {
              if (username === messageContent.author) {
                return (
                  <div
                    key={key}
                    className="mt-3 text-end box-message author-box-message"
                  >
                    <div className="message-content">
                      <p className="text-end message-name">
                        {messageContent.author}
                      </p>
                      <p className=" message-message">
                        {messageContent.message}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={key} className="mt-3 box-message">
                    <div className="message-content">
                      <p className="text-start message-name">
                        {messageContent.author}
                      </p>
                      <p className="text-start message-message">
                        {messageContent.message}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </ScrollToBottom>
        </Card.Body>
        <Card.Footer className="footer-chat">
          <Form.Control
            className="input-chat"
            type="text"
            placeholder="Enter message..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => event.key === "Enter" && sendMessage()}
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
