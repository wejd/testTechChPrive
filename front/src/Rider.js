import React, { Component } from 'react';
import request from 'superagent';
import Ridersinfo from './Riderslist';

import './index.css'
const urlForRider = (id) =>
  `http://localhost:8000/api/rider/loyalty/${id}`;

class Rider extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {};
  }

  async componentDidMount() {
    request
      .get(urlForRider('5bffac9e930c5e00120967fb'))
      .then(res => {
        this.setState({
          rider: res.body
        });
      }, (err) => {
        this.setState({
          error: err.toString()
        });
      });
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.rider) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <p>Id: {this.state.rider._id}</p>
        <p>Name: {this.state.rider.name}</p>
        <p>Loyalty Status: {this.state.rider.status}</p>
        <p>Loyalty Point: {this.state.rider.loyality_point}</p>
        <p>Ride number: {this.state.rider.rides.length}</p>
      </div>
    );
  }
}

export default Rider;

