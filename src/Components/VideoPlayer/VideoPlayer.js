import React, {useEffect, useState} from "react";
import axios from "axios";
import YouTube from "react-youtube";
import {Button, Card, CardBody, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

const styles = {
    colorW: {
        color: "white"
    },
    colorB: {
        color: "black",
        fontWeight: "bold",
    }
}

const VideoPlayer = (props) => {
    const [youtubeId, setYoutubeId] = useState('');
    const [item, setItem] = useState({})
    const opts = {
        maxHeight: '200px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    let id = props.ids[Math.floor(Math.random() * props.ids.length)];

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
            .then(res => {
            console.log(res)
                setYoutubeId(res.data.results[0].key)
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US`)
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
                })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])


    return(
        <Container className="mt-5">
            <Card style={{ backgroundColor: '#0c1f28', borderColor: '#0d2432' }}>
                <Row>
                    <Col sm="6"><YouTube videoId={youtubeId} opts={opts} /></Col>
                    <Col sm="6"><CardBody className="ml-2">
                        <CardTitle style={styles.colorW}><b>{item.title}</b> </CardTitle>
                        <CardText style={styles.colorW}>{item.overview}</CardText>
                        <Button color="warning" style={styles.btn}> <Link style={styles.colorB} to={`/movies/${item.id}`} > Details </Link> </Button>
                    </CardBody></Col>
                </Row>
            </Card>
        </Container>
    )
}

export default VideoPlayer;