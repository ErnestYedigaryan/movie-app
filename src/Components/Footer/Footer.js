import React from "react";
import {Col, Row} from "reactstrap";

const styles = {
    firstBackground: {
        backgroundColor: "#052f4b",
    },
    secondBackground: {
        backgroundColor: "#143D59",
        color: "white"
    },
    colorWhite: {
        color: "white"
    },
    signUp: {
        color: "white",
        border: "solid 2px white",
        borderRadius: "20px"
    }
}

const Footer = () => {

    return(
        <footer style={styles.firstBackground} className="page-footer font-small pt-4">
            <Row sm="2" className="container mb-4">
                <Col>

                </Col>
                <Col>
                    <h2>
                        About
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Col>
            </Row>

            <Col style={styles.secondBackground} className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="/"> MovieApp</a>
            </Col>
        </footer>
    )
}

export default Footer;