import axios from 'axios';

export const getCarts = () => {
    return{
        type: 'GET_CARTS',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3332/api/v1/orders'
        })
    }
}

export const createCart = (body) => {
    return{
        type: 'CREATE_CART',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3332/api/v1/order',
            data: body
        })
    }
}

export const updateCart = (id, body) => {
    return{
        type: 'UPDATE_CART',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3332/api/v1/order/${id}`,
            data: body
        })
    }
}

export const deleteCart = (body) => {
    return{
        type: 'DELETE_CART',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3332/api/v1/order/${body.id}`
        })
    }
}