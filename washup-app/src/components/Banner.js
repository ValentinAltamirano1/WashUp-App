import { useState, useEffect } from "react";
import { Row } from "react-bootstrap"
import { Container } from "react-bootstrap/lib/Tab"
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300- Math.random *100);
    const period=2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        },delta)

        return () => { clearInterval(ticker)};
    }, [text])

    const tick = () => {

    }


    return(
        <section className="banner" id="home">
            <Container>
                <Row classname="algin-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{"Hi I'm webcoded"}<span className="wrap">web developer</span></h1>
                        <p>Loren Ipsum is simply dummy text of the printing and typesetting industry. When a unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <button onClick = {() => console.log("connect")}>Let's connect<ArrowRightCircle size={25}/></button>
                    </Col>
                    <Col xs={12} md={6} xl={7}>
                        <img src={""} alt="Headder Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}