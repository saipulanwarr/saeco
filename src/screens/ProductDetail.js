import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { BottomSheet } from "react-native-btr";
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';

import { createCart, getCarts, updateCart } from '../publics/redux/actions/carts';

class ProductDetail extends Component{

    constructor(props){
        super(props);
        this.item = null;

        if(props.navigation.state.params && props.navigation.state.params.item){
            this.item = props.navigation.state.params.item;
        }

        this.state = {
            visible: false,
            qty: 1
        };
    }

    componentDidMount(){
        this.loadDataCarts();
    }

    loadDataCarts = () => {
        this.props.dispatch(getCarts());
    }

    _toggleBottomNavigationView = () => {
        this.setState({ visible: !this.state.visible });
    }

    checkQtySelectProduct(){
        this.props.carts.data.map(cart => {
            if(cart.product_id == this.item.id){
                this.setState({
                    qty: cart.qty
                })
            }
        })
    }

    openBottomViewAddCart(){
        this._toggleBottomNavigationView();
        this.checkQtySelectProduct();
    }

    addQty = () => {
        this.state.qty += 1

        this.setState({
            qty: this.state.qty
        })
    }

    onSubtract = () => {
        this.state.qty > 1 ? this.state.qty -= 1 : this.state.qty = 1;
        
        this.setState({
            qty: this.state.qty
        })
    }

    addToCart = () => { 
        let dataCart = false;
        let idCart = 0;

        this.props.carts.data.map(cart => {
            if(cart.product_id == this.item.id){
                dataCart = true;
                qty = this.state.qty;
                idCart = cart.id;
            }
        })

        if(dataCart){
           this.props.dispatch(updateCart(idCart, {
               qty: this.state.qty
           }))

           this._toggleBottomNavigationView();
           this.refs.toast.show('Produk Telah Di Tambahkan');

        }else{
            this.props.dispatch(createCart({
                qty: this.state.qty,
                price_order: this.item.price_product,
                status: 'cart',
                product_id: this.item.id
            }))

            this._toggleBottomNavigationView();
            this.refs.toast.show('Produk Berhasil Di Tambahkan');
        }
    }

    actBuyNow = () => {
        this.props.dispatch(createCart({
            qty: this.state.qty,
            price_order: this.item.price_order,
            state: 'cart',
            product_id: this.item.id
        }))
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flex: 9 }}>
                    <ScrollView>
                        <View>
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
                            <Image source={{ uri: this.item.image_product }} style={{ width: '100%', height: 300 }} />
                            <TouchableOpacity style={{ backgroundColor: '#ee4d2d', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', opacity: 0.8, marginTop: 5, marginLeft: 5 }} onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back" size={20} color='white' />
                            </TouchableOpacity> 
                            <Text style={{ paddingHorizontal: 10, marginTop: 20, fontSize: 17, fontWeight: 'bold' }}>{this.item.name_product}</Text> 
                            <Text style={{ paddingHorizontal: 8, fontSize: 18, color: '#ee4d2d' }} > Rp. {this.formatRupiah(parseInt(this.item.price_product))}</Text>

                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={{ flexDirection: 'row', borderWidth: 3, borderColor: '#f5f5f5', padding: 8, width: 130, marginLeft: 10, marginTop: 8, borderRadius: 5 }}>
                                    <Icon name="ios-heart" size={20} />
                                    <Text style={{marginLeft: 5}}>Favorit</Text>
                                    <Text style={{ marginLeft: 20 }}>100</Text>
                                </View>

                                <View style={{ flexDirection: 'row', borderWidth: 3, borderColor: '#f5f5f5', padding: 8, width: 150, marginLeft: 10, marginTop: 8, borderRadius: 5 }}>
                                    <Icon name="ios-star-outline" size={20} />
                                    <Text style={{marginLeft: 5}}>Penilaian</Text>
                                    <Text style={{ marginLeft: 20 }}>100</Text>
                                </View>

                                <View style={{ flexDirection: 'row', borderWidth: 3, borderColor: '#f5f5f5', padding: 8, width: 40, marginLeft: 10, marginTop: 8, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="ios-share" size={20} />
                                </View>
                            </View>
                            
                            <Text style={{ borderBottomWidth: 8, borderColor: '#f5f5f5' }}></Text>
                            <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Rincian Produk</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Kategori</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>Handphone</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Merk</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>Samsung</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Model HP</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>Samsung Galaksi S7 edge</Text>
                                </View>
                            </View>
                            
                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Kapasitas</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>32 GB</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Tipe Kartu SIM</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>Micro</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Warna</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>Black</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, borderWidth: 0.5, borderColor: 'grey', color: 'black', width: 150, backgroundColor: 'lightgrey', opacity: 0.5, fontWeight: 'bold' }}>Stok</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'grey', width: 220, paddingTop: 10, paddingBottom: 10 }}>6</Text>
                                </View>
                            </View>
                            <Text style={{ borderBottomWidth: 8, borderColor: '#f5f5f5' }}></Text>
                            <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Detail Produk</Text>
                            <Text style={{ marginTop: 10, paddingHorizontal: 10, fontSize: 16  }}>{this.item.description_product}</Text>
                        </View>
                </ScrollView>
               </View>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight onPress={() => this.openBottomViewAddCart()} style={{ backgroundColor: '#00bfa5', width: 150 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="ios-cart" size={30} color="white" />
                            <Text style={{ color: 'white' }}>Masukan Keranjang</Text>                    
                        </View>             
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.actBuyNow()} style={{ backgroundColor: '#ee4d2d', width: 220, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Beli Sekarang</Text>     
                        </View>
                    </TouchableHighlight>
               </View>

               <BottomSheet
                    visible={this.state.visible}
                    onBackButtonPress={this._toggleBottomNavigationView}
                    onBackdropPress={this._toggleBottomNavigationView}
               >
                    <View style={{ backgroundColor: '#fff', height: 250, width: '100%' }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10}}>
                            <Image source={{ uri: this.item.image_product }} style={{ height: 100, width: 100, marginTop: 10 }} />
                            <View style={{ width: 205, marginTop: 10 }}>
                                <Text style={{ marginLeft: 5, fontSize: 16 }}>{this.item.name_product}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 16, color: '#ee4d2d' }}>Rp. {this.formatRupiah(parseInt(this.item.price_product))}</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 20, fontSize: 16, marginTop: 5 }}>Stok: 20</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 10, right: 10 }} >    
                            <TouchableOpacity style={{ backgroundColor: '#ee4d2d', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', opacity: 0.8 }} onPress={this._toggleBottomNavigationView}>
                                <Icon name="ios-close" size={20} color='white' />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ borderBottomWidth: 1, borderColor: 'lightgrey' }}></Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ marginLeft: 5, fontSize: 16, marginTop: 5 }}>Jumlah (stok 20)</Text>
                            <TouchableOpacity style={{backgroundColor: '#00bfa5',  width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={() => this.onSubtract()}>
                                <Icon name="ios-remove" size={50} style={{ color: 'white' }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderWidth: 0.5, color: 'lightgrey',  width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                <Text style={{ fontSize: 18 }}>{this.state.qty}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: '#ee4d2d',  width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={() => this.addQty()}>
                                <Icon name="ios-add" size={50} style={{ color: 'white' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.addToCart()} style={{ backgroundColor: '#ee4d2d', width: 250, height: 30, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16 }}>Masukan Keranjang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
               </BottomSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        carts: state.carts
    }
}

export default connect(mapStateToProps)(ProductDetail);