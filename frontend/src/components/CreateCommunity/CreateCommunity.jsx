import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function CreateCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [success, setSuccess] = useState();
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const createCommunity = async () => {
    try {
      const result = await axios.post("api/communities/createCommunity", {
        communityName: communityName,
        communityDescription: communityDescription,
        createdBy: userDetails.email,
      });
      if (result) {
        setSuccess(true);
      }
    } catch (err) {}
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="CommunityName">
          <Form.Label>Community Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setCommunityName(e.target.value);
            }}
            placeholder="Enter Community Name"
          />
          <Form.Text className="text-muted">
            What would you like your community be called ?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="CommunityDescription">
          <Form.Label>Community Description</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setCommunityDescription(e.target.value);
            }}
            placeholder="Enter Community Description"
          />
          <Form.Text className="text-muted">
            What is the community about ?
          </Form.Text>
        </Form.Group>
        <Button
          variant="dark"
          onClick={(e) => {
            createCommunity();
          }}
        >
          Create Community
        </Button>
        {success && (
          <p style={{ color: "green" }}>
            <b>Community Created Successfully</b>
          </p>
        )}
      </Form>
    </div>
  );
}

export default CreateCommunity;
