import axios from 'axios';

export const register = (body) => {
    return{
        type: 'REGISTER',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3332/api/v1/register',
            data: body
        })
    }
}