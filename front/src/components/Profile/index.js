import React, { Component } from 'react';
import './index.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="blockProfile" >
            <div className="well profile">
                <div >
                    <div >
                        <h2>{this.props.data.name}</h2>
                        <p><strong>Id: </strong> {this.props.data._id}. </p>
                        <p><strong>Phone: </strong> {this.props.data.phone_number}. </p>
                    </div>
                </div>
                <div className=" divider text-center">
                    <div className=" emphasis">
                        <h2><strong>  {(this.props.data.rides === undefined) ? 0 : this.props.data.rides.length} </strong></h2>
                        <p><small>Rides</small></p>
                    </div>
                    <div className="emphasis">
                        <h2><strong>{this.props.data.loyality_point}</strong></h2>
                        <p><small>Loyality point</small></p>
                    </div>
                    <div className=" emphasis">
                        <h2><strong>{this.props.data.status}</strong></h2>
                        <p><small>Status</small></p>
                    </div>
                </div>
            </div>
        </div>
    );

  }
}

export default Profile;





