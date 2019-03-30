const initialState = {
    data: [],
    isLoading: false
}

export default login = (state = initialState, action) => {
    switch(action.type){
        case 'GET_LOGIN_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_LOGIN_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_LOGIN_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data.token
            }

        default:
            return state;
    }
}