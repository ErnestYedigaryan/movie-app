import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, ListGroup, Table} from "reactstrap";
import {Link} from "react-router-dom";

const styles = {
    background: {
        backgroundColor: "#143d59"
    },
    colorW: {
        color: "white",
    },
    Link: {
        color: "#ffffff",
        fontSize: "20px"
    }
}

const Collections = (props) => {
    const lists = [
        {id: "01", name: "The Marvel Universe", img: "/coJVIUEOToAEGViuhclM7pXC75R.jpg"},
        {id: "03", name: "The DC Comics Universe", img: "/4H1jWsgEQOgTs4KeG5j5BorKMfX.jpg"},
        {id: "05", name: "The Avengers", img: "/2i89ujVkhJebuoB2zy6QZcwbr2N.jpg"},
        {id: "32", name: "Star Trek Universe", img: "/scF1FZztERCGPbVAUudVltoIbl5.jpg"},
        {id: "35", name: "Star Wars Expanded Universe", img: "/rf6uEcD5V8zs4J7Huo5L9sYgSki.jpg"},
        {id: "36", name: "The Matrix Universe", img: "/tZdqHYIH0C5dvNBSo6EIpMq9ntr.jpg"},
        {id: "33", name: "Alien Expanded Universe", img: "/hYE8D5dJWTDUVB6HU0WKvdIOxT1.jpg"},
        {id: "06", name: "Films déjà vus", img: "/cufswy98ZGGobL5OgyXid9INco4.jpg"},
        {id: "07", name: "Films to Watch", img: "/txOBeWiAe5McSgJC5HTXQOIDQbk.jpg"},
        {id: "106", name: "Horror Movies", img: "null"},
        {id: "10", name: "Top 50 Grossing Films of All Time", img: "/sRbZeVtRKIWybTOVpCRPZtzW5bd.jpg"},
        {id: "28", name: "Best Picture Winners - The Academy Awards", img: "/1ydP3HPsFB0aLVijHXt1obSLqlC.jpg"},
        {id: "79", name: "OurCollection", img: "/aBbuukeWoERqD1iDXrELlfH3uRk.jpg"},
    ]

    return(
        <Container className="themed-container pt-5 pb-5">
            <Col className="ml-auto pt-2 mr-auto" style={styles.background}>
                <Table className="mt-3 mb-3" striped style={styles.colorW}>
                    <thead>
                    <tr>
                        <th style={styles.Link}>Collection Name</th>
                        <th style={styles.Link}>Image</th>
                    </tr>
                    </thead>
                    {lists.map(list => (
                        <tbody key={list.id}>
                        <tr>
                            <td><Link style={styles.Link} exact="true" to={`collections/${list.id}`}>{list.name}</Link></td>
                            <td><img src={`https://image.tmdb.org/t/p/w500${list.img}`} style={{ height: "40px" }}/></td>
                        </tr>
                        </tbody>
                    ))}

                </Table>
            </Col>
        </Container>

    )
}

export default Collections;