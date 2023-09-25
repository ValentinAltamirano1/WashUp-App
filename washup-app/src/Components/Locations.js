import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import locationImg1 from "../assets/img/location-img1.jpg";


export const Locations = () => {
  const textContainerStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "5px",
  };

  const textStyle = {
    color: "#333",
  };

  return (
    <section className="locations" id="locations">
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className="about-box">
              <div className="about-image">
                <TrackVisibility>
                  {({ isVisible }) => (
                    <img
                      src={locationImg1}
                      alt="Location 1"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        filter: isVisible
                          ? "brightness(70%)"
                          : "brightness(100%)",
                        transition: "filter 0.3s",
                      }}
                    />
                  )}
                </TrackVisibility>
              </div>
              <div className="about-text" style={textContainerStyle}>
                <h2 style={textStyle}>Location 1</h2>
                <p style={textStyle}>Description for Location 1</p>
              </div>
            </div>
          </Col>

          <Col lg={4} md={4}>
            <div className="about-box">
              <div className="about-image">
                <TrackVisibility>
                  {({ isVisible }) => (
                    <img
                      src={locationImg1}
                      alt="Location 2"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        filter: isVisible
                          ? "brightness(70%)"
                          : "brightness(100%)",
                        transition: "filter 0.3s",
                      }}
                    />
                  )}
                </TrackVisibility>
              </div>
              <div className="about-text" style={textContainerStyle}>
                <h2 style={textStyle}>Location 2</h2>
                <p style={textStyle}>Description for Location 2</p>
              </div>
            </div>
          </Col>

          <Col lg={4} md={4}>
            <div className="about-box">
              <div className="about-image">
                <TrackVisibility>
                  {({ isVisible }) => (
                    <img
                      src={locationImg1}
                      alt="Location 3"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        filter: isVisible
                          ? "brightness(70%)"
                          : "brightness(100%)",
                        transition: "filter 0.3s",
                      }}
                    />
                  )}
                </TrackVisibility>
              </div>
              <div className="about-text" style={textContainerStyle}>
                <h2 style={textStyle}>Location 3</h2>
                <p style={textStyle}>Description for Location 3</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

