import { isNil } from 'lodash';

export default class AuthService {
    constructor(domain) {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {
        if(email === 'olivier.levine@chauffeur-prive.com') {
            this.setToken({
                nom: 'daghfous',
                prenom: 'wejd',
                role: 'admin'
            });
            return Promise.resolve({
                nom: 'daghfous',
                prenom: 'wejd',
                role: 'admin'
            });
        }
        else {
            return Promise.reject({error: 'not found'})
        }
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        return false;
    }

    setToken(token) {
        if(isNil(token))
            return;

        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    getProfile() {
        return {
            nom: 'daghfous',
            prenom: 'wejd',
            role: 'courtier'
        };
    }

}
