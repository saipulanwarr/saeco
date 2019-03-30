import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import Slideshow from 'react-native-slideshow';

import { getProducts } from '../publics/redux/actions/products';

class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                url: 'https://doofindermedia.s3.amazonaws.com/blog/2016/07/gestion-tienda-fisica-y-online.jpg',
                }, {
                
                url: 'https://s3.amazonaws.com/bloocciblog/2018/02/11171921/Physical-Store-to-Your-Online-Shop.jpg',
                }, {
                
                url: 'https://sg.fiverrcdn.com/photo2s/119100175/original/48956790dc005986b9ab6a1eae92b175148b530a.png?1540419649',
                },
            ],
        };
    }

    componentDidMount(){
        this.loadDataProduct();
    }

    componentWillMount(){
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 5000)
        });
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    loadDataProduct(){
        this.props.dispatch(getProducts());
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Slideshow
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })}
                    />
                    <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 10, marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../images/o.png')} style={{ width: 45, height: 45, borderRadius: 40 }} />
                        </TouchableOpacity>
                        <TextInput placeholder="Cari Disini" style={{ backgroundColor: 'white', height: 40, marginLeft: 5, width: 250 }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderWidth: 0.5, width: 80, height: 60 }}>
                            <Icon name="ios-laptop" color="black" size={35} />
                            <Text>Laptop</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderWidth: 0.5, width: 90, height: 60}}>
                            <Icon name="ios-laptop" color="black" size={35} />
                            <Text>Handphone</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderWidth: 0.5, width: 85, height: 60 }}>
                            <Icon name="ios-repeat" color="black" size={35} />
                            <Text>Cashback</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderWidth: 0.5, width: 80, height: 60 }}>
                            <Icon name="ios-add" color="black" size={35} />
                            <Text>Coins</Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 5, borderColor: '#f5f5f5', marginTop: 15 }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 5, marginLeft: 10}}>
                        <Text style={{ fontSize: 15, marginBottom: 5 }}>PENCARIAN TERPOPULER</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProducts', { title: 'Pencarian Terpopuler' })}>
                            <Text style={{ marginRight: 5 }}>Lihat Selengkapnya > </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <FlatList
                            data={this.props.products.data}
                            horizontal={true}
                            renderItem={({item}) => 
                                <View style={{ flexDirection: 'row', height: 200 }}>
                                    <View style={{ width: 130, height: '100%', borderColor: 'lightgrey', borderWidth: 0.5, marginRight: 5}}>
                                        <TouchableOpacity style={{ height: 150 }} onPress={() => this.props.navigation.navigate('ProductDetail', { item: item })}>
                                            <Image source={{ uri: item.image_product }} style={{ width: '100%', height: '100%' }} />
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ paddingHorizontal: 5 }} numberOfLines={1}>{item.name_product}</Text>
                                            <Text style={{ color: '#ee4d2d' }}>Rp. {this.formatRupiah(parseInt(item.price_product))}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                    <View style={{ borderWidth: 5, borderColor: '#f5f5f5', marginTop: 20 }}></View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
                            <Text style={{ fontSize: 15, marginBottom: 5, marginLeft: 10 }}>REKOMENDASI</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProducts', { title: 'Rekomendasi' })}>
                                <Text style={{ marginRight: 5 }}>Lihat Selengkapnya > </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList 
                            data={this.props.products.data}
                            numColumns={2}
                            renderItem={({item}) => 
                                <View style={{ width: '46%', height: 230, borderColor: 'lightgrey', borderWidth: 0.5, marginLeft: 10, marginBottom: 10 }}>
                                    <View style={{ height: 180 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { item: item })}>
                                            <Image source={{ uri: item.image_product }} style={{ width: '100%', height: '100%' }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ paddingHorizontal: 5 }} numberOfLines={1}>{item.name_product}</Text>
                                        <Text style={{ color: '#ee4d2d'}}>Rp. {this.formatRupiah(parseInt(item.price_product))}</Text>
                                    </View>
                                </View>   
                            }
                        />
                    </View>
                </ScrollView>
            </View>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(Dashboard);