import React, {useEffect, useState} from "react";
import {Card, CardImg, CardTitle, Col, Container, Row, Spinner, Table} from "reactstrap";
import {Image} from "react-bootstrap";
import axios from "axios";
import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import Geocode from "react-geocode";
import Maps from "../Maps/Maps";
import L from "leaflet";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';


var dateFormat = require('dateformat');

const styles = {
    background: {
        backgroundColor: "#143d59"
    },
    background2: {
        backgroundColor: "#103140"
    },
    colorW: {
        color: "white"
    },
    paragraph: {
        color: "white",
        fontSize: "18px"
    },
    icon: {
        color: "#F4B41A"
    },
    Card: {
        width: "100%",
    },
    CardImg: {
        maxHeight: "290px"
    },
    FaStar: {
        width: "100%",
        maxFontSize: "30px",
    },
    Image: {
        maxHeight: "400px"
    },
    bio: {
        fontSize: "14px",
        color: "white"
    },
    Map: {
        maxHeight: "300px",
        minHeight: "200px"
    }
}

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 5,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 4,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const Actor = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [isLoaded3, setIsLoaded3] = useState(false);
    const [details, setDetails] = useState({});
    const [movies, setMovies] = useState([]);
    const [location, setLocation] = useState({});

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${props.match.params.id}?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
            .then(res => {
                setDetails(res.data);
                setIsLoaded(true);

            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${props.match.params.id}/movie_credits?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
            .then(res => {
                setMovies(res.data.cast);
                setIsLoaded2(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (isLoaded) {
        Geocode.setApiKey("AIzaSyCViZdF4zKF6WfU3H-t3a9jFpusZL2QpmA")
        Geocode.fromAddress(`${details.place_of_birth}`)
            .then(
                res => {
                    setLocation(res.results[0].geometry.location);
                    setIsLoaded3(true);
                },
                error => {
                    console.log(error);
                }
            );

    }

    if (!isLoaded) {
        return (
            <Col className="App mt-3"><Spinner color="light"/></Col>
        )
    }

    return (<Container className="themed-container pt-5 pb-5" fluid="md">
        <Col md="10" className="ml-auto pt-2 mr-auto" style={styles.background}>
            <Row>
                <Col className="p-2" lg="4" md="6" sm="4">
                    {
                        (details.profile_path) ? (<Image className="ml-2" style={styles.Image}
                                                         src={`https://image.tmdb.org/t/p/w500${details.profile_path}`} fluid/>) :
                            (<Image className="ml-2" style={styles.Image}
                                    src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" fluid/>)
                    }

                </Col>
                <Col lg="8" md="6" sm="8">
                    <Table style={styles.colorW} className="mt-2" striped>
                        <tbody>
                        <tr>
                            <td>{details.name}</td>
                        </tr>
                        <tr>
                            <td>Birthday : {dateFormat(details.birthday, " mmmm dS, yyyy")} </td>
                        </tr>
                        <tr>
                            <td>Place of birth : {details.place_of_birth}</td>
                        </tr>
                        {(details.deathday !== null) ? (<tr>
                            <td>Deathday : {dateFormat(details.deathday, " mmmm dS, yyyy")}</td>
                        </tr>) : (<> </>)}

                        <tr>
                            <td>Acted in {movies.length} movies</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Col style={styles.background2} className="mt-2 mb-3 pb-3">
                <Row className="pt-2">
                    <Col>
                        <p style={styles.paragraph}>Biography</p>
                    </Col>
                </Row>
                <Row sm="2">
                    <Col>
                        <p style={styles.bio}>
                            {details.biography}
                        </p>
                    </Col>
                    <Col>
                        {
                            (!isLoaded3) ? (<Col className="App mt-3"><Spinner color="light"/></Col>) :
                                ((details.place_of_birth) ? (<Maps style={styles.Map} location={location}/>) :
                                    (<></>))
                        }
                    </Col>
                </Row>

            </Col>

            <h3 className="m-2" style={styles.colorW}>Films acting by {details.name}</h3>
            <Col>
                {
                    (!isLoaded2) ? (<Col className="App mt-3"><Spinner color="light"/></Col>)
                        : (<Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            autoPlay={false}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType={props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {movies.map((movie) => {
                                return (<Col key={movie.id}>
                                    <Card className="p-1" style={styles.background2}>
                                        <Link key={movie.id} to={`/movies/${movie.id}`}>
                                            {
                                                (movie.poster_path) ? (<CardImg top width="100%" style={styles.CardImg}
                                                                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                                                alt={movie.name}/>) :
                                                    (<CardImg top width="100%" style={styles.CardImg}
                                                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&usqp=CAU"
                                                              alt={movie.name}/>)
                                            }


                                        </Link>
                                        <CardTitle className="mt-2" style={styles.colorW}>{movie.title}</CardTitle>
                                    </Card>
                                </Col>)
                            })}
                        </Carousel>)
                }
            </Col>
        </Col>
    </Container>)
}

export default Actor;