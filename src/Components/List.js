import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, ListGroup } from "react-bootstrap";
import { Button } from "@mui/material";

const ListComponent = () => {
  const location = useLocation();
  const [apiResponse, setApiResponse] = useState(null);
  const { selectedOption, userId } = location.state || {};

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
    <Container
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Button variant="contained">Hello World</Button>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores esse
        placeat totam voluptatum quo, dolorem, dignissimos est pariatur numquam
        consequuntur perferendis iusto, harum maiores quod nesciunt accusantium
        quaerat doloribus nam molestiae debitis. Eum esse culpa ad maxime
        excepturi consequatur error voluptas vitae.
      </div>
      <div>
        <h2>Options for:</h2>
        <p>Selected Option: {selectedOption}</p>
        <p>UserID: {userId}</p>
      </div>

      <div>
        <h2>API Response:</h2>

        <Card
          style={{
            height: "100%",
            width: "100%",
          }}
        >
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
