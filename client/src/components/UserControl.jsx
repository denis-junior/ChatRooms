import React from "react";
import Card from "react-bootstrap/Card";

const HelloUser = ({username, room }) => {
  return (
    <footer className="d-flex text-center position-absolute bottom-0 start-50 translate-middle-x " style={{ maxWidth: "50rem" }}>
      <Card.Body>
        <Card.Title>Hello {username}</Card.Title>
        <Card.Text>
          you're in the room <b>{room}</b> now, text what you want with other
          people in the same room
        </Card.Text>
      </Card.Body>
    </footer>
  );
};

export default HelloUser;
