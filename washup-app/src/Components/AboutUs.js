import { Container, Row, Col } from "react-bootstrap";
import lavadero1 from "../assets/img/lavadero1.jpg";
import lavadero2 from "../assets/img/lavadero2.jpg";
import { useState } from "react";
import {NavBar} from "./NavBar";

export const AboutUs = () => {
  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "10px", // Ajusta el valor para redondear más o menos los bordes
    transition: "transform 0.3s",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(173, 216, 230, 0.7)", // Cambia el color de fondo aquí
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s",
    color: "white",
  };

  const textContainerStyle = {
    backgroundColor: "#e2f5fc",
    padding: "20px",
    borderRadius: "5px",
  };

  const textStyle = {
    color: "#333",
  };

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  return (
    <div>
      <NavBar /> {/* Abre NavBar antes de la sección AboutUs */}
        <section className="about-us" id="about-us">
        <Container>
          <Row>
            {/* Primer cuadrado */}
            <Col lg={6} md={12} style={{ marginTop: "60px" }}>
              <div className="about-box">
                <div className="about-text" style={textContainerStyle}>
                  <h2 style={textStyle}>Nuestra Historia</h2>
                  <p style={textStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget magna nec odio lobortis luctus.
                  </p>
                </div>
                <div
                  className="about-image"
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={lavadero1}
                    alt="Fundación del lavadero"
                    style={imageStyle}
                  />
                  <div
                    className="overlay-about-us"
                    style={{
                      ...overlayStyle,
                      opacity: isHovered1 ? 1 : 0,
                    }}
                  >
                    Más de 10 años de experiencia
                  </div>
                </div>
              </div>
            </Col>


            {/* Segundo cuadrado */}
            <Col lg={6} md={12} style={{ marginTop: "60px" }}>
              <div className="about-box">
                <div
                  className="about-image"
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={lavadero2}
                    alt="Nuestros servicios"
                    style={imageStyle}
                  />
                  <div
                    className="overlay-about-us"
                    style={{
                      ...overlayStyle,
                      opacity: isHovered2 ? 1 : 0,
                    }}
                  >
                    Una empresa familiar
                  </div>
                </div>
                <div className="about-text" style={textContainerStyle}>
                  <h2 style={textStyle}>Nuestros Valores</h2>
                  <p style={textStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget magna nec odio lobortis luctus.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
   
  );
};



