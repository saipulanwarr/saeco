import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';

import { register } from '../publics/redux/actions/register';

import Icon from "react-native-vector-icons/Ionicons";

class Register extends Component{

    constructor(){
        super();
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
            showPassword: true
        }
    }

    toggleSwitch(){
        this.setState({ showPassword: !this.state.showPassword });
    }

    actRegister(){
        this.props.dispatch(register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }))
        
        this.refs.toast.show('Register Berhasil');

        this.setState({
            username: '',
            email: '',
            password: ''
        })

    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                    <TouchableOpacity style={{ marginTop: 10, marginLeft: 10 }} onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Icon name="ios-close" size={30} color='#ee4d2d' />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, marginLeft: 20, fontSize: 17, color: '#ee4d2d'}}>Register</Text>
                </View>

                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <Text style={{ color: '#ee4d2d', fontSize: 25, marginBottom: 30, marginLeft: 60 }}>Kanataage</Text>
                        <TextInput placeholder="Username" value={this.state.username} style={{ borderWidth: 1, width: 250, fontSize: 16, marginBottom: 10, height: 50 }} onChangeText={(text) => this.setState({ username: text })} />
                        <TextInput placeholder="Email" value={this.state.email} style={{ borderWidth: 1, width: 250, fontSize: 16, marginBottom: 10, height: 50 }} onChangeText={(text) => this.setState({ email: text })} />
                        <TextInput secureTextEntry={this.state.showPassword} value={this.state.password} placeholder="Password" style={{ borderWidth: 1, width: 250, fontSize: 16, marginBottom: 10, height: 50 }} onChangeText={(text) => this.setState({ password: text })} />
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                onValueChange={this.toggleSwitch}
                                value={!this.state.showPassword}
                            />
                            <Text>Tampilkan password</Text>
                        </View>
                        <TouchableOpacity style={{ width: 250, backgroundColor: '#ee4d2d', padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => this.actRegister()}>
                            <Text style={{ color: 'white' }}>Register</Text>
                        </TouchableOpacity>
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
        register: state.register
    }
}

export default connect(mapStateToProps)(Register);