import React, { Component } from 'react';

class Error extends Component {
    componentWillMount() {
        if(this.props.location.state === undefined)
            this.props.location.state = {message: 'Oups, le serveur a retourné une erreur'};
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                </div>
                <div className="row">
                    <div className="col loginBanner d-none d-md-block">
                    </div>
                    <div className="col mainFormContainer">
                        <h1>BIENVENUE SUR Entreprise</h1>
                        <br/>
                        <h4>{this.props.location.state.message}</h4>
                        <a className="btn" href="/home">Se connecter</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;
