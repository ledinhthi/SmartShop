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
import { OrderInformation } from "../components/OrderInformation"
import { OrderModal } from "../components/OrderModal"
import { ListCityModal } from "../components/ListCityModal"
import { ListDistrictModal } from "../components/ListDistrictModal"
import { ListWardModal } from "../components/ListWardModal"
import { ListPaymentMethod } from "../components/ListPaymentMethod"
import Constants from "../utils/Constants";
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

const DATA = [
    {
        id: 0,
        city: "Ha noi1",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi2",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi3",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi5",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi5",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi3",
        District: "Ba dinh",
        Ward: "Thu le"
    },
    {
        id: 0,
        city: "Ha noi4",
        District: "Ba dinh",
        Ward: "Thu le"
    },
]


const ProductItem = (props) => {

    return (
        <View style={styles.productItem}>
            {/* Checkbox */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                {/* Image */}
                <Image style={{ width: 100, height: '100%', marginLeft: 10 }}
                    source={{ uri: props?.item.url }}
                    resizeMode={'contain'}
                >
                </Image>
                {/* Content */}
                <View style={{ justifyContent: 'center', height: '100%', marginLeft: 20, paddingRight: 10 }}>
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
                    <Text style={[styles.textStyle, { color: ColorApp.yellow, fontWeight: 'bold' }]}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        Số lượng 1
                    </Text>
                </View>
            </View>

        </View>
    )
}


export const OrderPage = observer(({ route, navigation }) => {
    const [isShowListDistrictModal, setIsShowListDistrictModal] = React.useState(false);
    const [isShowListWardModal, setIsShowListWardModal] = React.useState(false);
    const [isShowListCityModal, setIsShowListCityModal] = React.useState(false);
    const [isShowMethodPayment, setIsShowMethodPayment] = React.useState(false);
    const [isShowOrderedInformation, setIsShowOrderedInformation] = React.useState(false);
    const [listCity, setListCity] = React.useState(DATA);
    const [listDistrict, setListDistrict] = React.useState(DATA);
    const [listWard, setListWard] = React.useState(DATA);
    const methodPayment = React.useRef(["Tiền mặt", "Chuyển khoản"]);
    return (
        <View style={styles.container}>
            <ScrollView
                style={{ marginBottom: 80 }}
                keyboardShouldPersistTaps='handled'
            >
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    style={{ marginVertical: 20 }}
                    data={DATA_SLIDE}
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
                {/* Thong tin Dat hang */}
                <View style={{ width: '100%' }}>
                    <OrderInformation navigation={navigation}
                        setIsShowListCityModal={setIsShowListCityModal}
                        setIsShowListDistrictModal={setIsShowListDistrictModal}
                        setIsShowListWardModal={setIsShowListWardModal}
                        setIsShowMethodPayment={setIsShowMethodPayment}
                        setIsShowOrderedInformation={setIsShowOrderedInformation}
                    />
                </View>
            </ScrollView>
            {/* Total Money */}
            <View style={styles.totalMoney}>
                {/* Money */}
                <View style={{ alignItems: 'flex-end', marginRight: 8 }}>
                    <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>
                        Tổng thanh toán
                    </Text>
                    <Text style={[styles.textStyle, { fontWeight: '400', color: ColorApp.orangeFD6545 }]}>
                        0đ
                    </Text>
                </View>
                {/*  */}
                {/* Đặt hàng */}
                <TouchableOpacity >
                    <View style={styles.orderBtn}>
                        <Text style={[styles.textStyle, { fontSize: PixelRatio.roundToNearestPixel(15), fontWeight: 'bold', color: ColorApp.white }]}>
                            Đặt Hàng
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Is Show list city modal */}
            {isShowListCityModal && <ListCityModal setIsShowModal={setIsShowListCityModal} type={Constants.ORDER_MODAL_TYPE.LIST_CITY_MODAL} data={DATA} />}
            {/* Show list district modal */}
            {isShowListDistrictModal && <ListDistrictModal setIsShowModal={setIsShowListDistrictModal} type={Constants.ORDER_MODAL_TYPE.LIST_DISTRICT_MODAL} data={DATA} />}
            {/* Show list ward modal */}
            {isShowListWardModal && <ListWardModal setIsShowModal={setIsShowListWardModal} type={Constants.ORDER_MODAL_TYPE.LIST_WARD_MODAL} data={DATA} />}
            {/* Show Method modal */}
            {isShowMethodPayment && <ListPaymentMethod setIsShowModal={setIsShowMethodPayment} type={Constants.ORDER_MODAL_TYPE.PAYMENT_METHOD_MODAL} data={DATA} />}
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
        height: DEVICE_HEIGHT / 7,
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
    },
    totalMoney: {
        marginTop: 100,
        zIndex: 9999,
        position: 'absolute',
        width: Constants.deviceW,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 0,
        backgroundColor: ColorApp.yellowFFED43
    },
    orderBtn: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorApp.orangeFD6545,
    }
})


