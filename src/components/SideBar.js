import React, { Component } from 'react';
import { AppRegistry, Image, StatusBar, TouchableOpacity } from 'react-native';
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Left,
    Body,
    Right,
    Switch
  } from "native-base";

import Icon from "react-native-vector-icons/Ionicons";


  const routes = ["Homes", "Chat", "Profile"];

  export default class SideBar extends Component{

     actHome(){
         this.props.navigation.closeDrawer();
         this.props.navigation.navigate('Dashboard');
     }
      render(){
          return(
              <Container>
                  <Content>
                      <Image 
                        source={require('../images/n.jpg')}
                        style={{
                            height: 130,
                            width: "100%",
                            alignSelf: "stretch",
                            position: "absolute"
                        }}
                      />
                      <Image 
                        square
                        style={{
                            height: 70,
                            width: 70,
                            top: 20,
                            marginLeft: 10,
                            borderRadius: 70
                        }}
                        source={require('../images/o.png')}
                      />
                      <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginTop: 25 }}>Saipul Anwar</Text>

                      <ListItem style={{ marginTop: 20 }} icon onPress={() => this.actHome() }>
                        <Left>
                            <Button transparent>
                                <Icon active name="ios-home" size={25} style={{ color: "#233240" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Home</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem icon onPress={() => this.props.navigation.navigate('Carts')}>
                        <Left>
                            <Button transparent>
                                <Icon active name="ios-cart" size={25} style={{ color: "#233240" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Keranjang</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem icon onPress={() => this.props.navigation.navigate('Login')}>
                        <Left>
                            <Button transparent>
                                <Icon style={{ color: "#233240" }} active size={25} name="ios-contacts" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Login</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem icon onPress={() => this.props.navigation.navigate('Profile')}>
                        <Left>
                            <Button transparent>
                                <Icon style={{ color: "#233240" }} active size={25} name="ios-contact" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Akun</Text>
                        </Body>
                        <Right />
                    </ListItem>
                  </Content>
              </Container>
          )
      }
  }