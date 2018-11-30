import React, { Component } from 'react';
import AuthService from './../../actions/AuthService';
import './index.css';
import { isNil } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            errorMessage : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                let role = res.role;

                if(role === 'rider')
                    return this.props.history.replace('/rider');

                this.props.history.replace('/');
            })
            .catch(err => {
                if(!isNil(err.response)) {
                    err.response.json().then(data => {
                        this.setState({
                            password :'' ,
                            errorMessage: data.message
                        });
                    });
                } else {
                    this.setState({
                        password :'' ,
                        errorMessage: 'Connexion incorrecte, veuillez vérifier vos identifiants'
                    });
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Chauffeur Privé</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col loginBanner d-none d-md-block">
                    </div>
                    <div className="col mainFormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <h4>Se connecter</h4>
                            <div className={this.state.errorMessage ? 'errorInfo' : null}>{this.state.errorMessage}</div>

                            <input type='email' value={this.state.email} name='email' onChange={this.handleChange}/>
                            <button type="submit" className="btn">Se connecter</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
