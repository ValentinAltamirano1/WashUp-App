import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.jpg";
import projImg2 from "../assets/img/project-img2.jpg";
import projImg3 from "../assets/img/project-img3.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Project = () => {

  const projects = [
    {
      title: "Montevideo Labs",
      imgUrl: projImg1,
    },
    {
      title: "Itau",
      imgUrl: projImg2,
    },
    {
      title: "Antel",
      imgUrl: projImg3,
    },
  ];

  const projects1 = [
    {
      title: "Ancap",
      imgUrl: projImg1,
    },
    {
      title: "Disa",
      imgUrl: projImg2,
    },
    {
      title: "Universidad de Montevideo",
      imgUrl: projImg3,
    },
  ];

  const projects2 = [
    {
      title: "Banco Santander",
      imgUrl: projImg1,
    },
    {
      title: "Tienda Inglesa",
      imgUrl: projImg2,
    },
    {
      title: "Disco",
      imgUrl: projImg3,
    },
  ];


  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Proyectos</h2>
                <p>Trabajamos con empresas reconocidas, confían en nosotros, ¿por qué no puedes hacerlo tú?</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          projects1.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          projects2.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>

              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}