import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';

class HeaderItem extends Component{
    render(){
        return(
            <Header
                style={{ backgroundColor: '#233240' }}
                backgroundColor='#233240'
            >
                {this.props.left ? this.props.left : <Left/>}
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                {this.props.right ? this.props.right : <Right style={{ flex: 1 }} />}
            </Header>
        )
    }
}

export default HeaderItem;