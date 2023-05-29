import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, ListGroup } from "react-bootstrap";

const ListComponent = () => {
  const location = useLocation();
  const [apiResponse, setApiResponse] = useState(null);
  const { selectedOption, userId } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // api call here
        const data = [
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
          { id: 3, name: "Alice" },
        ];
        // set response of api call to state
        setApiResponse(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <Container>
      <div>
        <h2>Options for:</h2>
        <p>Selected Option: {selectedOption}</p>
        <p>UserID: {userId}</p>
      </div>

      <div>
        <h2>API Response:</h2>

        <Card>
          <ListGroup variant="flush">
            {apiResponse &&
              apiResponse.map((item) => (
                <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </Container>
  );
};

export default ListComponent;
