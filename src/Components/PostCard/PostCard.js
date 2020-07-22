import React from 'react';
import {
    Card, CardImg, Col
} from 'reactstrap';
import { bounce } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
    colorW: {
        color: "white"
    },
    CardImg: {
        width: "90%",
        backgroundColor: "#054163"
    },
    FontSize: {
        maxFontSize: "12px",
        color: "white"
    },
    imgHeight: {
        maxHeight: "300px"
    },
    col: {
        width: "15%"
    },
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounce, 'bounce')
    },
    FaStar: {
        width: "90%",
    },
    rating: {
        backgroundColor: "#F4B41A",
        padding: "2%",
        width: "32%",
        position: "absolute",
        top: "15%",
        left: "-5px",
        fontSize:"2vw",
        fontWeight: "bold",
        color: "black",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
}


const PostCard = (props) => {
    return (
        <StyleRoot>
            <Col className="rounded">
                <Card  style={styles.CardImg}>
                    <CardImg top width="100%" style={styles.imgHeight} src={props.poster} alt={props.title}/>
                    <Col style={styles.rating}>{props.rating}</Col>
                </Card>
            </Col>
        </StyleRoot>
    );
};

export default PostCard;