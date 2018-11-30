import React, { Component } from 'react';
import request from 'superagent';
import Profile from './../Profile';

//import './app.css'


class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    setInterval(() => {
      request
      .get('http://localhost:8000/api/rider/bestrider')
      .then(res => {
        this.setState({
          rider: res.body
        })
      }, (err) => {
        this.setState({
          error: err.toString()
        });
      });
    }, 500);
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.rider) {
      return <p>Loading...</p>;
    }
    return (
      <div style={{textAlign: 'center', paddingLeft: '29%', margin: '4%', width:'100%'}}>
       <Profile data={this.state.rider} />
      </div>
    );
  }
}

export default Rider;

