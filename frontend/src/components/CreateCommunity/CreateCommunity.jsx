import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { InputGroup } from "react-bootstrap";

function CreateCommunity(props) {
  const animatedComponents = makeAnimated();
  const tagOptions = [
    { value: "Java", label: "Java" },
    { value: "React", label: "React" },
    { value: "TypeScript", label: "TypeScript" },
  ];
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="CommunityName">
          <Form.Label>Community Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Community Name" />
          <Form.Text className="text-muted">
            What would you like your community be called ?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="CommunityDescription">
          <Form.Label>Community Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Community Description" />
          <Form.Text className="text-muted">
            What is the community about ?
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="CommunityImage" className="mb-3">
          <Form.Label>Community Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="file" />
            <Button variant="dark">Upload </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="CommunityTags" className="mb-3">
          <Form.Label>Tags Associated With Community</Form.Label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[tagOptions[0]]}
            isMulti
            options={tagOptions}
          />
          <Form.Text className="text-muted">
            Keywords that can be used to identify community
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="CommunityRules">
          <Form.Label>Community Rules</Form.Label>
          <Form.Control type="text" placeholder="Enter Community Description" />
          <Form.Text className="text-muted">Any ground rules ?</Form.Text>
        </Form.Group>

        <Button variant="dark" type="submit">
          Create Community
        </Button>
      </Form>
    </div>
  );
}

export default CreateCommunity;
