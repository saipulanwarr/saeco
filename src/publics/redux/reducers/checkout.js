const initialState = {
    data: [],
    isLoading: false
}

export default checkout = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_CHECKOUT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'CREATE_CHECKOUT_REJECTED':
            return{
                ...state,
                isLoading: false
            }
        
        case 'CREATE_CHECKOUT_FULFILLED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_CHECKOUT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_CHECKOUT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_CHECKOUT_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}