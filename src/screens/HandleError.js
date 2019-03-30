import React, { Component } from 'react';
import { Container, View, Icon, Text, Button } from 'native-base';


class HandleError extends Component{
    render(){
        console.disableYellowBox = true;
        return(
            <Container style={style.styleContainer}>
                <View style={style.styleView}>
                    <Icon name="warning" style={style.styleIcon} />
                    <Text style={style.styleText}>Oppps something wrong!!!</Text>
                    <Button style={style.styleButton} small iconLeft block onPress={() => this.props.navigation.navigate('ProductList')}>
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>
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
        color: '#95a5a6'
    },
    styleText: {
        fontSize: 25, 
        color: '#95a5a6'
    },
    styleButton: {
        backgroundColor: '#233240', 
        marginTop: 10, 
        marginLeft: 70, 
        marginRight: 70
    }
}

export default HandleError;