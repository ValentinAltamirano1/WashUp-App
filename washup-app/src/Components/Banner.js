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
  const toRotate = [ "fast", "trustworthy", "economic" ];
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
                <h1>{`Welcome to WashUp, `} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "fast", "trustworthy", "economic" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Discover the shine your vehicle deserves at our top-notch car wash! At WashUp, we provide professional car washing service that rejuvenates your car's appearance by removing dirt and impurities. Our expert team and quality products ensure a flawless outcome. Trust us to leave your vehicle sparkling and road-ready.</p>
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