import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { BottomSheet } from 'react-native-btr';

import { getCarts } from '../publics/redux/actions/carts';
import { getCouriers } from '../publics/redux/actions/couriers';
import { getBanks } from '../publics/redux/actions/banks';
import { createCheckout, getCheckout } from '../publics/redux/actions/checkout';

class Checkouts extends Component{

    constructor(){
        super();

        this.state = {
            visible: false,
            visibleBank: false,
            selectedItemCourier: [],
            selectedItemBank: [],
            shipping: 0
        }
    }

    componentDidMount(){
        this.loadDataCarts();
        this.loadDataBanks();
        this.loadDataCouriers();
        this.loadDataCheckout();
    }

    _toggleBottomNavigationView = () => {
        this.setState({ visible: !this.state.visible });
    }

    _toggleBottomNavigationViewBank = () => {
        this.setState({ visibleBank: !this.state.visibleBank });
    }

    loadDataCarts(){
        this.props.dispatch(getCarts());
    }

    loadDataBanks(){
        this.props.dispatch(getBanks());
    }

    loadDataCouriers(){
        this.props.dispatch(getCouriers());
    }

    loadDataCheckout(){
        this.props.dispatch(getCheckout());
    }

    selectedCourier(item){
        this.setState({
            selectedItemCourier: item,
            shipping: item.shipping
        })

       this._toggleBottomNavigationView();
    }

    selectedBank(item){
        this.setState({
            selectedItemBank: item
        })

        this._toggleBottomNavigationViewBank();
    }

    addCheckout = () => {
        this.props.dispatch(createCheckout({
            fullname: "saipul anwar",
            courier_id: this.state.selectedItemCourier.id,
            bank_id: this.state.selectedItemBank.id
        }));

        console.log(this.props.checkout.data);
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        let totalPrice = 0;
        if(this.props.carts && this.props.carts.data){
            this.props.carts.data.map(cart => {
                totalPrice += cart.qty * cart.price_order
            })
        }
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                        <TouchableOpacity style={{ marginTop: 10, marginLeft: 10 }} onPress={() => this.props.navigation.navigate('Carts')}>
                            <Icon name="ios-arrow-back" size={30} color="#ee4d2d" />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginLeft: 20, fontSize: 18 }}>Checkout</Text>
                    </View>
                </View>

                <View style={{ flex: 9 }}>
                    <ScrollView>
                        <View style={{ backgroundColor: '#f5f5f5', padding: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="ios-pin" size={25} color="#ee4d2d" />
                                <Text style={{ marginLeft: 10 }}>Alamat Pengiriman</Text>
                            </View>
                            <Text style={{ marginLeft: 20 }}>Saipul Anwar | 081384832332</Text>
                            <Text style={{ marginLeft: 20 }}>Kp Kalibata Rt 04/03 Bantarjati Bogor Utara, Kota Bogor 16153</Text>
                        </View>
                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 10, right: 10 }}>
                            <TouchableOpacity>
                                <Icon name="ios-arrow-dropright" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10}}>
                            <Icon name="ios-browsers" size={20} />
                            <Text style={{ marginLeft: 10 }}>Kanata Store</Text>
                        </View>
                        <FlatList
                            data={this.props.carts.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) => 
                                <View>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#f5f5f5', padding: 10 }}>
                                        <Image source={{ uri: item.product.image_product}} style={{ width: 60, height: 60 }} />
                                        <View style={{ width: 280 }}>
                                            <Text style={{ marginLeft: 10 }}>{item.product.name_product}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ marginLeft: 10, marginTop: 10 }}>Rp. {this.formatRupiah(item.product.price_product)}</Text>
                                                <Text style={{ marginTop: 10 }}>X{item.qty}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 10 }}>
                                        <Text>Pesan: </Text>
                                        <TextInput placeholder="Silahkan tinggalkan pesan..." style={{ width: 170, marginLeft: 30 }} />
                                    </View>
                                </View>
                            }
                        />
                        <View style={{ padding: 10, borderTopWidth: 0.5, color: '#f5f5f5' }}>
                            <TouchableOpacity onPress={this._toggleBottomNavigationView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-car" size={20} />
                                    <Text style={{ marginLeft: 10 }}>Opsi Pengiriman</Text>
                                </View>
                                {this.state.selectedItemCourier == "" ?
                                    <View><Text>Silahkan Pilih</Text></View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: this.state.selectedItemCourier.image_courier }} style={{ width: 30, height: 30, marginTop: 5, marginBottom: 5 }} resizeMode="center" />
                                        <View>
                                            <Text style={{ marginLeft: 10 }}>{this.state.selectedItemCourier.name_courier}</Text>
                                            <Text style={{ marginLeft: 10 }}>dalam 1 - 2 hari</Text>
                                        </View>
                                    </View>
                                }
                                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 5, right: 5 }}>
                                    <Icon name="ios-arrow-dropright" size={25} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10, borderTopWidth: 0.5, color: '#f5f5f5' }}>
                            <TouchableOpacity onPress={() => this._toggleBottomNavigationViewBank()}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-cash" size={20} />
                                    <Text style={{ marginLeft: 10 }}>Metode Pembayaran</Text>
                                </View>
                                {this.state.selectedItemBank == "" ?
                                    <View><Text>Silahkan Pilih</Text></View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: this.state.selectedItemBank.image_bank }} style={{ width: 30, height: 30, marginTop: 5, marginBottom: 5 }} resizeMode="center" />
                                        <View>
                                            <Text style={{ marginLeft: 10 }}>{this.state.selectedItemBank.name_bank}</Text>
                                        </View>
                                    </View>
                                }
                                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 5, right: 5 }}>
                                    <Icon name="ios-arrow-dropright" size={25} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10, borderTopWidth: 0.5, color: '#f5f5f5' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Subtotal untuk produk</Text>
                                <Text>Rp. {this.formatRupiah(totalPrice)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Subtotal Pengiriman</Text>
                                <Text>Rp. {this.formatRupiah(this.state.shipping)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>Total Pembayaran</Text>
                                <Text style={{ color: '#ee4d2d' }}>Rp. {this.formatRupiah(totalPrice + parseInt(this.state.shipping))}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#f5f5f5', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.addCheckout()} style={{ backgroundColor: '#ee4d2d', width: 250, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', padding: 5 }}>Buat Pesanan</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this._toggleBottomNavigationView}
                    onBackdropPress={this._toggleBottomNavigationView}
                >
                    <View style={{ backgroundColor: 'white', height: 250, width: '100%' }}>
                        <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                            <Icon name="ios-car" size={20} />
                            <Text style={{ fontSize: 16, marginLeft: 15 }}>Opsi Pengiriman</Text>
                        </View>
                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 10 }} >    
                            <TouchableOpacity style={{ backgroundColor: '#ee4d2d', width: 20, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', opacity: 0.8 }} onPress={this._toggleBottomNavigationView}>
                                <Icon name="ios-close" size={20} color='white' />
                            </TouchableOpacity>
                        </View>

                        <FlatList 
                            data={this.props.couriers.data}
                            refreshing={this.props.couriers.isLoading}
                            onRefresh={this.getCouriers}
                            renderItem={({item}) => 
                            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                                <TouchableOpacity onPress={() => this.selectedCourier(item)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: item.image_courier }}     resizeMode="center" style={{ width: 50, height: 30 }} />
                                        <View>
                                            <Text style={{ marginLeft: 10, fontSize: 14 }}>{item.name_courier}</Text>
                                            <Text style={{ marginLeft: 10, fontSize: 14 }}>Diterima dalam 1-2 hari</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        />
                    </View>
                </BottomSheet>

                <BottomSheet
                    visible={this.state.visibleBank}
                    onBackButtonPress={this._toggleBottomNavigationViewBank}
                    onBackdropPress={this._toggleBottomNavigationViewBank}
                >
                    <View style={{ backgroundColor: 'white', height: 250, width: '100%' }}>
                        <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                            <Icon name="ios-cash" size={25} />
                            <Text style={{ fontSize: 17, marginLeft: 15 }}>Metode Pembayaran</Text>
                        </View>
                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 8, right: 10 }} >    
                            <TouchableOpacity style={{ backgroundColor: '#ee4d2d', width: 20, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', opacity: 0.8 }} onPress={this._toggleBottomNavigationViewBank}>
                                <Icon name="ios-close" size={20} color='white' />
                            </TouchableOpacity>
                        </View>

                        <FlatList 
                            data={this.props.banks.data}
                            refreshing={this.props.banks.isLoading}
                            onRefresh={this.getBanks}
                            renderItem={({item}) => 
                            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5' }}>
                                <TouchableOpacity onPress={() => this.selectedBank(item)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={{ uri: item.image_bank }}     resizeMode="center" style={{ width: 50, height: 30 }} />
                                        <View>
                                            <Text style={{ marginLeft: 10, fontSize: 14 }}>{item.name_bank}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        />
                    </View>
                </BottomSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        carts: state.carts,
        couriers: state.couriers,
        banks: state.banks,
        checkout: state.checkout
    }
}

export default connect(mapStateToProps)(Checkouts);