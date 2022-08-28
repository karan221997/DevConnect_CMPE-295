import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Row, Container, Col } from "react-bootstrap";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import QuickreplyTwoToneIcon from "@mui/icons-material/QuickreplyTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import "./CommunityTile.css";
function CommunityTile({ variant }) {
  return (
    <div>
      <div className="CardContainer">
        <Container>
          <Card>
            <Card.Header>
              <i>
                <div className="CommunityHeader">
                  <div className="middleInfo">
                    <GroupOutlinedIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">34 members</span>
                  </div>
                  <div className="middleInfo">
                    <QuickreplyTwoToneIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">7000 Answers</span>
                  </div>
                  <div className="middleInfo">
                    <AccountCircleTwoToneIcon
                      sx={{
                        color: "#808080",
                        fontSize: "1.5rem",
                      }}
                    />
                    <span className="middleInfoText">Creator: Yusuf Soni</span>
                  </div>
                </div>
              </i>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col sm={2}>
                  <div className="ImgContainer">
                    <img
                      className="rightbarFollowingImg"
                      src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777655/react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
                    ></img>
                  </div>
                </Col>
                <Col>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant={variant}>Status of request</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CommunityTile;
