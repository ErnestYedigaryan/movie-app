import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import PostCard from "../PostCard/PostCard";
import { Col, Spinner} from "reactstrap";
import withData from "../../HOC/withDatas";
import {Link} from "react-router-dom";

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

const MultipleSlider = (props) => {

    let {isLoaded, items} = props;

    if (!isLoaded) {
        return (
            <Col className="App mt-3"><Spinner color="light" /></Col>
        )
    }

    return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={props.deviceType !== "mobile" ? true : false}
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
            {items.map((item) => {
                return (
                    <Link key={item.id} to={`/movies/${item.id}`}>
                        <PostCard poster={(!item.poster_path) ? ("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6pdTz5L8m-BnQaPfYvrKXSpvTxri_DDtSqw&usqp=CAU") : (item.poster_path)} title={item.title} year={item.release_date.slice(0, 4)}
                                  rating={item.vote_average}/>
                    </Link>
                )
            })}
        </Carousel>
    )
}

export default withData(MultipleSlider, "https://api.themoviedb.org/3/movie/now_playing?api_key=e2bdf1adf27f9d4d32f149f3274aa754&language=en-US&page=1");