const initialState = {
    data: [],
    isLoading: false
}

export default products = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PRODUCT_PENDING':
            return{
                isLoading: true
            }
        
        case 'GET_PRODUCT_REJECTED':
            return {
                isLoading: false
            }
        
        case 'GET_PRODUCT_FULFILLED':
            return{
                isLoading: false,
                data: action.payload.data
            }
        
        default:
            return state;
    }
}