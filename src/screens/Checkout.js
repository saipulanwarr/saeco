import React, { Component } from 'react';
import { Container, Text, Left, Button, Icon, Content, List, ListItem, Thumbnail, Body, View, Item, Input, Picker } from 'native-base';
import axios from 'axios';
import { FlatList } from 'react-native';

import HeaderItem from '../components/HeaderItem';
import LoadingSpinner from '../components/LoadingSpinner';

class Checkout extends Component{
    constructor(){
        super();

        this.state = {
            checkout: [],
            courier: [],
            city: [],
            bank: [],
            selectedCourier: 0,
            selectedProvince: 0,
            selectedCity: 0,
            selectedBank: 0,
            fullname: '',
            email: '',
            notelp: '',
            address: '',
            hasError: false,
            errorText: '',
            province: [],
            totalPrice: 0,
            shipping: 0,
            loading: false,
            checkout_id: 0
        }
    }

    componentWillMount(){
        this.loadDataCart();
        this.loadDataCourier();
        this.loadDataProvince();
        this.loadDataBank();
    }

    loadDataCart(){
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: 'http://192.168.0.8:3333/api/v1/orders'
            })
            .then(res => {
                this.setState({
                    checkout: res.data,
                    loading: false
                })
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    loadDataCourier(){
        axios({
            method: 'get',
            url: 'http://192.168.0.8:3333/api/v1/courier'
        })
        .then(res => {
            this.setState({
                courier: res.data
            })
        })
        .catch(err => {
            setTimeout(() => {
                console.log(err);
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    loadDataShipping(idcourier){
        axios({
            method: 'get',
            url: `http://192.168.0.8:3333/api/v1/shipping/${idcourier}`
        })
        .then(res => {
            this.setState({
                shipping: res.data.shipping
            })
        })
        .catch(error => {
            setTimeout(() => {
                console.log(error)
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    loadDataProvince(){
        axios({
            method: 'get',
            url: 'http://192.168.0.8:3333/api/v1/province'
        })
        .then(res => {
            this.setState({
                province: res.data
            })
        })
        .catch(err => {
            setTimeout(() => {
                console.log(err);
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    loadDataBank(){
        axios({
            method: 'get',
            url: 'http://192.168.0.8:3333/api/v1/bank'
        })   
        .then(res => {
            this.setState({
                bank: res.data
            })
        })
        .catch(err => {
            setTimeout(() => {
                console.log(err);
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    loadDataCity(idprovince){
        axios({
            method: 'get',
            url: `http://192.168.0.8:3333/api/v1/city/${idprovince}`
        })
        .then(res => {
            this.setState({
                city: res.data
            })
        })
        .catch(err => {
            setTimeout(() => {
                console.log(err);
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    renderCourier(courier){
        let items = [<Item key="key" label="Select a Courier" value="" />];
        courier.map((item) => {
            items.push(
                <Item key={item.id} label={item.name_courier} value={item.id} />
            )
        })

        return items;
    }

    selectShipping(idcourier){
       this.loadDataShipping(idcourier);

       this.setState({
           selectedCourier: idcourier
       })
    }

    selectedProvince(province){
        this.setState({
            selectedProvince: province
        })

        this.loadDataCity(province);
    }

    renderProvince(province){
        let itemsProv = [<Item key="key" label="Select a Province" value="" />];
        province.map((item) => {
            itemsProv.push(
                <Item key={item.id} label={item.name_province} value={item.id} />
            )
        })

        return itemsProv;
    }

    renderBank(){
        let items = [<Item key="key" label="Select a Bank" value="" />];
        this.state.bank.map((item) => {
            items.push(
                <Item key={item.id} label={item.name_bank} value={item.id} />
            )
        });

        return items;
    }

    renderCity(){
    
        let itemsCity = [<Item key="key" label="Select a city" value="" />];

        this.state.city.map((item) => {
            itemsCity.push(
                <Item key={item.id} label={item.name_city} value={item.id} />
            )
        })

        return itemsCity;

    }

    verifyEmail(email){
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    buttonOrder(){
        if(this.state.fullname === "" || this.state.email === "" || this.state.notelp === "" || this.state.address === "" || this.state.selectedProvince === 0 || this.state.selectedCity === 0 || this.state.selectedCourier === 0 || this.state.selectedBank === 0){
            this.setState({ hasError: true, errorText: 'Please fill all fields !' });
            return;
        }
        if(!this.verifyEmail(this.state.email)){
            this.setState({ hasError: true, errorText: 'Please enter a valid email  address! ' });
            return;
        }
        if(this.state.fullname.length < 3){
            this.setState({ hasError: true, errorText: 'fullname must contains at least 3 characters !' });
            return;
        }
        if(this.state.address.length < 3){
            this.setState({ hasError: true, errorText: 'address must contains at least 3 characters !' });
            return;
        }

        const addCheckout = {
            fullname: this.state.fullname,
            email: this.state.email,
            notelp: this.state.notelp,
            address: this.state.address,
            province_id: parseInt(this.state.selectedProvince),
            city_id: parseInt(this.state.selectedCity),
            courier_id: parseInt(this.state.selectedCourier),
            bank_id: parseInt(this.state.selectedBank)   
        }

        this.setState({ loading: true }, () => {
            axios({
                method: 'post',
                url: 'http://192.168.0.8:3333/api/v1/addcheckout',
                data: addCheckout
            })
            .then(res => {
                this.setState({ 
                    loading: false,
                    checkout_id: res.data.id 
                });

                this.addDetailCheckout(this.state.checkout_id);
            })
            .catch(err => {
                setTimeout(() => {
                    console.log(err);
                    this.setState({ loading: false });
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    addDetailCheckout(id){
        this.state.checkout.map((item) => {
            const detailCheckout = {
                checkout_id: parseInt(id),
                order_id: parseInt(item.id)
            }

            axios({
                method: 'post',
                url: 'http://192.168.0.8:3333/api/v1/adddetailcheckout',
                data: detailCheckout
            })
            .then(res => {
                this.updateStatusOrder(item.id);
            })
            .catch(err => {
                setTimeout(() => {
                    console.log(err);
                    this.setState({ loading: false });
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    updateStatusOrder(id){
        const status = {
            status: "checkout"
        }

        axios({
            method: 'patch',
            url: `http://192.168.0.8:3333/api/v1/order/${id}`,
            data: status
        })
        .then(res => {
            console.log(this.state.fullname);
            this.setState({ loading: false })
            this.props.navigation.navigate('Done', { fullname: this.state.fullname });
        })
        .catch(error => {
            setTimeout(() => {
                this.setState({ loading: false })
                this.props.navigation.navigate('HandleError');
            }, 5000);
        })
    }

    renderCheckout(item){
        return(
            <ListItem 
                key={item.id}>
                <Thumbnail square style={{ width: 110, height: 90 }} source={{ uri: item.product.image_product }} />
                <Body style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 18 }}>
                        {item.product.name_product}
                    </Text>
                    <Text>
                        Rp. {this.formatRupiah(parseInt(item.product.price_product))}
                    </Text>
                    <Text>
                        Qty: {item.qty}
                    </Text>
                    <Text>
                        Total: Rp. {this.formatRupiah(parseInt(item.qty * item.product.price_product))}
                    </Text>
                </Body>
            </ListItem>
        )
    }

    render(){
        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent>
                    <Icon name="arrow-back" onPress={() => this.props.navigation.navigate('CartList')} />
                </Button>
            </Left>
        )

        let totalPrice = 0;

        this.state.checkout.forEach((item) => {
            totalPrice += item.qty * item.price_order
        })

        return(
            <Container style={{ backgroundColor: '#fdfdfd' }}>
                <HeaderItem left={left} title="Checkout" />
                {this.state.loading ? <LoadingSpinner /> : 
                    <Content style={{ paddingRight: 10 }}>
                        <FlatList 
                            data={this.state.checkout}
                            showsVerticalScrollIndicator={true}
                            renderItem={({item}) => this.renderCheckout(item)}
                        />

                        <Text style={{ marginLeft: 10, marginTop: 10 }}>Shipping: Rp. {this.state.shipping}</Text>
                        <Text style={{ marginLeft: 10, marginTop: 10 }}>Total: Rp. {this.formatRupiah(parseInt(totalPrice) + parseInt(this.state.shipping))}</Text>

                        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, width: '100%' }}>
                            {this.state.hasError ? <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10, backgroundColor: 'red', paddingTop: 5, paddingBottom: 5, color: 'white' }}>{this.state.errorText}</Text>: null}
                            <Item>
                                <Icon active name="people" />
                                <Input placeholder="Full-Name" onChangeText={(text) => this.setState({ fullname: text })} /> 
                            </Item>
                            <Item>
                                <Icon active name="mail" />
                                <Input placeholder="Email" keyboardType="email-address" placeholderTextColor="#687373" onChangeText={(text) => this.setState({ email: text })} />
                            </Item>
                            <Item>
                                <Icon active name="call" style={{ color: '#687373' }} />
                                <Input placeholder="No Telephone" keyboardType = 'numeric' placeholderTextColor="#687373" onChangeText={(text) => this.setState({ notelp: text })} />
                            </Item>
                            <Item>
                                <Icon active name="map" style={{ color: '#687373'}} />
                                <Input placeholder="Address" placeholderTextColor="#687373" onChangeText={(text) => this.setState({ address: text })} />
                            </Item>
                            <Item>
                                <Icon active name="boat" style={{ color: '#687373' }} />
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select a province"
                                    note={true}
                                    selectedValue={this.state.selectedProvince}
                                    onValueChange={(province) => this.selectedProvince(province)}
                                >   
                                    {this.renderProvince(this.state.province)}
                                </Picker>
                            </Item>
                            <Item>
                                <Icon active name="boat" style={{ color: '#687373' }} />
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select a city"
                                    note={true}
                                    selectedValue={this.state.selectedCity}
                                    onValueChange={(city) => this.setState({ selectedCity: city })}
                                >
                                    {this.renderCity(this.state.city)}
                                </Picker>
                            </Item>
                            <Item>
                                <Icon active name="boat" style={{ color: '#687373' }} />
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select a courier"
                                    note={true}
                                    selectedValue={this.state.selectedCourier}
                                    onValueChange={(courier) => this.selectShipping(courier)}
                                >
                                    {this.renderCourier(this.state.courier)}
                                </Picker>
                            </Item>
                            <Item>
                                <Icon active name="boat" style={{ color: '#687373' }} />
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select a bank"
                                    note={true}
                                    selectedValue={this.state.selectedBank}
                                    onValueChange={(bank) => this.setState({ selectedBank: bank })}
                                >
                                    {this.renderBank()}
                                </Picker>
                            </Item>
                        </View>
                        <Button 
                            block 
                            small
                            iconLeft 
                            style={{ backgroundColor: '#233240', marginTop: 10, marginBottom: 5, marginLeft: 10 }} 
                            onPress={() => this.buttonOrder()}
                        >
                            <Icon name="checkmark-circle" />
                            <Text style={{ color: '#fdfdfd' }}>
                                Order
                            </Text>
                        </Button>
                    </Content>
                }
            </Container>
        )
    }
}

export default Checkout;