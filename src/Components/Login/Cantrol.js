import React from "react";
import {BrowserRouter as Router , Route } from "react-router-dom";
import Header from "../Header/Header";
import SignUp from "./SignUp";
import PrivateRoute from "./PriviteRoute"
import {AuthProvider} from "./Auth"
import LogHom from "./LogHom"
import SignIn from "./SignIn";
import Home from "../Home/Home";


const Func = () => {
    return(
        <AuthProvider>
            <Router>
                
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/SignIn" component={SignIn}    />
                    <Route exact path="/SignUp" component={SignUp}    />
                
           </Router>
        </AuthProvider>
    )
} ;
export default Func ;