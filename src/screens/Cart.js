import React, { Component } from 'react';
import { Container, Content, View, Icon, Button, Left, Right, Body, ListItem, Thumbnail, Grid, Col, Text } from 'native-base';
import { FlatList } from 'react-native';
import axios from 'axios';

import HeaderItem from '../components/HeaderItem';
import LoadingSpinner from '../components/LoadingSpinner';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cartprods: [],
            colors: [],
            loading: false
        }
    }

    componentWillMount(){
        this.renderDataCart();
    }

    componentWillReceiveProps(){
        this.renderDataCart();
    }

    renderDataCart(){
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: 'http://192.168.0.8:3333/api/v1/orders',
            })
            .then(res => {
                this.setState({
                    cartprods: res.data,
                    loading: false
                });
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    axiosUpdateQty(id, qty){
        axios({
            method: 'patch',
            url: `http://192.168.0.8:3333/api/v1/order/${id}`,
            data: qty
        })
        .then(res => {
            this.renderDataCart();        
        })
        .catch(error => {
            setTimeout(() => {
                this.setState({ loading: false })
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    addQty = (item) => {
        item.qty += 1

        const qty = {
            qty: item.qty
        }

        this.axiosUpdateQty(item.id, qty)
    }

    onSubtract = (item) => {
        item.qty > 1 ? item.qty -= 1 : item.qty = 1;

        const qty = {
            qty: item.qty
        }

        this.axiosUpdateQty(item.id, qty);
    }

    removeItemCart(id){
        axios({
            method: 'delete',
            url: `http://192.168.0.8:3333/api/v1/order/${id}`
        })
        .then(res => {
            this.renderDataCart();
        })
        .catch(err => {
            setTimeout(() => {
                this.setState({ loading: false })
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    checkOut = () => {
        this.props.navigation.navigate('Checkout');
    }

    render(){
        console.disableYellowBox = true;
        const { cartprods } = this.state;

        let totalQty = 0;
        let totalPrice = 0;

        cartprods.forEach((item) => {
            totalQty += item.qty;
            totalPrice += item.qty * item.price_order;
        });
        
        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => this.props.navigation.navigate('ProductList')}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
        );

        return(
            <Container style={{ backgroundColor: '#fdfdfd' }}>
                <HeaderItem left={left} title="My Cart" />
                {this.state.loading ? <LoadingSpinner /> : this.state.cartprods.length <= 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="cart" size={38} style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }} />
                    <Text style={{ color: '#95a5a6' }}>
                        Your cart is empty
                    </Text>
                </View>
                :
                <Content style={{ paddingRight: 10 }}>
                    <FlatList 
                        data={this.state.cartprods}
                        showsVerticalScrollIndicator={true}
                        renderItem={({item}) =>  this.renderItems(item)}
                    />

                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text>Total Qty: {totalQty}</Text>
                        <Text>Total: Rp. {this.formatRupiah(parseInt(totalPrice))}</Text>
                    </View>

                    <Grid style={{ marginTop: 20, marginBottom: 10 }}>
                        <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                            <Button style={{ backgroundColor: '#2c3e50' }} block small iconLeft>
                                <Icon name="cart" />
                                <Text onPress={() => this.props.navigation.navigate('ProductList')} style={{ color: '#fdfdfd' }}>Continue</Text>
                            </Button>
                        </Col>
                        <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                            <Button style={{ borderWidth: 1, borderColor: '#2c3e50' }} block small iconRight transparent onPress={() => this.checkOut()}>
                                <Text style={{ color: '#2c3e50' }}>Checkout</Text>
                                <Icon style={{ color: '#2c3e50' }} name="ios-card" />
                            </Button>
                        </Col>
                    </Grid>
                </Content>
                }
            </Container>
        )
    }

    renderItems(item){
        if(this.state.loading){
            return <ActivityIndicator style={{marginTop: 15}} size="large" color="#233240" />
        }else{
            return(
                <ListItem>
                    <Thumbnail
                        square
                        style={styles.thumbnailCart} 
                        source={{ uri: item.product.image_product }} />
                    
                    <Body 
                        style={styles.bodyItem}>
                        <Text 
                            style={styles.textNameProduct}>
                            {item.product.name_product}
                        </Text>
                        <Text 
                            style={styles.textPriceProduct}>
                            Rp. {this.formatRupiah(parseInt(item.product.price_product))}
                        </Text>
                        <Grid 
                            style={{ marginLeft: 10 }}>
                            <Col>
                                <View 
                                    style={styles.textQty}>
                                    <Text 
                                        style={{ fontSize: 14 }}>
                                        Qty: 
                                    </Text>
                                </View>
                            </Col>
                            <Col size={3}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Button small onPress={() => this.onSubtract(item)} iconLeft transparent>
                                        <Icon style={{ color: '#233240' }} name="remove" />
                                    </Button>
                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{item.qty}</Text>
                                    </View>
                                    <Button onPress={() => this.addQty(item)} small iconLeft transparent>
                                        <Icon style={{ color: '#233240' }}  name="add" />
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    </Body>
                    <Right>
                        <Button 
                            onPress={() => this.removeItemCart(item.id)} 
                            style={{ marginLeft: -25 }} transparent>
                            <Icon 
                                style={{ fontSize: 30, color: '#233240' }} 
                                name="trash" />
                        </Button>
                    </Right>
                </ListItem>
            ); 
        }
    }
}

const styles = {
    thumbnailCart: {
        width: 110, 
        height: 90
    },
    bodyItem: {
        paddingLeft: 2
    },
    textNameProduct: {
        fontSize: 17
    },
    textPriceProduct: {
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 10
    },
    textQty: {
        flex: 1, 
        justifyContent: 'center'
    }
}

export default Cart;