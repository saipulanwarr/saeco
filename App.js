import React from 'react';
import {createSwitchNavigator, createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/publics/redux/store';

import LandingPage from './src/screens/Home/';
import Dashboard from './src/screens/Dashboard';
import ProductDetail from './src/screens/ProductDetail';
import ProductList from './src/screens/ProductList';
import Carts from './src/screens/Carts';
import Checkouts from './src/screens/Checkouts';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile';

import ListProducts from './src/screens/ListProducts';
import Cart from './src/screens/Cart';
import DetailProduct from './src/screens/DetailProduct';
import Checkout from './src/screens/Checkout';
import Done from './src/screens/Done';
import SideBar from './src/components/SideBar';
import HandleError from './src/screens/HandleError';

const ProdList = createStackNavigator({
  Dashboard: { 
    screen: Dashboard,
    navigationOptions: {
      header: null
    } 
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      header: null
    }
  },
  ListProducts: {
    screen: ListProducts,
    navigationOptions: {
      header: null
    }
  },
  Carts: {
    screen: Carts,
    navigationOptions: {
      header: null
    }
  },
  Checkouts: {
    screen: Checkouts,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  ProductList: { 
    screen: ProductList,
    navigationOptions: {
      header: null
    } 
  },
  CartList: {
    screen: Cart,
    navigationOptions: {
      header: null
    }
  },
  HandleError: {
    screen: HandleError,
    navigationOptions: {
      header: null
    }
  },
  DetailProduct: { 
    screen: DetailProduct,
    navigationOptions: {
      header: null,
    } 
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      header: null,
    }
  },
  Done: {
    screen: Done,
    navigationOptions:{
      header: null,
    }
  }
});

const PageDrawer = createDrawerNavigator(
  {
    PageDrawerSc: { screen: ProdList }  
  }
  ,
    {
       contentComponent: props => <SideBar {...props} />
    }
)

const switchNavigator = createSwitchNavigator({
  LandingPage,
  PageDrawer
});

const AppRoot = createAppContainer(switchNavigator);

export default class Root extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <AppRoot />
      </Provider>
    )
  }
} 