import axios from 'axios';

export const getCouriers = () => {
    return{
        type: 'GET_COURIERS',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3332/api/v1/couriers'
        })
    }
} 