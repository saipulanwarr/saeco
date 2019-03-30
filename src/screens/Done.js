import React, { Component } from 'react';
import { Container, Content, Text, Left, Button, Icon, Card, CardItem, Body, View } from 'native-base';
import axios from 'axios';

import HeaderItem from '../components/HeaderItem';

class Done extends Component{
    constructor(props){
        super(props);

        this.state = {
            checkout: [],
            loading: false
        }
    }

    componentDidMount(){
        this.loadDataCheckout();
    }

    loadDataCheckout(){
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: 'http://192.168.0.8:3333/api/v1/getcheckout'
            })
            .then(res => {
                this.setState({
                    loading: false,
                    checkout: res.data
                })
            })
            .catch(err => {
                setTimeout(() => {
                    console.log(err);
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    formatRupiah = (uang) => {
        var reverse = uang.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
        return ribuan;
    }

    render(){
        console.log(this.state.checkout);
        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => this.props.navigation.navigate('Checkout')}>
                    <Icon name="arrow-back" />
                </Button> 
            </Left>
        )

        return(
            <Container style={style.styleContainer}>
                <View style={style.styleView}>
                    <Icon name="ios-checkmark-circle-outline" style={style.styleIcon} />
                    <Text style={{ fontSize: 20 }}>thank you successful transaction</Text>
                    <Text style={{ fontWeight: 'bold' }}> {this.props.navigation.state.params.fullname}</Text>

                    <Button 
                        iconLeft 
                        block 
                        small
                        style={{ backgroundColor: '#233240', marginTop: 10, marginLeft: 25, marginRight: 25 }}
                        onPress={() => this.props.navigation.navigate('ProductList')}
                    >
                        <Icon name="cart" />
                        <Text>Continue Shopping</Text>
                </Button>

                </View>
            </Container>
        )
    }
}

const style = {
    styleContainer: {
        backgroundColor: '#fdfdfd'
    },
    styleView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    styleIcon: {
        fontSize: 50, 
        color: '#95a5a6'
    },
    styleButton: {
        backgroundColor: '#233240', 
        marginTop: 10, 
        marginLeft: 70, 
        marginRight: 70
    }
}

export default Done;