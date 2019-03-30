import { combineReducers } from 'redux';

import products from './products';
import carts from './carts';
import couriers from './couriers';
import banks from './banks';
import checkout from './checkout';
import register from './register';
import login from './login';

const appReducer = combineReducers({
    products,
    carts,
    couriers,
    banks,
    checkout,
    register,
    login
});

export default appReducer;