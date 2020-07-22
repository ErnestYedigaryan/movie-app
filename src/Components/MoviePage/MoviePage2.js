import React, {useEffect, useState , useContext} from "react";
import {Card, CardImg, CardTitle, Col, Container, Row, Spinner, Table} from "reactstrap";
import axios from "axios";
import {Image} from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Carousel from "react-multi-carousel";
import {GlobalContext} from "../WatchList/Context/Glob";
import Watchlist from "../WatchList/watchList"

var dateFormat = require('dateformat');
const humanizeDuration = require("humanize-duration");

const opts = {
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
};

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


const MoviePage = (props , {movie}) => {
    const [item, setItem] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [isLoaded3, setIsLoaded3] = useState(false);
    const [youtubeId, setYoutubeId] = useState('');
    const [similar, setSimilar] = useState([]);
    const [cast, setCast] = useState([]);


    useEffect(() => {

        axios(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
            .then(res => {
                setItem({
                    adult: res.data.adult,
                    backdrop_path: res.data.backdrop_path,
                    genres: res.data.genres,
                    id: res.data.id,
                    imdb_id: res.data.imdb_id,
                    overview: res.data.overview,
                    poster_path: res.data.poster_path,
                    companies: res.data.production_companies,
                    countries: res.data.production_countries,
                    release_date: res.data.release_date,
                    spoken_languages: res.data.spoken_languages,
                    status: res.data.status,
                    tagline: res.data.tagline,
                    title: res.data.title,
                    vote_average: res.data.vote_average,
                    vote_count: res.data.vote_count,
                    budget: res.data.budget,
                    runtime: res.data.runtime
                })
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${props.match.params.id}/videos?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
            .then(res => {
                setIsLoaded2(true);
                setYoutubeId(res.data.results[0].key)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${props.match.params.id}/similar?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US&page=1`)
            .then(res => {
                setIsLoaded3(true);
                setSimilar( res.data.results.map(data => ({
                    backdrop_path: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
                    title: data.title,
                    poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                    id: data.id
                })))
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${props.match.params.id}/credits?api_key=e2bdf1adf27f9d4d32f149f3274aa754`)
            .then(res => {
                console.log(res.data.cast)
                setCast(res.data.cast);
                setIsLoaded3(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const {
        addMovieToWatchlist,
       
        watchlist,
       
      } = useContext(GlobalContext);

    let similarMovies = [similar[0], similar[1], similar[2], similar[3]]

    if (!isLoaded) {
        return (
            <Col className="App mt-3"><Spinner color="light" /></Col>
        )
    };
    

    return (
        <Container className="themed-container pt-5 pb-5" fluid="md">
            <Col md="10" className="ml-auto pt-2 mr-auto" style={styles.background}>
                <Row>
                    <Col className="p-2" lg="6">
                        <Image className="ml-2" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} fluid/>
                    </Col>
                    <Col lg="6">
                        <Table size="sm" style={styles.colorW} className="mt-2" striped>
                            <tbody>
                            <tr>
                                <td>Title</td>
                                <td>{item.title}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{dateFormat(item.release_date, " mmmm dS, yyyy")}</td>
                            </tr>
                            <tr>
                                <td>Countries</td>
                                <td>{item.countries.map(country => `${country.name}, `)}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td>{item.genres.map(genre => `${genre.name}, `)}</td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td>{humanizeDuration(item.runtime * 60000)}</td>
                            </tr>
                            <tr>
                                <td>Budget</td>
                                <td>{`$ ${item.budget}`}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Col>
                    {
                        (item.status !== "Released") ? (<h3 style={styles.colorW}>The Movie is not released.</h3>) :
                            (<></>)
                    }
                </Col>
                <h3 style={styles.colorW}>Cast</h3>
                <Col>
                    {
                        (!isLoaded3) ? (<Col className="App mt-3"><Spinner color="light" /></Col>)
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
                                deviceType={props.deviceType}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                {cast.map((actor) => {
                                    return (<Col key={actor.id}>
                                        <Card className="p-1" style={styles.background2}>
                                            <Link key={actor.id} to={`/actors/${actor.id}`}>
                                                {
                                                    (!actor.profile_path) ? (<CardImg top width="100%"
                                                                                      style={styles.CardImg}
                                                                                      src="https://www.clayton.edu/faculty/images/empty.jpg" alt={actor.name}/>) :
                                                        <CardImg top width="100%"
                                                                 style={styles.CardImg}
                                                                 src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name}/>
                                                }
                                            </Link>
                                            <CardTitle className="mt-2" style={{ color: "white", fontSize: "2vw" }}>{actor.name}</CardTitle>
                                        </Card>
                                    </Col>)
                                })}
                            </Carousel>)

                    }

                </Col>
                <Col style={styles.background2} className="mt-2">
                    <Row className="pt-2">
                        <Col>
                            <p style={styles.paragraph}>Description</p>
                        </Col>
                        <Col>
                            <p className="ml-auto" style={styles.paragraph}><button className="btn" onClick={() => addMovieToWatchlist(movie)} >
            <i style={styles.icon} className="fas fa-bookmark fa-lg"></i>
          </button> Add to Watch List </p>
                        </Col>
                    </Row>
                    <Col>
                        <p style={styles.colorW}>
                            {item.overview}
                        </p>
                    </Col>
                </Col>
                <Col style={styles.background} className="mt-2">
                    <Row>
                        <Col>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                renderStarIcon={() => <span> <i className="ml-3 mt-3 fa fa-star" style={styles.FaStar} aria-hidden="true"></i> </span>}
                                starCount={10}
                                value={item.vote_average}
                            />
                        </Col>

                        <Col className="ml-3" style={styles.colorW}>
                            <h4>Rating: {item.vote_average}</h4>
                            <h5>Vote count: {item.vote_count}</h5>
                        </Col>
                    </Row>
                </Col>
                <h1 style={styles.colorW}>Trailer</h1>
                <Col style={styles.background2}>

                    {
                        (!isLoaded2) ? (<Col className="App mt-3"><Spinner color="light" /></Col>)
                            : (<YouTube className="mb-2 mt-3" videoId={youtubeId} opts={opts}/>)
                    }
                </Col>
                <h1 className="m-3" style={styles.colorW}>Similar Movies</h1>
                <Row className="mt-3 pb-3">
                    {
                        (!similarMovies[0]) ? (<Col className="App mt-3"><h3 style={styles.colorW}>There is no Similar Movies Found</h3></Col>)
                            : similarMovies.map(movie => {
                                return( <Col key={movie.id}>
                                    <Card className="p-1" style={styles.background2}>
                                        <Link  to={`/movies/${movie.id}`}>
                                            <CardImg top width="100%" style={styles.CardImg} src={movie.poster_path} alt={movie.title}/>
                                        </Link>
                                    </Card>
                                </Col> )
                            })}
                </Row>
            </Col>
        </Container>
    )
}

export default MoviePage;