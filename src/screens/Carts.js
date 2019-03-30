import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import Toast from 'react-native-easy-toast';
import Icon from "react-native-vector-icons/Ionicons";

import { getCarts, deleteCart, updateCart } from '../publics/redux/actions/carts';

class Carts extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalVisible: false,
            idDelCart: 0,
            totalPrice: 0,
            cartState: []
        };
    }

    componentDidMount(){
        this.loadDataCarts();
    }

    loadDataCarts(){
        this.props.dispatch(getCarts());
    }

    loadDataTotalPrice(){
        let totalPrice = 0;

        this.props.carts.data.map(cart => {
            totalPrice += cart.qty * cart.price_order
        });

        this.setState({
            totalPrice: totalPrice
        })
    }

    _toggleModal = (id) => {
        this.setState({ isModalVisible: !this.state.isModalVisible, idDelCart: id })
    }

    removeCart = () => {
        this.props.dispatch(deleteCart({
            id: this.state.idDelCart
        }))
       
        this._toggleModal();
        this.refs.toast.show('Produk berhasil dihapus');
        this.loadDataCarts();
    }

    addQty = (item) => {
        item.qty += 1

        const qty = item.qty;

        this.actUpdateCart(item.id, qty);
    }

    onSubtract = (item) => {
        item.qty > 1 ? item.qty -= 1 : item.qty = 1;

        const qty = item.qty;

        this.actUpdateCart(item.id, qty);
    }

    actUpdateCart(id, qty){
        this.props.dispatch(updateCart(id, {
            qty: qty
        }));
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        let totalPrice = 0;
        if(this.props.carts && this.props.carts.data) {
            this.props.carts.data.map(cart => {
                totalPrice += cart.qty * cart.price_order
            });
        }
        
        return(
            <View style={{ flex: 1 }}>
                <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={this.state.isModalVisible}>
                    <View style={{ width: 300, height: 40, backgroundColor: '#ee4d2d', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 17 }}>Konfirmasi</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', width: 300, height: 110 }}>
                        <Text style={{ fontSize: 16, marginLeft: 10, marginTop: 10, borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10 }}>Apakah Anda Yakin Ingin Menghapus Produk Ini ?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ marginTop: 10, marginLeft: 10, backgroundColor: '#00bfa5', width: 130, justifyContent: 'center', alignItems: 'center' }} onPress={this._toggleModal}>
                                <Text style={{ color: 'white', padding: 5, fontSize: 17 }}>Tidak</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#ee4d2d', marginRight: 10, width: 130, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.removeCart()}>
                                <Text style={{ color: 'white', padding: 5, fontSize: 17 }}>Hapus</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </Modal>

                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                        <TouchableOpacity style={{ marginTop: 10, marginLeft: 10 }} onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Icon name="ios-arrow-back" size={30} color='#ee4d2d' />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginLeft: 20, fontSize: 17}}>Keranjang Saya</Text>
                    </View>
                </View>
                {this.props.carts.data.length <= 0 ? <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-cart" size={38} style={{ fontSize: 38, color: '#ee4d2d', marginBottom: 7 }} />
                    <Text style={{ color: '#ee4d2d' }}>
                        Your cart is empty
                    </Text>
                </View>
                :
                <View style={{ flex: 9 }}>
                    <FlatList 
                        data={this.props.carts.data}
                        refreshing={this.props.carts.isLoading}
                        onRefresh={this.getCarts}
                        renderItem={({item}) =>
                            <View> 
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                                    <Image source={{ uri: item.product.image_product }} style={{ width: 100,  height: 100 }} />
                                    <View style={{ width: 240 }}>
                                        <Text style={{ fontSize: 16, marginLeft: 10, width: 200 }}>{item.product.name_product}</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={{ backgroundColor: '#00bfa5',  width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onSubtract(item)}>
                                                <Icon name="ios-remove" size={40} style={{ color: 'white' }} />
                                            </TouchableOpacity>
                                            <View style={{ borderWidth: 0.5, color: 'lightgrey',  width: 40, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                                <Text style={{ fontSize: 18 }}>{item.qty}</Text>
                                            </View>
                                            <TouchableOpacity style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 5, backgroundColor: '#ee4d2d' }} onPress={() => this.addQty(item)}>
                                                <Icon name="ios-add" size={40} style={{ color: 'white' }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#ee4d2d' }}>Rp. {this.formatRupiah(parseInt(item.product.price_product))}</Text>
                                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', right: 2 }}>
                                            <TouchableOpacity style={{ width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._toggleModal(item.id)}>
                                                <Icon name="ios-trash" size={30} style={{ color: '#ee4d2d' }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, borderColor: '#f5f5f5', marginTop: 15 }}></View>
                            </View>
                        }
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, marginLeft: 10 }}>SubTotal <Text style={{ color: '#ee4d2d' }}>Rp .{this.formatRupiah(totalPrice)}</Text></Text>
                        </View>
                        <TouchableOpacity style={{ fontSize: 17, width: 150, backgroundColor: '#ee4d2d', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Checkouts')}>
                            <Text style={{ color: 'white', fontSize: 17 }}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        carts: state.carts
    }
}

export default connect(mapStateToProps)(Carts);