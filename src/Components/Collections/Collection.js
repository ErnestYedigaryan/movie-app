import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardImg, Col, Container, Row, Spinner} from "reactstrap";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Link} from "react-router-dom";

const styles = {
    Spinner: {
        textAlign: "center"
    },
    rating: {
        backgroundColor: "#F4B41A",
        padding: "5px",
        width: "40px",
        position: "absolute",
        top: "15%",
        left: "-5px",
        fontWeight: "bold",
        color: "black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    colorW: {
        color: "#ffffff",
    }
}

const Collection = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [details, setDetails] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/list/${props.match.params.id}?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US&page=1`)
            .then(result => {
                setDetails(result.data);
                setIsLoaded(true);
                setItems(result.data.items);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return(
        <Container>
            <h1 className="pt-4" style={styles.colorW}>{details.name}</h1>
            <Row xs="5" className="pb-4">
                {
                    (!isLoaded) ? (<Col style={styles.Spinner} className="mt-3 "><Spinner color="light" /></Col>)
                        : items.map(movie => {
                            return( <Col className="mt-3" key={movie.id}>
                                <Card className="p-1" style={{ backgroundColor: '#103140' }}>
                                    <Link  to={`/movies/${movie.id}`}>
                                        <CardImg top width="100%" style={{maxHeight: "300px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                                        <Col style={styles.rating}>{movie.vote_average}</Col>
                                    </Link>
                                </Card>
                            </Col> )
                        })
                }
            </Row>
        </Container>
    )
}

export default Collection;