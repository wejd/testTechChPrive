import React, { Component } from 'react';
import request from 'superagent';
import { setInterval } from 'timers';

import Profile from './../Profile';



class RiderList extends Component {
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

        <Profile data={item}/>
        </div>
    })
    return (

        <div className="container" style={{marginTop: '12px'}}>
        <div className="row">
        {listItems}
        </div>
    </div>
    );

  }
}

export default RiderList;

