import { Container, Row, Col } from "react-bootstrap";
import lavadero1 from "../assets/img/about-us-photo.jpg";
import lavadero2 from "../assets/img/About-us-photo1.jpg";
import { useState } from "react";
import {NavBar} from "./NavBar";
import './AboutsUs.css';

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

  const textStyle1 = {
    color: "#2596be",
  };


  const textStyle = {
    color: "#2596be",
    fontSize: "1.1em",
  };

  const textStyle2 = {
    color: "#2596be",
    fontSize: "1.1em",
    marginTop: "100px",
  };

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

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
                  <h1 style={textStyle1}>Nuestra Historia</h1>
                  <p style={textStyle}>
                    Fundada por tres amigos que compartieron una visión, Washup se ha convertido en un referente confiable en el negocio de lavaderos de autos durante más de 15 años.
                  </p>
                  <p style={textStyle}>
                    Nuestra historia comenzó cuando vimos una oportunidad para marcar la diferencia en la industria del lavado de autos. Nos unimos para crear una empresa que no solo ofrezca un servicio excepcional, sino que también se enfoque en la satisfacción del cliente y la confianza en cada detalle.
                  </p>
                  <p style={textStyle}>
                    La confiabilidad es el pilar de nuestra empresa. Desde el primer día, nos hemos comprometido a proporcionar un servicio consistente y de alta calidad que nuestros clientes puedan confiar en cada visita. Nos enorgullece ser la elección de confianza de innumerables clientes que regresan a Washup una y otra vez.
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
                    Más de 15 años de experiencia
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
                    Una empresa de confianza
                  </div>
                </div>
                <div className="about-text" style={textContainerStyle}>
                  <h1 style={textStyle1}>Nuestros Valores</h1>
                  <div className="values-container">
                    <div className="value-card quality-card">
                      <div className="card-inner">
                        <div className="card-front">
                          <p>1.</p>
                        </div>
                        <div className="card-back">
                          <p>Respeto</p>
                        </div>
                      </div>
                    </div>
                    <div className={`value-card confidence-card ${isHovered2 ? "hovered" : ""}`}>
                      <div className="card-inner">
                        <div className="card-front">
                          <p>2.</p>
                        </div>
                        <div className="card-back">
                          <p>Confianza</p>
                        </div>
                      </div>
                    </div>
                    <div className={`value-card personalized-card ${isHovered3 ? "hovered" : ""}`}>
                      <div className="card-inner">
                        <div className="card-front">
                          <p>3.</p>
                        </div>
                        <div className="card-back">
                          <p>Calidad</p>
                        </div>
                      </div>
                    </div>
                    <div className={`value-card commitment-card ${isHovered4 ? "hovered" : ""}`}>
                      <div className="card-inner">
                        <div className="card-front">
                          <p>4.</p>
                        </div>
                        <div className="card-back">
                          <p>Compromiso</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={textStyle2}>
                  En nuestra organización, nos guiamos por un conjunto de valores que son la base de nuestra cultura y el motor de nuestro éxito. Creemos que al vivir y trabajar de acuerdo con estos principios, podemos alcanzar nuestros objetivos y mantener relaciones sólidas con nuestros clientes, colaboradores y la comunidad en general.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
   
  );
};



