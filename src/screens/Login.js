import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { login } from '../publics/redux/actions/login';

import Icon from "react-native-vector-icons/Ionicons";

class Login extends Component{

    constructor(){
        super();
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            email: '',
            password: '',
            showPassword: true,
            token: ''
        }
    }

    toggleSwitch(){
        this.setState({ showPassword: !this.state.showPassword });
    }

    actLogin(){
        this.props.dispatch(login({
            email: this.state.email,
            password: this.state.password
        }))

        this.refs.toast.show('Login Berhasil');

        this.setState({
            email: '',
            password: ''
        })

        console.log(this.props.login.data.token);
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                    <TouchableOpacity style={{ marginTop: 10, marginLeft: 10 }} onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Icon name="ios-close" size={30} color='#ee4d2d' />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginLeft: 20, fontSize: 17, color: '#ee4d2d'}}>Login</Text>
                </View>

                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <Text style={{ color: '#ee4d2d', fontSize: 25, marginBottom: 30, marginLeft: 60 }}>Kanataage</Text>
                        <TextInput value={this.state.email} onChangeText={(text) => this.setState({ email: text })} placeholder="Email..." style={{ borderWidth: 1, width: 250, fontSize: 16, marginBottom: 10, height: 50 }} />
                        <TextInput value={this.state.password} secureTextEntry={this.state.showPassword} onChangeText={(text) => this.setState({ password: text })} placeholder="Password..." style={{ borderWidth: 1, width: 250, fontSize: 16, marginBottom: 10, height: 50 }} />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Switch
                                onValueChange={this.toggleSwitch}
                                value={!this.state.showPassword}
                            />
                            <Text>Tampilkan password</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.actLogin()} style={{ width: 250, backgroundColor: '#ee4d2d', padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontSize: 15 }}>Belum Punya Akun ? , Register </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ fontSize: 15, color: '#ee4d2d' }}>Disini</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Toast 
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    positionValue={500}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(Login);