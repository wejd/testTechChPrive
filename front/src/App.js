import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from './views/Login';
import Error from './views/Error';
import Home from './views/Home';
import logo from './assets/img/logo.png';
import 'font-awesome/css/font-awesome.css';
import Auth from './actions/AuthService';
import './App.css';
import Popup from 'react-popup';
import BestRider from './../src/components/Rider';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.Auth = new Auth();
    }

    componentWillMount() {
       this.Auth.loggedIn();

    }

    componentWillUpdate() {
        window.location.reload();
    }

    render() {

        return (
            <div>
                <Popup />
                <header>
                    <a href="/" className="logo"><img src={logo} alt="Sygma logo" /></a>
                </header>
                <Switch>
                    <Route exact path='/login' component={Login}></Route>
                    <Route exact path='/error' component={Error}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route component={Home}></Route>
                </Switch>
            </div>

        );
    }
}

export default App;
