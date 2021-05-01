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
import Constant from "../utils/Constants";
import { set } from 'date-fns';
import * as Util from "../utils/Util";
const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;


const ProductItem = (props) => {

    return (
        <View style={styles.productItem}>
            {/* Checkbox */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                {/* Image */}
                <Image style={{ width: 100, height: '100%', marginLeft: 10 }}
                    source={{ uri: `${Constant.PREFIX_URL.PRODUCT + props.item.product_image}` }}
                    resizeMode={'contain'}
                >
                </Image>
                {/* Content */}
                <View style={{ justifyContent: 'center', height: '100%', width: '50%', marginLeft: 20, paddingRight: 10 }}>
                    <Text style={styles.textStyle}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {`${props.item?.product_name || ""}`}
                    </Text>
                    <Text style={[styles.textStyle, { color: ColorApp.yellow, width: '50%', fontWeight: 'bold' }]}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {props.item?.price_cost ? `${props.item?.price_cost} VND` : ""}
                    </Text>
                    <Text style={[styles.textStyle, { color: ColorApp.yellow, fontWeight: 'bold' }]}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        Số lượng: {props.item?.product_quantity}
                    </Text>
                </View>
            </View>

        </View>
    )
}


export const OrderPage = observer(({ route, navigation }) => {
    const { OrderStore, AuthStore } = useStore();
    const [isShowListDistrictModal, setIsShowListDistrictModal] = React.useState(false);
    const [isShowListWardModal, setIsShowListWardModal] = React.useState(false);
    const [isShowListCityModal, setIsShowListCityModal] = React.useState(false);
    const [isShowMethodPayment, setIsShowMethodPayment] = React.useState(false);
    const [isShowOrderedInformation, setIsShowOrderedInformation] = React.useState(false);
    const [chosenListdProduct, setChosenListProduct] = React.useState([]);
    const [methodPayment, setMethodPayment] = React.useState([
        { type: "Tiền mặt", value: 1 },
        { type: "Chuyển khoản", value: 2 }
    ]);
    const [chosenDistrict, setChosenDistrict] = React.useState("");
    const [chosenCity, setChosenCity] = React.useState("");
    const [chosenWard, setChosenWard] = React.useState("");
    const [chosenMethod, setChosenMethod] = React.useState("");
    const feeShip = React.useRef("").current;
    let shippingInfor = React.useRef({
        shipping_name: "",
        shipping_address: "",
        shipping_phone: "",
        shipping_email: "",
        shipping_notes: "",
    })
    let [totalMoney, setTotalMoney] = React.useState();
    React.useEffect(() => {
        let chosenListdProduct = route?.params?.orderProduct;
        if (chosenListdProduct) {
            setChosenListProduct(chosenListdProduct)
            let moneyCalculated = 0;
            chosenListdProduct.map(product => {
                moneyCalculated = moneyCalculated + (product.price_cost * product.product_quantity)
            })
            setTotalMoney(moneyCalculated);
        }
        // let orderProduct = route.params ?;
        OrderStore.getListCity();
        return () => {
            OrderStore.setListChosenProduct([]);
        }
    }, [])
    function makeid(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }
    const orderProduct = async () => {
        console.log("shippingInfor", shippingInfor)

        let isDoneMakeShipping = false;
        let isDoneMakeOrder = false;
        let isDoneMakeDetail = false;
        OrderStore.setIsLoading(true);
        let shipping = {
            shipping_name: shippingInfor.current.shipping_name,
            shipping_address: shippingInfor.current.shipping_address,
            shipping_phone: shippingInfor.current.shipping_address,
            shipping_email: shippingInfor.current.shipping_email,
            shipping_notes: shippingInfor.current.shipping_notes
        }
        await OrderStore.makeShipping(shipping)
            .then(response => {
                console.log("userInfo", AuthStore.userInfo)
                console.log("Response", response)
                if (!response) {
                    return;
                }
                isDoneMakeShipping = true;
                let orderParam = {
                    customer_id: AuthStore.userInfo.customer_id,
                    shipping_id: response.shipping_id,
                    order_status: 1,
                    order_code: makeid(5),
                    order_date: new Date()
                }
                OrderStore.makeOrder(orderParam)
                    .then(async response => {
                        console.log("makeOrder Response", response)
                        if (!response) {
                            return;
                        }
                        isDoneMakeOrder = true;
                        if (chosenListdProduct.length > 0) {
                            let arrayPromise = [];
                            chosenListdProduct.forEach(product => {
                                // Cal culate free ship
                                let orderDetailParams = {
                                    order_code: response.order_code,
                                    product_id: product?.product_id || 0,
                                    product_name: product?.product_name || "",
                                    product_price: product?.product_price || "",
                                    product_sales_quantity: product?.product_quantity || "",
                                    product_coupon: "no",
                                    product_feeship: feeShip || "25000"
                                }
                                arrayPromise.push(OrderStore.makeOrderDetail(orderDetailParams))
                            })

                            // Promise all
                            await Promise.all(arrayPromise)
                                .then(response => {
                                    console.log("arrayPromise", response)
                                    isDoneMakeDetail = true;
                                })
                                .catch(error => {
                                    isDoneMakeDetail = false;
                                    console.log("error", error)
                                })
                        }
                        if (isDoneMakeShipping && isDoneMakeOrder && isDoneMakeDetail) {
                            Util.showNoticeAlert("Đã đặt hàng thành công")

                            navigation.navigate(Constant.PAGE_KEY.MAIN_PAGE_KEY);
                        }
                        else {

                            Util.showNoticeAlert("Đặt hàng không thành công")
                        }
                    })
                    .catch(error => {
                        console.log("error", error)
                    })
            })
            .catch(error => {
                console.log("makeShipping error,", error)
            })
            .finally(() => {
                OrderStore.setIsLoading(false);
            })

    }

    const onChoseCity = (city) => {
        setChosenCity(city)
        console.log("chosenCity", city)
        OrderStore.getListDistrict(city.matp);
    }
    const onChoseDistrict = (district) => {
        setChosenDistrict(district)
        console.log("chosenDistrict", district)
        OrderStore.getListWards(district.maqh);
    }
    const onChoseWard = (ward) => {
        setChosenWard(ward)
        console.log("chosenWard", ward)
    }
    const onChoseMethod = (method) => {
        onChoseMethod(method)
        console.log("chosenMethod", method)
    }
    const onCalculateFee = () => {
        let params = {
            fee_matp: chosenCity.matp,
            fee_maqh: chosenDistrict.maqh,
            fee_xaid: chosenWard.xaid,
        }
        OrderStore.calculateFee(params).then(response => {
            console.log("response", response)
            if (response) {
                feeShip = response?.fee_feeship;
            }
        })
    }
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
                    data={chosenListdProduct || []}
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
                        shippingInfor={shippingInfor.current}
                        chosenDistrict={chosenDistrict.name_quanhuyen}
                        chosenCity={chosenCity.name_city}
                        chosenWard={chosenWard.name_xaphuong}
                        chosenMethod={chosenMethod == 1 ? "Tiền mặt" : "Chuyển khoản"}
                        onCalculateFee={onCalculateFee}
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
                        {totalMoney}đ
                    </Text>
                </View>
                {/*  */}
                {/* Đặt hàng */}
                <TouchableOpacity onPress={orderProduct}>
                    <View style={styles.orderBtn}>
                        <Text style={[styles.textStyle, { fontSize: PixelRatio.roundToNearestPixel(15), fontWeight: 'bold', color: ColorApp.white }]}>
                            Đặt Hàng
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Is Show list city modal */}
            {isShowListCityModal && <ListCityModal isShowListCityModal={isShowListCityModal} setIsShowModal={setIsShowListCityModal} type={Constant.ORDER_MODAL_TYPE.LIST_CITY_MODAL} data={OrderStore.listCity} onChoseCity={onChoseCity} />}
            {/* Show list district modal */}
            {isShowListDistrictModal && <ListDistrictModal setIsShowModal={setIsShowListDistrictModal} type={Constant.ORDER_MODAL_TYPE.LIST_DISTRICT_MODAL} data={OrderStore.listDistricts} onChoseDistrict={onChoseDistrict}
            />}
            {/* Show list ward modal */}
            {isShowListWardModal && <ListWardModal setIsShowModal={setIsShowListWardModal} type={Constant.ORDER_MODAL_TYPE.LIST_WARD_MODAL} data={OrderStore.listWards} onChoseWard={onChoseWard}
            />}
            {/* Show Method modal */}
            {isShowMethodPayment && <ListPaymentMethod setIsShowModal={setIsShowMethodPayment} type={Constant.ORDER_MODAL_TYPE.PAYMENT_METHOD_MODAL} data={methodPayment} onChoseMethod={onChoseMethod} />}
            {/* Show loading */}
            {OrderStore.isLoading && <Util.indicatorProgress />}
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
        width: Constant.deviceW,
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


