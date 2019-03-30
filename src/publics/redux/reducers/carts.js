const initialState = {
    data: [],
    isLoading: false
}

export default carts = (state = initialState, action) => {
    switch(action.type){
        case 'GET_CARTS_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'GET_CARTS_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_CARTS_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'CREATE_CART_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'CREATE_CART_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'CREATE_CART_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        case 'UPDATE_CART_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'UPDATE_CART_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'UPDATE_CART_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_CART_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'DELETE_CART_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_CART_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}