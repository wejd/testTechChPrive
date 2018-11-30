import axios from 'axios';
import { isNil } from 'lodash';
import AuthService from './AuthService';

export default function (method, url, params, callBackError, callBackSuccess) {
    let Auth = new AuthService();
    let header = {token : Auth.getToken()};

    axios({
        method: method,
        url: url,
        headers:header,
        params: params
    })
    .then(response => {
        Auth.setToken(response.data.token);
        callBackSuccess(response);
    })
    .catch(error => {
        let errorMessage = (error && !isNil(error.response)) ? error.response.data.message : 'Oups une erreur est survenue';

        let errorDetails = (error && !isNil(error.response)) ? error.response.data.errors : null;

        if(!isNil(error.response)){
            if(error.response.status === 401) {
                Auth.logout();
                window.location.href='/login';
            }
        }

        callBackError(errorMessage, errorDetails);
    });

}
