import React, { Component } from 'react';
import { Container, Content, Grid, Button, Left, Right, Icon} from 'native-base';

import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getProducts } from '../publics/redux/actions/products';

import HeaderItem from '../components/HeaderItem';
import ListItemProd from '../components/ListItemProd';
import LoadingSpinner from '../components/LoadingSpinner';

class ProductList extends Component{

    componentDidMount(){
        this.loadDataProduct();
    }

    loadDataProduct(){
        this.props.dispatch(getProducts());        
    }

    render(){
        console.disableYellowBox = true;
        const { navigate } = this.props.navigation;

        let left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="menu" />
                </Button>
            </Left>
        );

        let right = (
            <Right style={{ flex: 1 }}>
                <Button transparent>
                    <Icon name="search" />
                </Button>
                <Button transparent onPress={() => this.props.navigation.navigate('CartList')}>
                    <Icon name="ios-cart" />
                </Button>
            </Right>
        )
        
        return(
            <Container>
                <HeaderItem left={left} right={right} title="Product List" />
                <Content padder>
                    <FlatList 
                        numColumns={2}
                        data={this.props.products.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <ListItemProd key={item.id_product} navigate={navigate} product={item} />}
                        refreshing={this.props.products.isLoading}
                        onRefresh={this.loadDataProduct}
                    />
                </Content> 
                
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductList);