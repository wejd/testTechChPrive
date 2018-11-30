import React, { Component } from 'react';
import AuthService from './AuthService';
import {includes} from 'lodash';

export default function withAuth(AuthComponent, role) {
    const Auth = new AuthService();

    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            };
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    if(!includes(role,profile.role))
                        return this.props.history.replace({
                            pathname: '/error',
                            state: { message: 'Vous n\'avez pas les droits pour accéder a cette page'}
                        });
                    this.setState({
                        user: profile
                    });
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent
                        history={this.props.history}
                        user={this.state.user}
                    />
                );
            }

            return null;
        }
    };
}
