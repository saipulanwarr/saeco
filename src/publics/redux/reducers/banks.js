const initialState = {
    data: [],
    isLoading: false
}

export default banks = (state = initialState, action) => {
    switch(action.type){
        case 'GET_BANKS_PENDING':
            return{
                isLoading: true
            }

        case 'GET_BANKS_REJECTED':
            return{
                isLoading: false
            }

        case 'GET_BANKS_FULFILLED':
            return{
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}