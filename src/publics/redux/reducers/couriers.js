const initialState = {
    data: [],
    isLoading: false
}

export default couriers = (state = initialState, action) => {
    switch(action.type){
        case 'GET_COURIERS_PENDING':
            return{
                isLoading: true
            }

        case 'GET_COURIERS_REJECTED':
            return{
                isLoading: false
            }

        case 'GET_COURIERS_FULFILLED':
            return{
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}