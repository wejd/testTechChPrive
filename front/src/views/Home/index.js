import React, { Component } from 'react';
import withAuth from './../../actions/withAuth';
import './index.css';
import ClassNames from 'classnames';
import 'font-awesome/css/font-awesome.css';
import Auth from './../../actions/AuthService';
import RiderList from './../../components/RiderList';
import BestRider from './../../components/Rider';
import SearchRider from './../../components/SearchRider';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: 1,
            questionResponse: [],
            notifEligibility: 0,
            notifResponse: 0
        };

        this.toggleActive = this.toggleActive.bind(this);
        this.Auth = new Auth();
    }

    componentWillMount() {


    }

    toggleActive(index) {
        this.setState({
            tabActive: 0
        });
        setTimeout(() => {
            this.setState({
                tabActive: index
            })
        }, 40);

    }


    render() {
        return (
            <div>
                <div className="row menu">
                    <div className="col-4 col-md-4" onClick={() => this.toggleActive(1)}>
                        <div className={ClassNames({'eligibility multipleLines': true, active: this.state.tabActive === 2})}>
                            Overview
                        </div>
                    </div>
                    <div className="col-4 col-md-4" onClick={() => this.toggleActive(3)}>
                        <div className={ClassNames({'question': true, active: this.state.tabActive === 3})}>
                            Best Rider
                        </div>
                    </div>
                    <div className="col-4 col-md-4" onClick={() => this.toggleActive(4)}>
                        <div className={ClassNames({'search': true, active: this.state.tabActive === 4})}>
                            Search Rider
                        </div>
                    </div>
                </div>
                {this.state.tabActive === 1 && <RiderList />}
                {this.state.tabActive === 3 && <BestRider/>}
                {this.state.tabActive === 4 && <SearchRider/>}

            </div>

        );
    }
}

export default withAuth(Home, ['admin', 'courtier', 'commercial']);
