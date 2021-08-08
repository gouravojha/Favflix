import React from 'react'
import "./App.css";
function MovieData({ data }) {
    return (
        <div className="App">
            <div className="moviedata">
                <div className="moviedata__left">
                    <h2>Search </h2>
                    <div className="moviedata__poster">
                        <img src={data.Poster} alt="movie" />
                    </div>
                </div>
                <div className="moviedata__right">
                    <h6>{data.Title}</h6>
                    <h6>{data.Year}</h6>
                    <h6>Released:&nbsp;&nbsp;{data.Released}</h6>
                    <h6>Rated:&nbsp;&nbsp;{data.Rated}</h6>
                    <h6>Runtime:&nbsp;&nbsp;{data.Runtime}</h6>
                    <h6>Box-Office:&nbsp;&nbsp;{data.BoxOffice}</h6>
                    <h6>IMDB Rating:&nbsp;&nbsp;{data.imdbRating}/10</h6>
                    <h6>Production:&nbsp;&nbsp;{data.Production}</h6>
                    <h6>Writer:&nbsp;&nbsp;{data.Writer}</h6>
                </div>
                <div className="moviedetail__plot">
                <h3>Plot</h3>
                    <p>{data.Plot}</p>
                    <h6>Director:&nbsp;&nbsp;{data.Director}</h6>
                    <h6>Actors:&nbsp;&nbsp;{data.Actors}</h6>
                </div>

            </div>
        </div>
    )
}

export default MovieData
