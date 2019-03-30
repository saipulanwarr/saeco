import axios from 'axios';

export const getBanks = () => {
    return{
        type: 'GET_BANKS',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3332/api/v1/banks'
        })
    }
}