import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, Dimensions, FlatList, TouchableOpacity,
    ScrollView
} from 'react-native';
import Checkbox from "@react-native-community/checkbox"
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { useStore } from "../stores/useStore";
import { observer } from "mobx-react";
import Constant from '../utils/Constants';

const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;

const DATA_SLIDE = [
    {
        id: 0,
        url: "https://www.lg.com/us/images/cell-phones/md07513841/gallery/Desktop-01.jpg",
        price: '1000',
        phoneName: "IphoneX",
        content: "May dien thoai nay ok"
    },
    {
        id: 0,
        url: "https://www.zdnet.com/a/hub/i/2021/01/07/a20ae151-6384-47c4-a75e-802455021c41/apple-iphone-12-best-phones-review.png",
        price: '20000',
        phoneName: "Ihpone 12",
        content: "May dien thoai nay ok DAY"
    },
    {
        id: 1,
        url: "https://cdn.mos.cms.futurecdn.net/GdcaWSadcCWbt3am8Typ3E.jpg",
        price: '20000',
        phoneName: "IphonXXX",
        content: "May dien thoai nay ok DAY"
    },
    {
        id: 1,
        url: "https://cdn.mos.cms.futurecdn.net/GdcaWSadcCWbt3am8Typ3E.jpg",
        price: '20000',
        phoneName: "IphonXXX",
        content: "May dien thoai nay ok DAY"
    },
    {
        id: 1,
        url: "https://cdn.mos.cms.futurecdn.net/GdcaWSadcCWbt3am8Typ3E.jpg",
        price: '20000',
        phoneName: "IphonXXX",
        content: "May dien thoai nay ok DAY"
    },
    {
        id: 1,
        url: "https://cdn.mos.cms.futurecdn.net/GdcaWSadcCWbt3am8Typ3E.jpg",
        price: '20000',
        phoneName: "IphonXXX",
        content: "May dien thoai nay ok DAY"
    },
    {
        id: 1,
        url: "https://cdn.mos.cms.futurecdn.net/GdcaWSadcCWbt3am8Typ3E.jpg",
        price: '20000',
        phoneName: "IphonXXX",
        content: "May dien thoai nay ok DAY"
    }
]

const ProductItem = (props) => {
    let [chosenNumber, setChosenNumber] = React.useState(0);
    const [isCheckedCheckBox1, setIsCheckedCheckBox1] = React.useState(false);
    const increaseChosenNumber = () => {
        chosenNumber = chosenNumber + 1;
        setChosenNumber(chosenNumber)
        props.item.product_quantity = chosenNumber;
    }
    const decreaseChosenNumber = () => {
        if (chosenNumber == 0) {

        }
        else {
            chosenNumber = chosenNumber - 1;
            setChosenNumber(chosenNumber)
            props.item.product_quantity = chosenNumber;
        }
    }
    React.useState(() => {
        // Reset prodcut_quantity
        props.item.product_quantity = 0;
    }, [])
    return (
        <View style={styles.productItem}>
            {/* Checkbox */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 20, height: 20, alignSelf: 'center' }}>
                    {/* <Checkbox
                       style={{ width: 20, height: 20 }}
                       boxType='square'
                       tintColor={ColorApp.grayE0}
                       onCheckColor={ColorApp.gray1D2129}
                       onFillColor={isCheckedCheckBox1 ? ColorApp.yellowFFED43 : ColorApp.grayF6F6F6}
                       onTintColor={isCheckedCheckBox1 ? ColorApp.gray231816 : ColorApp.grayE0E0E0}
                    ></Checkbox> */}
                </View>
                {/* Image */}
                <Image style={{ width: 100, paddingVertical: 20, height: 200, marginLeft: 10 }}
                    source={{ uri: `${Constant.PREFIX_URL.PRODUCT + props.item.product_image}` }}
                    resizeMode={'contain'}
                >
                </Image>
                {/* Content */}
                <View style={{ justifyContent: 'center', marginLeft: 20, width: '50%', paddingRight: 10 }}>
                    <Text style={styles.textStyle}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {`${props.item?.product_name || ""}`}
                    </Text>
                    <Text style={[styles.textStyle, { color: ColorApp.yellow, fontWeight: 'bold' }]}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {props.item?.price_cost ? `${props.item?.price_cost} VND` : ""}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                {/* Empty item */}
                <View style={{ width: '50%' }}>

                </View>
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
                        <Text style={[styles.textStyle]}>
                            {chosenNumber}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={increaseChosenNumber}
                    >
                        <View style={styles.increaseDecrease}>

                            <Text style={styles.textStyle}>
                                +
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
            {/* Go to Order */}

        </View>
    )
}


export const BasketStore = observer(({ route, navigation }) => {
    const { OrderStore } = useStore()
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{ marginTop: 20 }}>
                <Text style={[styles.textStyle, { fontSize: 20, fontWeight: 'bold' }]}>
                    DANH MỤC GIỎ HÀNG
                </Text>
            </View>
            <FlatList
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                style={{ marginVertical: 20 }}
                data={OrderStore.listChosenProduct || []}
                renderItem={({ item, index }) => {
                    return (
                        <ProductItem item={item} navigation={navigation} />
                    )
                }}
                bounces={true}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ marginHorizontal: 10, marginVertical: 5 }}>

                        </View>
                    )
                }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
            </FlatList>
            {/* Đặt hàng */}
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
                        // Get Ote,
                        console.log("OrderStore.listChosenProduct", OrderStore.listChosenProduct)
                        navigation.navigate(Constant.PAGE_KEY.ORDER_PAGE_KEY, { orderProduct: OrderStore.listChosenProduct });
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
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: ColorApp.white

    },
    productItem: {
        width: DEVICE_WIDTH / 1.2,
        height: DEVICE_HEIGHT / 5,
        backgroundColor: ColorApp.white,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14),
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


