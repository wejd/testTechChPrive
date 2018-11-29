import React, { Component } from 'react';
import AuthService from './../../actions/AuthService';
import './index.css';
import MainInput from '../../components/MainInput';
import PasswordInput from '../../components/PasswordInput';
import { isNil } from 'lodash';
import decode from 'jwt-decode';

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
                let role = decode(res.token).role;

                if(role === 'commercial' || role === 'admin')
                    return this.props.history.replace('/commercial');

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
                        <h1>BIENVENUE SUR VOTRE eASSISTANT</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col loginBanner d-none d-md-block">
                    </div>
                    <div className="col mainFormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <h4>Se connecter</h4>
                            <div className={this.state.errorMessage ? 'errorInfo' : null}>{this.state.errorMessage}</div>
                            <MainInput
                                title="E-mail"
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                error={this.state.errorMessage !== ''}
                            />
                            <PasswordInput
                                onChange={this.handleChange}
                                value={this.state.password}
                                error={this.state.errorMessage !== ''}
                                pattern={false}
                                showInfo={false}
                            />
                            <div>
                                <a href="/reset" className="resetLink">Mot de passe oublié ?</a>
                            </div>
                            <button type="submit" className="btn">Se connecter</button>
                            <div>
                                <a className="loginSwitch" href="/register">Pas encore inscrit ? <span>Créer un compte</span></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
