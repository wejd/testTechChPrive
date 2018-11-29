import React, { Component } from 'react';
import './index.css';
import request from 'superagent';
import { setInterval } from 'timers';




class RiderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ridersTab : []
    };
  }

  async componentDidMount() {
    setInterval(() => {
        request
      .get('http://localhost:8000/api/rider/riders')
      .then(res => {
        this.setState({
            ridersTab: res.body
        });
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
    if (!this.state.ridersTab) {
      return <p>Loading...</p>;
    }
    const listItems = this.state.ridersTab.map((item, i) => {
        return <div  key={i} className = 'riderLine'>
        <div style= {{display: 'inline-block', margin: '12px'}}>{item._id}</div>
        <div style= {{display: 'inline-block', margin: '12px'}}>{item.name}</div>
        <div style= {{display: 'inline-block', margin: '12px'}}>{item.status}</div>
        <div style= {{display: 'inline-block', margin: '12px'}}>{item.loyality_point}</div>
        </div>
    })
    return (
        <ul>
        {listItems}
        </ul>
    );

  }
}

export default RiderInfo;

