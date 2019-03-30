import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

class Profile extends Component{
    render(){
        return(
            <View style={{ flex: 1 }}>
                <Image source={require('../images/n.jpg')} style={{ width: '100%', height: 150 }} />
                <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 10, marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image source={require('../images/o.png')} style={{ width: 60, height: 60, borderRadius: 50, top: 50 }} />
                    </TouchableOpacity>
                    <Text style={{ top: 60, color: 'white', fontSize: 20, marginLeft: 10 }}>Saipul Anwar</Text>
                </View>
                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 10, right: 10 }} >    
                    <TouchableOpacity style={{ backgroundColor: '#ee4d2d', width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', opacity: 0.8 }} onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Icon name="ios-close" size={20} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 5, borderColor: '#f5f5f5' }}></View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderColor: '#f5f5f5' }}>
                    <Icon name="ios-list-box" size={30} style={{ color: 'blue' }} />
                    <Text style={{ marginLeft: 20, marginTop: 3, fontSize: 16 }}>Pesanan Saya</Text>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 13, right: 10 }}>
                        <Icon name="ios-arrow-dropright" size={25} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderColor: '#f5f5f5' }}>
                    <Icon name="ios-heart" size={30} style={{ color: '#ee4d2d' }} />
                    <Text style={{ marginLeft: 20, marginTop: 3, fontSize: 16 }}>Favorit Saya</Text>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 13, right: 10 }}>
                        <Icon name="ios-arrow-dropright" size={25} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderColor: '#f5f5f5' }}>
                    <Icon name="ios-cart" size={30} style={{ color: 'blue' }} />
                    <Text style={{ marginLeft: 20, marginTop: 3, fontSize: 16 }}>Keranjang Saya</Text>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 13, right: 10 }}>
                        <Icon name="ios-arrow-dropright" size={25} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderColor: '#f5f5f5' }}>
                    <Icon name="ios-person" size={30} style={{ color: 'blue' }} />
                    <Text style={{ marginLeft: 20, marginTop: 3, fontSize: 16 }}>Pengaturan Akun</Text>
                    <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end', top: 13, right: 10 }}>
                        <Icon name="ios-arrow-dropright" size={25} />
                    </View>
                </View>

            </View>
        )
    }
}

export default Profile;