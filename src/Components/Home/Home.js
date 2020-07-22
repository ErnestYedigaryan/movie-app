import React, {useState} from "react";
import {Button, Card, Container, Form, Input} from "reactstrap";
import Slider from "../Slider/Slider";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import MultipleSlider from "../MultipleSlider/MultipleSlider";
import {Link, Redirect} from "react-router-dom";

const styles = {
    textAlign: {
        textAlign: "center",
        color: "white"
    },
    height: {
        heght: "50px"
    }
}


const Home = (props) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        return props.history.push(`/search/${query}`);
    }

    return(
        <Container fluid>
            <h1 style={styles.textAlign} >Now Playing</h1>
            <MultipleSlider className="mt-2"/>
            <Container>
                <Card style={{ backgroundColor: "#143d59" }} className="mt-3 p-3">
                    <h1 style={{color: "#F4B41A"}}>Search a Movie</h1>
                    <Form inline onSubmit={handleSubmit}>
                        <Input type="text" value={query} placeholder="Search"  onChange={handleChange}/>
                        <Button color="warning"> <i style={{color: "black"}} className="fas fa-search fa-lg"></i></Button>
                    </Form>
                </Card>
            </Container>
            <VideoPlayer className="mt-5" ids={[419704, 514847, 508439, 454626, 429617]}/>
            <h1 className="mt-2" style={styles.textAlign}>Upcoming Movies</h1>
            <Slider className="mt-2"/>
        </Container>
    )
}

export default Home;