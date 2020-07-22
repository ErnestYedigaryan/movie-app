import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardImg, Col, Container, Form, Input, Row, Spinner} from "reactstrap";
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
    CardImg: {
        maxHeight: "290px"
    }
}

const Search = (props) => {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [query, setQuery] = useState('');

    useEffect( (updatedPageNo, query) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US&query=${props.match.params.query}${pageNumber}&include_adult=false`

        axios.get(searchUrl)
            .then(res => {
                console.log(searchUrl);
                console.log(res.data.results);
                setItems(res.data.results);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    } )

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        return props.history.push(`/search/${query}`);
    }

    return(
        <Container className="themed-container pt-5 pb-5" fluid="md">
            <Col md="10" className="ml-auto pt-2 mr-auto" style={{ backgroundColor: '#143d59' }}>
                <h1 style={{color: "#F4B41A"}}>Search Results for {props.match.params.query}</h1>
                <Form inline onSubmit={handleSubmit}>
                    <Input type="text" value={query} placeholder="Search"  onChange={handleChange}/>
                    <Button color="warning"> <i style={{color: "black"}} className="fas fa-search fa-lg"></i></Button>
                </Form>
                <Row xs="4" className="pb-4">
                    {
                        (!isLoaded) ? (<Col style={styles.Spinner} className="mt-3 "><Spinner color="light" /></Col>)
                            : items.map(movie => {
                                return( <Col className="mt-3" key={movie.id}>
                                    <Card className="p-1" style={{ backgroundColor: '#103140' }}>
                                        <Link  to={`/movies/${movie.id}`}>
                                            {

                                                (movie.poster_path) ? (<CardImg top width="100%" style={styles.CardImg}
                                                                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                                                alt={movie.name}/>) :
                                                    (<CardImg top width="100%" style={styles.CardImg}
                                                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&usqp=CAU"
                                                              alt={movie.name}/>)

                                            }
                                            {
                                                (movie.vote_average) ? (<Col style={styles.rating}>{movie.vote_average}</Col>) :
                                                    (<Col style={styles.rating}>N/A</Col>)
                                            }

                                        </Link>
                                    </Card>
                                </Col> )
                            })
                    }
                </Row>
            </Col>
        </Container>
    )
}

export default Search;