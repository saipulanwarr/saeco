import axios from 'axios';

export const getProducts = () => {
    return{
        type: 'GET_PRODUCT',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3332/api/v1/products'
        })
    }
}