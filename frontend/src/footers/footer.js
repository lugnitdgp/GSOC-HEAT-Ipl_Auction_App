import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <footer
            style={{
                width: "100%",
                height: "10vh",
                bottom: "0px",
                display: "flex",
                justifyContent: "center",
                color: "white",
                position: "absolute"
            }}
        >
            <Container>
                <Row>
                    {/* <Col className="text-center py-3">
                        Copyright &copy; IPL_BIDDER
                    </Col> */}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
