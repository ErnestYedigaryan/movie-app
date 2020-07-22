import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import {Container} from "reactstrap";
import Footer from "./Components/Footer/Footer";
import MoviePage from "./Components/MoviePage/MoviePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MoviePage2 from "./Components/MoviePage/MoviePage2";
import Search from "./Components/Search/Search";
import Actor from "./Components/Actor/Actor";
import About from "./Components/About/About";
import Collections from "./Components/Collections/Collections";
import Collection from "./Components/Collections/Collection";
import fire from "./Components/Login/fire";
import {AuthProvider} from "./Components/Login/Auth"
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";

const styles = {
    background: {
        backgroundColor: "#0c1f28",
        minHeight: "450px"
    }
}

function App() {

    const [user, setUser] = useState({})

    useEffect(() => {
        authListener();
    })

    const authListener = () => {
        fire.auth().onAuthStateChanged((currentUser) => {
            if(currentUser) {
                setUser({currentUser});
            } else {
                setUser(null);
            }
        })
    }


  return (
      <Router>
        <Header/>
        <Container style={styles.background} fluid>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/search" exact component={Search}/>
                <Route path="/search/:query" exact component={Search}/>
                <Route path="/about" exact component={About}/>
                <Route path="/actors/:id" exact component={Actor}/>
                <Route path="/movies/:id" exact component={MoviePage}/>
                <Route path="/movies1/:id" exact component={MoviePage2}/>
                <Route path="/collections" exact component={Collections}/>
                <Route path="/collections/:id" exact component={Collection}/>
                <Route exact path="/SignUp" component={SignUp}    />
                <Route exact path="/SignIn" component={SignIn}    />
        
            </Switch>

        </Container>
        <Footer/>
      </Router>
  )
}

export default App;
