import React, {useState} from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption, Col, Spinner
} from 'reactstrap';
import withDatas from "../../HOC/withDatas";
import {Link} from "react-router-dom";

const styles = {
    center: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
    },
    colorW: {
        color: "white"
    }
}

const Slider = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    let {isLoaded, items} = props;

    if (!isLoaded) {
        return (
            <Col className="App mt-3"><Spinner color="light" /></Col>
        )
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="custom-tag mb-5"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
            >
                <Link key={item.id} to={`/movies/${item.id}`}>
                    <img style={styles.center} src={item.backdrop_path} alt={item.title}/>
                </Link>
                <CarouselCaption captionText={item.release_date.slice(0, 4)} captionHeader={item.title}/>


            </CarouselItem>
        );
    });

    return (
        <>
            <style>
                {
                    `.custom-tag {
                           max-width: 100%;
                           max-height: 400px;
                           background: #0c1f28;
                         }`
                }
            </style>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
            </Carousel>
        </>
    );
}

export default withDatas(Slider, "https://api.themoviedb.org/3/movie/upcoming?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US&page=1");