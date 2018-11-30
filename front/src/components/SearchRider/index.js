import React, { Component } from 'react';
import request from 'superagent';
import Profile from './../Profile';

const urlForRider = (id) =>
  `http://localhost:8000/api/rider/search/${id}`;


class SearchRider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ridersTab : []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    if(value.length === 0) {
        this.setState({
            ridersTab: []
        })
    }else {
        request
        .get(urlForRider(value))
        .then(res => {
          this.setState({
              ridersTab: res.body
          })

        }, (err) => {
          console.log(err)
        });
    }

}
  componentDidMount() {

  }

  render() {
    const listItems = this.state.ridersTab.map((item, i) => {
        return <div  key={i} className = 'riderLine'>

        <Profile data={item}/>
        </div>
    })
    return (
        <div>
        <div style={{marginLeft: '35%', marginTop:'15px'}}>
            <label style={{fontSize: '28px'}}> Search Rider by Name : </label>
            <input type='text' value={this.state.val} name='test' onChange={this.handleChange} style={{width: '300px', height:'40pxé'}}/>
        </div>

        <div className="row">
        {listItems}
        </div>
        </div>

    );
  }
}

export default SearchRider;

