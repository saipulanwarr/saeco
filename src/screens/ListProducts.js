import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import { getProducts } from '../publics/redux/actions/products';

class ListProducts extends Component{

    componentDidMount(){
        this.loadDataProduct();
    }

    loadDataProduct(){
        this.props.dispatch(getProducts());
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        const { title } = this.props.navigation.state.params;
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10 }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" size={35} color='#ee4d2d' />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginLeft: 20, fontSize: 18 }}>{title}</Text>
                    </View>
                </View>

                <View style={{ flex: 9, backgroundColor: '#f5f5f5' }}>
                    {/* <FlatList 
                        data={this.props.products.data}
                        renderItem={({item}) => 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { item: item })}>
                                <View style={{ flexDirection: 'row', marginTop: 5, paddingHorizontal: 10, backgroundColor: 'white'}}>
                                    <Image source={{ uri: item.image_product }} style={{ width: 100,height: 100, marginLeft: 5, marginTop: 5, marginBottom: 5 }} />
                                    <View>
                                        <Text style={{ fontSize: 16, width: 250, paddingHorizontal: 10 }}>{item.name_product}</Text>
                                        <Text style={{ fontSize: 17, paddingHorizontal: 10, marginTop: 40, color: '#ee4d2d', marginBottom: 5 }}>Rp {this.formatRupiah(parseInt(item.price_product))}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    /> */}

                    <FlatList 
                        data={this.props.products.data}
                        numColumns={2}
                        renderItem={({item}) => 
                            <View style={{ width: 164, height: 230, borderColor: 'lightgrey', borderWidth: 0.5, marginLeft: 10, marginTop: 10 }}>
                                <View style={{ height: 180 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { item: item })}>
                                        <Image source={{ uri: item.image_product }} style={{ width: '100%', height: '100%' }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ paddingHorizontal: 5, marginTop: 5 }} numberOfLines={1}>{item.name_product}</Text>
                                    <Text style={{ color: '#ee4d2d'}}>Rp. {this.formatRupiah(parseInt(item.price_product))}</Text>
                                </View>
                            </View>   
                        }
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(ListProducts);