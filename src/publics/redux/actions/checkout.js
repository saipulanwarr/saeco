import axios from 'axios';

export const createCheckout = (body) => {
    return{
        type: 'CREATE_CHECKOUT',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3332/api/v1/checkout',
            data: body
        })
    }
}

export const getCheckout = () => {
    return{
        type: 'GET_CHECKOUT',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3332/api/v1/checkout'
        })
    }
}