import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, Dimensions
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useStore } from "../stores/useStore";
import { observer } from "mobx-react";
import APICommonService from '../service/APICommonService'
import Constant from '../utils/Constants';
const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;


export const FastCheckProduct = observer(({ route, navigation }) => {
    let [chosenNumber, setChosenNumber] = React.useState(0);
    const [productInfor, setProductInfor] = React.useState(null);
    const [isCheckedCheckBox1, setIsCheckedCheckBox1] = React.useState(false);
    const increaseChosenNumber = () => {
        chosenNumber = chosenNumber + 1;
        setChosenNumber(chosenNumber)
    }
    const decreaseChosenNumber = () => {
        chosenNumber = chosenNumber - 1;
        setChosenNumber(chosenNumber)
    }

    React.useEffect(() => {
        let product = route?.params?.product;
        APICommonService.getBrandOfProduct(product.brand_id)
            .then(response => {
                console.log("getBrandOfProduct response", response)
                productInfor['brand_desc'] = response.brand_desc;
            })
            .catch(error => {
                console.log("error", error)
            })
            .finally(() => {
                console.log("finally")
            });
        APICommonService.getCategoryProduct(product.category_id)
            .then(response => {
                console.log("getCategoryProduct Response", response)
                productInfor['category_desc'] = response.category_desc;
            })
            .catch(error => {
                console.log("error", error)
            })
            .finally(() => {
                console.log("finally")
            });

        console.log("Product", product)
        setProductInfor(product);
        const unsubscribeListener = navigation.addListener("focus", () => {
            // ChatStore.getListGroupChannel();
        });
        return () => {
            console.log("UnMount")
        }
    }, [])

    return (
        productInfor ?
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}
                    contentContainerStyle={styles.containerContentStyle}
                >
                    {/* Image */}
                    <View style={styles.productImage}
                    >
                        <Image style={{ width: '100%', height: '100%' }}
                            source={{ uri: `${Constant.PREFIX_URL.PRODUCT + productInfor?.product_image}` }}
                            resizeMode={'contain'}
                        >
                        </Image>
                    </View>

                    <View style={styles.contentContainer}>
                        {/* Mã Id */}
                        <Text style={styles.normalTextStyle}>
                            {`Mã Id: ${productInfor?.product_id}`}
                        </Text>
                        {/* Giá sản phẩm */}
                        <Text style={[styles.titleTextStyle, { marginTop: 10 }]}>
                            {`Giá sản phẩm:  ${productInfor?.product_price} VND`}
                        </Text>
                        {/* Số lượng */}
                        <View style={styles.amountProduct}>
                            <Text style={styles.normalTextStyle}>
                                {`Số lượng:  ${productInfor?.product_quantity}`}
                            </Text>
                            {/*  */}
                            {/* Increate, decrease Item */}
                            <View style={{ flexDirection: 'row', width: 80, height: 25, borderWidth: 1, borderColor: ColorApp.grayAD }}>
                                <TouchableOpacity style={{ flex: 1 }}
                                    onPress={decreaseChosenNumber}
                                >
                                    <View style={styles.increaseDecrease}>

                                        <Text style={[styles.textStyle]}>
                                            -
                                       </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.increaseDecrease}>
                                    <Text style={[styles.normalTextStyle]}>
                                        {chosenNumber}
                                    </Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1 }}
                                    onPress={increaseChosenNumber}
                                >
                                    <View style={styles.increaseDecrease}>

                                        <Text style={styles.normalTextStyle}>
                                            +
                            </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/* Mô tả sản phẩm */}
                        <Text style={[styles.titleTextStyle, { color: ColorApp.red, marginTop: 20 }]}>
                            Mô tả sản phẩm
                    </Text>
                        {/* Thông số kỹ thuật */}
                        <Text style={[styles.titleTextStyle, { fontSize: PixelRatio.roundToNearestPixel(30), color: ColorApp.red, marginTop: 30 }]}>
                            Thông số kỹ thuật
                    </Text>
                        {/* Thong số kỹ thuật content */}
                        <Text style={[styles.normalTextStyle, { fontWeight: '400', marginTop: 5 }]}>
                            {`${productInfor?.product_content}`}
                        </Text>
                        {/* Mua ngay */}
                        <View style={{ marginTop: 20, alignSelf: 'flex-start', paddingHorizontal: 20 }}>
                            <TouchableOpacity style={{
                                height: PixelRatio.roundToNearestPixel(30), width: 100,
                                paddingHorizontal: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 3, backgroundColor: ColorApp.yellow
                            }}
                                onPress={() => {
                                    navigation.navigate(Constants.PAGE_KEY.ORDER_PAGE_KEY);
                                }}
                            >
                                <Image style={{ height: 15, width: 15, tintColor: ColorApp.white }}
                                    resizeMode='contain'
                                    source={require("../../images/shopping-cart.png")}
                                >
                                </Image>
                                <Text style={[styles.textStyle, { fontSize: 11, marginLeft: 4, color: ColorApp.white }]}>
                                    Đặt hàng
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            : <View>
            </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: ColorApp.white
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
    containerContentStyle: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    productImage: {
        height: 300,
        width: '100%',
    },
    normalTextStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14),

    },
    titleTextStyle: {
        fontSize: PixelRatio.roundToNearestPixel(20),
        fontWeight: 'bold'
    },
    amountProduct: {
        height: 38,
        width: '100%',
        justifyContent: 'center',
        marginTop: 10
    },
    increaseDecrease:
    {
        flexGrow: 1,
        alignItems: 'center',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: ColorApp.grayAD
    }
})