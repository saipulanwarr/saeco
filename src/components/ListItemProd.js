import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { View, Col, Card, CardItem, Body, Button } from 'native-base';

class ListItemProd extends Component{

    formatRupiah = (uang) => {
        var reverse = uang.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
        return ribuan;
    }

    render(){
        const { product, isRight, navigate } = this.props;
        return(
            <Col style={isRight ? style.leftMargin : style.righMargin} >
                <Card transparent>
                    <CardItem>
                        <Button transparent style={style.button} onPress={() => navigate('DetailProduct', { idproduct: product.id })}>
                            <Image source={{ uri: product.image_product }} style={style.image} />
                            <View style={style.border} />
                        </Button>
                    </CardItem>
                    <CardItem style={{ paddingTop: 0 }}>
                        <Button transparent style={{ flex: 1, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0 }}>
                            <Body>
                                <Text style={{ fontSize: 16 }} numberOfLines={1}>
                                    {product.name_product}
                                </Text>
                                <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                                    <View style={style.line} />
                                    <Text style={style.price}>Rp. {this.formatRupiah(product.price_product)}</Text>
                                    <View style={style.line} />
                                </View>
                            </Body>
                        </Button>
                    </CardItem>
                </Card>
            </Col>
        )
    }
}

const style = {
    leftMargin: {
        marginLeft: 7,
        marginRight: 0,
        marginBottom: 7
    },
    rightMargin: {
        marginLeft: 0,
        marginRight: 7,
        marginBottom: 7
    },
    button: {
        flex: 1,
        height: 250,
        paddingLeft: 4,
        paddingRight: 4
    },
    image: {
        height: 200,
        width: 50,
        flex: 1
    },
    border: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(253, 253, 253, 0.2)'
    },
    price: {
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
        zIndex: 1000,
        backgroundColor: '#fdfdfd'

    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#7f8c8d',
        position: 'absolute',
        top: '52%'
    }
}

export default ListItemProd;