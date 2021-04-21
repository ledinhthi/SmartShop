import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, Dimensions, FlatList
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    return (
        <View style={styles.productItem}>
            {/* Checkbox */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 20, height: 20, alignSelf: 'center' }}>
                    <Text style={[styles.textStyle, { textAlign: 'center' }]}>
                        +
                </Text>
                </View>
                {/* Image */}
                <Image style={{ width: 100, height: 200, marginLeft: 10 }}
                    source={{ uri: props?.item.url }}
                    resizeMode={'contain'}
                >
                </Image>
                {/* Content */}
                <View style={{ justifyContent: 'center', marginLeft: 20, paddingRight: 10 }}>
                    <Text style={styles.textStyle}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {`${props?.item.phoneName || ""}`}
                    </Text>
                    <Text style={[styles.textStyle, { color: ColorApp.yellow, fontWeight: 'bold' }]}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {`${props?.item.price || ""}`}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center' }}>
                {/* Empty item */}
                <View style={{ width: '50%' }}>

                </View>
                {/* Increate, decrease Item */}
                <View style={{ width: '50%', flexDirection: 'row', width: 80, height: 25, borderWidth: 1, borderColor: ColorApp.grayAD }}>
                    <TouchableOpacity style={styles.increaseDecrease}>
                        <Text style={[styles.textStyle]}>
                            -
                 </Text>
                    </TouchableOpacity>
                    {/* Content */}
                    <Text style={[styles.textStyle]}>
                        1
                  </Text>
                    {/* Increase */}
                    <TouchableOpacity style={styles.increaseDecrease}>
                        <Text style={{ flexGrow: 1, textAlign: 'center' }}>
                            +
                    </Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View>
    )
}


export const BasketStore = (props) => {
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
                style={{ marginTop: 20, flex: 1 }}
                data={DATA_SLIDE}
                renderItem={({ item, index }) => {
                    return (
                        <ProductItem item={item} {...props} />
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
        </View>
    )
}
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
        textAlign: 'center',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: ColorApp.grayAD
    }

})


