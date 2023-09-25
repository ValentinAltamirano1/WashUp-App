import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Services = () => {
  const [activeTab, setActiveTab] = useState("first");

  const services = [
    {
      title: "Service 1",
      description: "Description for Service 1",
    },
    {
      title: "Service 2",
      description: "Description for Service 2",
    },
    {
      title: "Service 3",
      description: "Description for Service 3",
    },
  ];

  const descriptionColor = "#555"; // Color para descripciones y títulos

  const titleStyle = {
    color: descriptionColor,
    marginTop: "20px",
  };

  const descriptionStyle = {
    color: descriptionColor,
  };

  const getTabContentStyle = (tabIndex) => {
    const baseStyle = {
      textAlign: "center",
    };

    switch (tabIndex) {
      case "first":
        return { ...baseStyle, marginLeft: 0 };
      case "second":
        return { ...baseStyle };
      case "third":
        return { ...baseStyle, marginRight: 0 };
      default:
        return {};
    }
  };

  return (
    <section className="services" id="services">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible
                      ? "animate__animated animate__fadeIn"
                      : ""
                  }
                >
                  <h2 style={titleStyle}>Services</h2>
                  <p style={descriptionStyle}>
                    Explore our wide range of services
                  </p>
                  <Tab.Container
                    id="services-tabs"
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                  >
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      {services.map((service, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link eventKey={`service-${index}`}>
                            {service.title}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible
                          ? "animate__animated animate__slideInUp"
                          : ""
                      }
                    >
                      {services.map((service, index) => (
                        <Tab.Pane key={index} eventKey={`service-${index}`}>
                          {activeTab === `service-${index}` && (
                            <div
                              className="service-card"
                              style={getTabContentStyle(activeTab)}
                            >
                              <h3 style={{ color: descriptionColor }}>
                                {service.title}
                              </h3>
                              <p style={descriptionStyle}>{service.description}</p>
                            </div>
                          )}
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};









