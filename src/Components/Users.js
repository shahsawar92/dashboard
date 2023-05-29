import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

const UserComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Simulated API call for users and setting the users state
  const AllUsers = [
    { id: 1, username: "John" },
    { id: 2, username: "Jane" },
    { id: 3, username: "Alice" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSendClick = (userId) => {
    console.log("userId", userId);
    if (!selectedOption) return alert("Please select an option");
    navigate("/list", { state: { selectedOption, userId } });
  };

  return (
    <Container>
      <h2>Select an option:</h2>
      <Form>
        <Form.Check
          type="radio"
          id="option1"
          label="Option 1"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        <Form.Check
          type="radio"
          id="option2"
          label="Option 2"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
        <Form.Check
          type="radio"
          id="option3"
          label="Option 3"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleOptionChange}
        />
      </Form>

      <h2>User List:</h2>
      <ListGroup>
        {AllUsers.map((user) => (
          <ListGroup.Item
            style={{ display: "flex", justifyContent: "space-between" }}
            key={user.id}
          >
            <div>{user.username}</div>
            <Button
              variant="primary"
              style={{ display: "inline-block" }}
              onClick={() => handleSendClick(user.id)}
            >
              Send
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserComponent;
