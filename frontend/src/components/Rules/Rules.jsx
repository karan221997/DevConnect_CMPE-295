import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./Rules.css";

function Rules(props) {
  return (
    <div>
      <div className="rules-list">
        <div className="rules-list">
          <Card>
            <Card.Header><Card.Title>Rules</Card.Title></Card.Header>
            <Card.Img variant="top" src="https://c.tenor.com/7XNWHb4sbwEAAAAC/rules.gif" />
            <ListGroup variant="flush" as="ol" numbered>
              <ListGroup.Item>Remember the human. </ListGroup.Item>
              <ListGroup.Item>Behave like you would in real life.</ListGroup.Item>
              <ListGroup.Item>Search for duplicates before posting.</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Rules;
