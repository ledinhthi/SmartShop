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
import Constant from '../utils/Constants';
import APICommonService from '../service/APICommonService'
const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const DetailProduct = observer(({ route, navigation }) => {
    const [productInfor, setProductInfor] = React.useState(null);

    React.useEffect(() => {
        let product = route?.params?.product;
        APICommonService.getProductByBrandId(product.brand_id)
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
        APICommonService.getProductByCatergoryId(product.category_id)
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
                <ScrollView style={{ height: '100%', width: '100%' }}>
                    {/* Image product  */}
                    <View style={styles.imageStyle}>
                        <Image style={{ width: '100%', height: '100%' }}
                            source={{ uri: `${Constant.PREFIX_URL.PRODUCT + productInfor?.product_image}` }}
                            resizeMode={'contain'}
                        >
                        </Image>
                    </View>
                    {/* Content */}
                    <View style={styles.contentStyle}>
                        {/* Samsung galaxy 20 */}
                        <View >
                            <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black', fontSize: PixelRatio.roundToNearestPixel(20), textAlign: 'center' }]}
                            >
                                {productInfor?.product_name}
                            </Text>
                        </View>
                        {/* Ma Id */}
                        <View>
                            <Text style={[styles.textStyle, { color: ColorApp.gray8A8A8A, fontSize: PixelRatio.roundToNearestPixel(20), fontWeight: 'bold' }]}>
                                {productInfor?.product_price} VND
                            </Text>
                        </View>
                        {/* 250000,  so luong */}
                        <View style={{ marginTop: 10, marginHorizontal: '10%' }}>
                            <Text style={[styles.textStyle, { color: 'black', fontSize: PixelRatio.roundToNearestPixel(20) }]}>
                                Tình trạng: Còn hàng  {'\n'}
                                Điều kiện: Mơi 100% {'\n'}
                                Số lượng kho còn: {productInfor?.product_quantity}  {'\n'}
                                Thương hiệu: {productInfor?.brand_desc}  {'\n'}
                                Danh mục: {productInfor?.category_desc}

                            </Text>
                            {/* Status */}
                            <View style={{ alignSelf: 'flex-start', marginVertical: 20 }}>
                                <TouchableOpacity style={{ height: PixelRatio.roundToNearestPixel(38), width: '100%', justifyContent: 'center', borderRadius: 3, backgroundColor: ColorApp.gray5d5d5d }}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    <Text style={[styles.textStyle, { paddingHorizontal: 2, color: ColorApp.white }]}>
                                        Thêm giỏ hàng
                                 </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            : null
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: ColorApp.white,
        padding: 10
    },
    imageStyle: {
        height: DEVICE_HEIGHT / 3,
        width: '100%'
    },
    contentStyle: {
        marginTop: 20,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14),
    }
})


