import React from 'react';
import picture1 from "../assets/img/Chemical-Guys-16-PieceArsenal.png";
import picture2 from "../assets/img/Chemical-Guys-Pink-Foaming.png";
import picture3 from "../assets/img/Chemical-Guys-Hydroslick-IntenseGloss.png";
import picture4 from "../assets/img/Chemical-Guys-Foam-Cannon.png";
import picture5 from "../assets/img/Chemical-Guys-Butter-Wet-Wax.png";
import picture6 from "../assets/img/ArmorAll-Carpet-Upholstery-Cleaner.png";
import picture7 from "../assets/img/LeatherHoney-Cleaner.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";

import { Row, Col, Container } from 'react-bootstrap';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Productos</h2>
                        <p>Nuestro equipo profesional está aquí para brindarte los mejores productos</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider" >
                            <div className="item">
                                <img src={picture1} alt="Image" />
                                <h5>Chemical Guys HOL169 - Kit de lavado de coche Arsenal Builder</h5>
                            </div>
                            <div className="item">
                                <img src={picture2} alt="Image" />
                                <h5>Chemical Guys CWS_402 Mr. Pink - Jabón espumante para lavado de autos</h5>
                            </div>
                            <div className="item">
                                <img src={picture3} alt="Image" />
                                <h5>Chemical Guys WAC22916 HydroSlick: Capa Cerámica Sio2 de Alto Brillo e Hiper Cera, Brillo Hiperrealzado</h5>
                            </div>
                            <div className="item">
                                <img src={picture4} alt="Image" />
                                <h5>Chemical Guys EQP_310 TORQ Cañón de Espuma</h5>
                            </div>
                            <div className="item">
                                <img src={picture5} alt="Image" />
                                <h5>Chemical Guys WAC_201_16 Cera húmeda de mantequilla, brillo húmedo profundo</h5>
                            </div>
                            <div className="item">
                                <img src={picture6} alt="Image" />
                                <h5>Limpiador en Spray para Alfombras y Tapicería</h5>
                            </div>
                            <div className="item">
                                <img src={picture7} alt="Image" />
                                <h5>Limpiador de Cuero Leather Honey</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}