import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import RiderInfo from './Riderslist';

import Rider from './Rider.js';

class App extends Component {
  render() {
    return (
      /* <div className="App">
        <h1>Loyalty program</h1>
        <Rider id="5bffac9e930c5e00120967fb" />
      </div> */
      <Router>
      <div>
        <ul style={{display: 'flex', padding: '3px'}}>
          <li style={{ padding: '3px', listStyleType: 'none'}}>
            <Link to="/">List Riders</Link>
          </li>
          <li style={{ padding: '3px', listStyleType: 'none'}}>
            <Link to="/">List Riders</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={RiderInfo} />

      </div>
    </Router>
    );
  }
}

export default App;
