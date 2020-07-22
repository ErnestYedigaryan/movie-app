import React from "react";
import * as axios from "axios";

export const withDatas = (WrappedComponent, selectData) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
                items: []
            }
        }

        componentDidMount() {
            axios(selectData)
                .then(response => {
                    this.setState({
                    isLoaded: true,
                    items: response.data.results.map(data => ({
                        adult: data.adult,
                        backdrop_path: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
                        genre_ids: data.genre_ids,
                        original_language: data.original_language,
                        title: data.title,
                        overview: data.overview,
                        popularity: data.popularity,
                        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                        release_date: data.release_date,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                        id: data.id
                    }))
                })})
                .catch(err => {
                    console.log(err);
                })
        }

        render() {
            return <WrappedComponent {...this.props} isLoaded={this.state.isLoaded} items={this.state.items} />
        }
    }
}

export default withDatas;