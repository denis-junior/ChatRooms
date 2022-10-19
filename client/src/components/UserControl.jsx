import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const HelloUser = ({username, room }) => {
  return (
    <Card className="d-flex text-center" style={{ maxWidth: "50rem" }}>
      <Card.Body>
        <Card.Title>Hello {username}</Card.Title>
        <Card.Text>
          you're in the room <b>{room}</b> now, text what you want with other
          people in the same room
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HelloUser;
