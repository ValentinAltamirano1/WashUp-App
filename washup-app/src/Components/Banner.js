import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.gif";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';



export const Banner = () => {
  const navigate = useNavigate();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "rapido", "seguro", "economico" ];
  const period = 2000;
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Bienvenido WashUp, `} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "rapido", "seguro", "economico" ]'><span className="wrap">{text}</span></span></h1>
                  <p>"¡Descubre el brillo que tu vehículo merece en nuestro lavado de autos de primera categoría! En WashUp, ofrecemos un servicio profesional de lavado de autos que rejuvenece la apariencia de tu vehículo al eliminar la suciedad y las impurezas. Nuestro equipo de expertos y productos de alta calidad garantizan un resultado impecable. Confía en nosotros para dejar tu vehículo reluciente y listo para la carretera."</p>
                  {!isAuthenticated && (
                    <Button onClick={() => navigate('/login')}>
                      Conectar <ArrowRightCircle size={25} />
                    </Button>
                  )}
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}