import React, {Component} from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Text } from 'native-base';
import axios from 'axios';

import '../data/Products';
import HeaderItem from '../components/HeaderItem';
import LoadingSpinner from '../components/LoadingSpinner';

class DetailProduct extends Component{

    constructor(props){
        super(props);

        this.state = {
            product: [],
            carts: [],
            colors: [],
            selectedColor: '',
            loading: false
        }
    }

    componentDidMount(){
        this.loadDetailProduct();
        this.loadDataColor();
        this.loadDataCart();
    }

    loadDetailProduct(){
        const {idproduct} = this.props.navigation.state.params;
        
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: `http://192.168.0.8:3333/api/v1/product/${idproduct}`
            })
            .then(res => {
                this.setState({
                    product: res.data,
                    loading: false
                })
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    loadDataCart(){
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: 'http://192.168.0.8:3333/api/v1/orders'
            })
            .then(res => {
                this.setState({
                    carts: res.data,
                    loading: false
                })
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    loadDataColor(){
        this.setState({ loading: true }, () => {
            axios({
                method: 'get',
                url: 'http://192.168.0.8:3333/api/v1/colors'
            })
            .then(res => {
                this.setState({
                    colors: res.data,
                    selectedColor: res.data[0].id,
                    loading: false
                })
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('HandleError');
                }, 5000);
            })
        })
    }

    formatRupiah = (uang) => {
        return uang.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    addToCart = () => {
        let dataCart = false;
        let qty = 1;
        let idcart = 0;

        this.state.carts.map(item => {
            if(item.product.id == this.state.product.id){
                dataCart = true;
                qty = item.qty
                idcart = item.id;
            }
        })

        if(dataCart){
            this.setState({ loading: true }, () => {
                axios({
                    method: 'patch',
                    url: `http://192.168.0.8:3333/api/v1/order/${idcart}`,
                    data: {
                        qty: qty + 1
                    }
                })
                .then(res => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('CartList');
                })
                .catch(err => {
                    setTimeout(() => {
                        this.setState({ loading: false })
                        this.props.navigation.navigate('HandleError');
                    }, 5000);
                })
            })
        }
        else{
            const product = {
                product_id: this.state.product.id,
                qty: 1,
                status: 'cart',
                price_order: this.state.product.price_product,
                color_id: this.state.selectedColor
            }
            
            this.setState({ loading: true }, () => {
                axios({
                    method: 'post',
                    url: 'http://192.168.0.8:3333/api/v1/order',
                    data: product
                })
                .then(res => {
                    this.setState({ loading: false })
                    this.props.navigation.navigate('CartList');
                })
                .catch(err => {
                    setTimeout(() => {
                        this.setState({ loading: false })
                        this.props.navigation.navigate('HandleError');
                    }, 5000);
                })
            })
        }
    }
    
    render(){
        console.log(this.state.product);
        console.disableYellowBox = true;
        var left = (
            <Left>
                <Button 
                    transparent 
                    onPress={() => this.props.navigation.navigate('ProductList')}>
                    <Icon 
                        name="arrow-back" />
                </Button>
            </Left>
        );

        var right = (
            <Right 
                style={{ flex: 1 }}>
                <Button 
                    transparent 
                    onPress={() => this.props.navigation.navigate('CartList')}>
                    <Icon 
                        name="cart" />
                </Button>
            </Right>
        )

        return(
            <Container 
                style={{ backgroundColor: '#fdfdfd' }}>
                <HeaderItem 
                    left={left} 
                    right={right} 
                    title="Detail Product" />
                    
                {this.state.loading ? <LoadingSpinner /> : 
                    <Content>
                        <View>
                            <Image 
                                style={style.styleImage}
                                source={{ uri: this.state.product.image_product }}/>
                        </View>
                        <View 
                            style={style.styleViewProduct}>
                            <Grid>
                                <Col size={3}>
                                    <Text 
                                        style={style.styleTextNameProduct}>
                                        {this.state.product.name_product}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text 
                                        style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Rp.{this.formatRupiah(parseInt(this.state.product.price_product))}
                                    </Text>
                                </Col>
                            </Grid>

                            <Grid style={style.styleGridColor} >
                                <Col>
                                    <View 
                                        style={style.styleViewColColor}>
                                        <Text>
                                            Color: 
                                        </Text>
                                    </View>
                                </Col>
                                <Col size={3}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select a color"
                                        note={true}
                                        selectedValue={this.state.selectedColor}
                                        onValueChange={(color) => this.setState({ selectedColor: color })}>

                                        {this.renderColors()}
                                    </Picker>
                                </Col>
                            </Grid>
                            <Grid 
                                style={{ marginTop: 15 }}>
                                <Col 
                                    size={3}>
                                    <Button 
                                        block 
                                        iconLeft
                                        small
                                        style={{ backgroundColor: '#233240' }} 
                                        onPress={this.addToCart}>
                                        <Icon 
                                            name="add" />
                                        <Text style={{ color: '#fdfdfd', marginLeft: 5 }}>Add to cart</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        block 
                                        icon 
                                        small 
                                        transparent 
                                        style={style.styleButtonWishlist}>
                                        <Icon 
                                            style={style.styleIconWishlish} 
                                            name="heart" />
                                    </Button>
                                </Col>
                            </Grid>
                            <View 
                                style={style.styleViewDescription} >
                                <Text 
                                    style={{ marginBottom: 5 }}>
                                    Description
                                </Text>
                                <View 
                                    style={style.styleViewDetailDescription} />
                                <Text>
                                    {this.state.product.description_product}
                                </Text>
                            </View>
                        </View>
                    </Content>
                }
            </Container>
        )
    }

    renderColors(){
        let colors = [];
        this.state.colors.map((color) => {
            colors.push(
                <Item key={color.id} label={color.name_color} value={color.id} />
            );
        });

        return colors;
    }
}

const style = {
    styleImage: {
        width: 350, 
        height: 300, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    styleViewProduct: {
        backgroundColor: '#fdfdfd', 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 12, 
        paddingRight: 12, 
        alignItems: 'center'
    },
    styleTextNameProduct: {
        fontSize: 18
    },
    styleGridColor: {
        marginTop: 15 
    },
    styleViewColColor: {
        flex: 1, 
        justifyContent: 'center'
    },
    styleButtonWishlist: {
        backgroundColor: '#fdfdfd'
    },
    styleIconWishlish: {
        color: '#2c3e50'
    },
    styleViewDescription: {
        marginTop: 15, 
        padding: 10, 
        borderWidth: 1, 
        BorderRadius: 3, 
        borderColor: 'rgba(149, 165, 166, 0.3)'
    },
    styleViewDetailDescription: {
        width: 50, 
        height: 1, 
        backgroundColor: 'rgba(44, 62, 80, 0.5)', 
        marginLeft: 7, 
        marginBottom: 10
    }
}

export default DetailProduct;