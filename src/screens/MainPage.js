import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, Dimensions
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { color } from 'react-native-reanimated';
import Constant from '../utils/Constants';
import { useStore } from "../stores/useStore";
import { observer } from "mobx-react";
import { ListDeviceModal } from "../components/ListDeviceModal"
import * as Util from "../utils/Util";

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
const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;

const ProductItem = (props) => {
    return (
        <View style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: 'center', width: '49%',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            backgroundColor: ColorApp.white
        }}>
            {/* Image */}
            <TouchableOpacity onPress={() => {
                props.navigation.navigate(Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY, { product: props.item })
            }}>
                <Image style={{ height: 100, width: '100%' }}
                    resizeMode='contain'
                    source={{ uri: `${Constant.PREFIX_URL.PRODUCT + props.item?.product_image}` }}
                >
                </Image>
            </TouchableOpacity>
            {/* Price */}
            <View style={{ marginTop: 10, alignSelf: 'center' }}>
                <Text style={[styles.textStyle, { color: ColorApp.black, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }]}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                >
                    {props.item?.product_price} VND
                </Text>
            </View>
            {/* Name */}
            <View style={{ marginTop: 4, alignSelf: 'center' }}>
                <Text style={[styles.textStyle, { textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: ColorApp.gray5d5d5d }]}
                    ellipsizeMode='tail'
                    numberOfLines={2}
                >
                    {props.item?.product_name}
                </Text>
            </View>
            {/* Basket, fastCheck */}
            <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'center' }}>
                <TouchableOpacity style={{ height: PixelRatio.roundToNearestPixel(25), width: 100, paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center', borderRadius: 3, backgroundColor: ColorApp.gray5d5d5d }}>
                    <Image style={{ height: 15, width: 15, tintColor: ColorApp.white }}
                        resizeMode='contain'
                        source={require("../../images/shopping-cart.png")}
                    >
                    </Image>
                    <Text style={[styles.textStyle, { fontSize: 11, marginLeft: 4, color: ColorApp.white }]}>
                        Thêm giỏ hàng
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: PixelRatio.roundToNearestPixel(25), width: 80, marginLeft: 4, paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center', borderRadius: 3, backgroundColor: ColorApp.gray5d5d5d }}
                    onPress={() => {
                        props.navigation.navigate(Constant.PAGE_KEY.LOOK_OVER_PAGE_KEY, { product: props.item })
                    }}
                >
                    <Image style={{ height: 15, width: 15, tintColor: ColorApp.white }}
                        resizeMode='contain'
                        source={require("../../images/visibility.png")}
                    >
                    </Image>
                    <Text style={[styles.textStyle, { fontSize: 11, marginLeft: 4, color: ColorApp.white }]}>
                        Xem nhanh
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const MainPage = observer(({ route, navigation }) => {
    const { ProductStore } = useStore();
    const [isShowListBranch, setIsShowListBranch] = React.useState(false);
    React.useEffect(async () => {
        console.log("Mount");
        await ProductStore.getListSliderAds();
        await ProductStore.getListProduct();
    }, [])
    return (
        ProductStore.listProduct ?
            <View style={styles.container}>
                {/* Logo */}
                <Image style={styles.logo}
                    source={{ uri: "http://smartshopnew.tk/public/frontend/images/logo.jpg" }}
                >
                </Image>
                {/* Header  */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsShowListBranch(true)
                        }}
                    >
                        <Image style={{ width: 25, height: 25 }}
                            source={require("../../images/menu-button-of-three-horizontal-lines.png")}
                            resizeMode={'cover'}
                        >
                        </Image>
                    </TouchableOpacity>
                    {/* Basket */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(Constant.PAGE_KEY.BASKET_PAGE_KEY)
                        }}
                    >
                        <Image style={{ width: 25, height: 25, marginLeft: 20 }}
                            source={require("../../images/shopping-cart.png")}
                            resizeMode={'cover'}
                        >
                        </Image>
                    </TouchableOpacity>
                    {/* Search */}
                    <TextInput style={{ marginLeft: 30, maxHeight: 38, flexGrow: 1, borderWidth: 1, borderRadius: 3, borderColor: ColorApp.gray5d5d5d }}
                        placeholder={'Tìm kiếm'}
                    >
                    </TextInput>
                </View>
                <ScrollView>
                    {/* Advertiserment */}
                    <View style={{ height: 150, marginTop: 10 }}>
                        <Swiper style={styles.wrapper}
                            autoplay={true}
                            dotStyle={{ marginTop: 120 }}
                            activeDotStyle={{ marginTop: 120 }}
                        >
                            {
                                ProductStore.listImageSliderAds?.map((item, index) => {
                                    return (
                                        <Image key={index} style={styles.imageSlider}
                                            source={{ uri: `${Constant.PREFIX_URL.SLIDER + item?.slider_image}` }}
                                            resizeMode={'cover'}
                                        >
                                        </Image>
                                    )
                                })
                            }
                        </Swiper>
                    </View>
                    {/* Content  */}
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        style={{ marginTop: 20, flex: 1 }}
                        data={ProductStore.listProduct || null}
                        // keyExtractor={(item, index) => `${item?.product_id} + ${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <ProductItem item={item} navigation={navigation} />
                            )
                        }}
                        numColumns={2}
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
                </ScrollView>
                {isShowListBranch && <ListDeviceModal isShowSliding={isShowListBranch} setIsShowSliding={setIsShowListBranch} />}
                {/* Show loading */}
                {ProductStore.isLoading && <Util.indicatorProgress />}

            </View>

            : <View>
            </View>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: ColorApp.white,
        padding: 10,

    },
    logo: {
        height: 50,
        width: 200,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapper: {
    },
    imageSlider: {
        flex: 1,
        width: '100%',
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
    }
})


