import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, View, Icon, Text, Button } from 'native-base';

class Home extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Dashboard');
        }, 5000);
    }

    render(){
        console.disableYellowBox = true;
        return(
            <Container style={style.styleContainer}>
                <View style={style.styleView}>
                    <Icon name="cart" style={style.styleIcon} />
                    <Text style={style.styleText}>Kanataage</Text>
                </View>
            </Container>
        )
    }
}

const style = {
    styleContainer: {
        backgroundColor: '#fdfdfd'
    },
    styleView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    styleIcon: {
        fontSize: 50, 
        color: '#ee4d2d'
    },
    styleText: {
        fontSize: 25, 
        color: '#ee4d2d'
    },
    styleButton: {
        backgroundColor: '#233240', 
        marginTop: 10, 
        marginLeft: 70, 
        marginRight: 70
    }
}

export default Home;