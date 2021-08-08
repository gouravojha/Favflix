import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { horrorMovies, scifi, action, drama } from "./genres";
// import { Redirect, Route,Switch} from 'react-router-dom';
import MovieData from "./MovieData";
import Login from "./Login";
import { auth } from "./firebase";
import { logout,selectUser } from './features/userSlice';
import { useDispatch,useSelector } from "react-redux";
import './App.css';

function App() {
  const [detail, setDetail] = useState({
    "Released": null
  })
  const [click, setClick] = useState(true)
  // const history = useHistory();
  const [titleMov, setTitle] = useState("")
  const [trend1 , setTrend1] = useState([])
  const [trend2 , setTrend2] = useState([])
  const [trend3 , setTrend3] = useState([])
  const [trend4 , setTrend4] = useState([])

  const [show1 , setShow1] = useState([])
  const [show2 , setShow2] = useState([])
  const [show3 , setShow3] = useState([])
  const [show4 , setShow4] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?t=${titleMov}&apikey=8f6dad4b`)
      .then(res => { return (res.json()) })
      .then(data => {
        setDetail(data)
        console.log(titleMov)
      }).catch(error => alert(error.message + "  Connect to the Internet"));
  }, [titleMov]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=1`)
    .then(res => {return (res.json())} )
    .then(data => {
      setTrend1(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=2`)
    .then(res => {return (res.json())} )
    .then(data => {
      setTrend2(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=3`)
    .then(res => {return (res.json())} )
    .then(data => {
      setTrend3(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=4`)
    .then(res => {return (res.json())} )
    .then(data => {
      setTrend4(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=1`)
    .then(res => {return (res.json())} )
    .then(data => {
      setShow1(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=2`)
    .then(res => {return (res.json())} )
    .then(data => {
      setShow2(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=3`)
    .then(res => {return (res.json())} )
    .then(data => {
      setShow3(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=e0338419df6ecbe9ebc3b6ad1fc54779&page=4`)
    .then(res => {return (res.json())} )
    .then(data => {
      setShow4(data)
    }).catch(error => alert(error.message + "  Connect to the Internet"));
  },[]);
  function con(movie) {
    setTitle(movie)
  }
  function handleData(movie) {
    setTitle(movie)
  }
  const user = useSelector(selectUser) 
  const handleLogOut = () =>{
    dispatch(logout())
    auth.signOut()
  }
  // console.log(user)
  return (
    <>
      {!user ? (<Login />) : (
        <>
          <div className="App">
            <div className="header">
              <div className="header__left">
                <div className="header__leftLogo">
                  <h3 onClick={() => setClick(true)}>Favflix</h3>
                </div>
              </div>
              <div className="header__middle">
                <div className="header__middleSearch">
                  <input type="text" placeholder="Search" onChange={(e) => handleData(e.target.value)} onClick={() => setClick(false)} />
                </div>
              </div>
              <div className="header__right">
                <div className="header__rightUser">
                  <h4 onClick = {handleLogOut}>Welcome {user.user}</h4>
                  <Avatar onClick = {handleLogOut} src = {user.photo} name={user.user} size="30" round={true} />
                </div>
              </div>
            </div>
            <div>
              {!click ? (
                <MovieData data={detail} />
              ) : (
                null
              )}
            </div>
            <div className="movielist">
              <h4 className="moviegenre__title">Best of Horror</h4>
              <div className="movielist__genre">
                {
                  horrorMovies.map((movie, index) => <div className="movielist__pics" onMouseEnter={() => con(movie.Title)}>
                    <img src={movie.Poster} alt="movie"></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.Title}</h6>
                        <h6>{movie.Year}</h6>
                        <h6>Released:&nbsp;&nbsp;{detail.Released}</h6>
                        <h6>Rated:&nbsp;&nbsp;{detail.Rated}</h6>
                        <h6>Runtime:&nbsp;&nbsp;{detail.Runtime}</h6>
                        <h6>Box-Office:&nbsp;&nbsp;{detail.BoxOffice}</h6>
                        <h6>IMDB Rating:&nbsp;&nbsp;{detail.imdbRating}/10</h6>
                        <h6>Production:&nbsp;&nbsp;{detail.Production}</h6>
                        <h6>Director:&nbsp;&nbsp;{detail.Director}</h6>
                        <h6>Writer:&nbsp;&nbsp;{detail.Writer}</h6>
                        <h6>Actors:&nbsp;&nbsp;{detail.Actors}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Best of Sci-fi</h4>
              <div className="movielist__genre">
                {
                  scifi.map((movie, index) => <div className="movielist__pics" onMouseOver={() => con(movie.Title)}>
                    <img src={movie.Poster} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.Title}</h6>
                        <h6>{movie.Year}</h6>
                        <h6>Released:&nbsp;&nbsp;{detail.Released}</h6>
                        <h6>Rated:&nbsp;&nbsp;{detail.Rated}</h6>
                        <h6>Runtime:&nbsp;&nbsp;{detail.Runtime}</h6>
                        <h6>Box-Office:&nbsp;&nbsp;{detail.BoxOffice}</h6>
                        <h6>IMDB Rating:&nbsp;&nbsp;{detail.imdbRating}/10</h6>
                        <h6>Production:&nbsp;&nbsp;{detail.Production}</h6>
                        <h6>Director:&nbsp;&nbsp;{detail.Director}</h6>
                        <h6>Writer:&nbsp;&nbsp;{detail.Writer}</h6>
                        <h6>Actors:&nbsp;&nbsp;{detail.Actors}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Best of Action</h4>
              <div className="movielist__genre">
                {
                  action.map((movie, index) => <div className="movielist__pics" onMouseOver={() => con(movie.Title)}>
                    <img src={movie.Poster} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.Title}</h6>
                        <h6>{movie.Year}</h6>
                        <h6>Released:&nbsp;&nbsp;{detail.Released}</h6>
                        <h6>Rated:&nbsp;&nbsp;{detail.Rated}</h6>
                        <h6>Runtime:&nbsp;&nbsp;{detail.Runtime}</h6>
                        <h6>Box-Office:&nbsp;&nbsp;{detail.BoxOffice}</h6>
                        <h6>IMDB Rating:&nbsp;&nbsp;{detail.imdbRating}/10</h6>
                        <h6>Production:&nbsp;&nbsp;{detail.Production}</h6>
                        <h6>Director:&nbsp;&nbsp;{detail.Director}</h6>
                        <h6>Writer:&nbsp;&nbsp;{detail.Writer}</h6>
                        <h6>Actors:&nbsp;&nbsp;{detail.Actors}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Best of Drama</h4>
              <div className="movielist__genre">
                {
                  drama.map((movie, index) => <div className="movielist__pics" onMouseOver={() => con(movie.Title)}>
                    <img src={movie.Poster} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.Title}</h6>
                        <h6>{movie.Year}</h6>
                        <h6>Released:&nbsp;&nbsp;{detail.Released}</h6>
                        <h6>Rated:&nbsp;&nbsp;{detail.Rated}</h6>
                        <h6>Runtime:&nbsp;&nbsp;{detail.Runtime}</h6>
                        <h6>Box-Office:&nbsp;&nbsp;{detail.BoxOffice}</h6>
                        <h6>IMDB Rating:&nbsp;&nbsp;{detail.imdbRating}/10</h6>
                        <h6>Production:&nbsp;&nbsp;{detail.Production}</h6>
                        <h6>Director:&nbsp;&nbsp;{detail.Director}</h6>
                        <h6>Writer:&nbsp;&nbsp;{detail.Writer}</h6>
                        <h6>Actors:&nbsp;&nbsp;{detail.Actors}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h3 className="moviegenre__title">Top Trending Movies</h3>
              <h4 className="moviegenre__title">Week 1</h4>
              <div className="movielist__genre">
                {
                  trend1["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.title}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.release_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Week 2</h4>
              <div className="movielist__genre">
                {
                  trend2["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.title}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.release_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Week 3</h4>
              <div className="movielist__genre">
                {
                  trend3["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.title}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.release_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Week 4</h4>
              <div className="movielist__genre">
                {
                  trend4["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.title}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.release_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }





              </div>
              <h3 className="moviegenre__title">Top Trending TV Shows</h3>
              <h4 className="moviegenre__title">Week 1</h4>
              <div className="movielist__genre">
                {
                  show1["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.name}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.first_air_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <h4 className="moviegenre__title">Week 2</h4>
              <div className="movielist__genre">
                {
                  show2["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.name}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.first_air_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>  
              <h4 className="moviegenre__title">Week 3</h4>
              <div className="movielist__genre">
                {
                  show3["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.name}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.first_air_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>  
              <h4 className="moviegenre__title">Week 4</h4>
              <div className="movielist__genre">
                {
                  show4["results"].map((movie, index) => <div className="movielist__pics">
                    <img src= {`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="movie" ></img>
                    <div className="show">
                      <h3>Show Details</h3>
                      <div className="movie__overview">
                        <h6>{movie.name}</h6>
                        <h6>Released:&nbsp;&nbsp;{movie.first_air_date}</h6>
                        <h6>Rated:&nbsp;&nbsp;{movie.vote_average}</h6>
                        <h6>Plot:&nbsp;&nbsp;{movie.overview}</h6>
                      </div>
                    </div>
                  </div>)
                }
              </div>  
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
