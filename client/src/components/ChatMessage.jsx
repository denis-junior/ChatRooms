import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const ChatMessage = () => {
  return (
    <Card className="mt-3" style={{ width: "40rem" }}>
      <Card.Header as="h4" className="text-center" >Chat</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ChatMessage;
