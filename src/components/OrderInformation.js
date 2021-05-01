import React from "react";
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import ColorApp from "../utils/ColorApp";
import Constants from "../utils/Constants";
import { TxtInput } from "./TxtInput"
import { TextInput } from "react-native-gesture-handler";
import { OrderModal } from "../components/OrderModal"
export const OrderInformation = (props) => {
    const onEmailChanged = (email) => {
        console.log("email", email)
        props.shippingInfor.shipping_email = email;
        console.log("props.shippingInfor?.shipping_email", props.shippingInfor?.shipping_email)
    }
    const onAddress = (address) => {
        console.log("email", address)
        props.shippingInfor.shipping_address = address;
        console.log("props.shippingInfor?.shipping_address", props.shipping_address?.shipping_address)
    }
    const onSender = (sender) => {
        console.log("sender", sender)
        props.shippingInfor.shipping_name = sender;
        console.log("props.shippingInfor?.shipping_name", props.shippingInfor?.shipping_name)
    }
    const onPhone = (phone) => {
        console.log("phone", phone)
        props.shippingInfor.shipping_phone = phone;
        console.log("props.shippingInfor?.shipping_phone", props.shippingInfor?.shipping_phone)
    }

    const onNotes = (notes) => {
        console.log("notes", notes)
        props.shippingInfor.shipping_notes = notes;
        console.log("props.shippingInfor?.shipping_notes", props.shippingInfor?.shipping_notes)
    }
    return (
        < View style={styles.container}
        >
            <View>
                {/* Email */}
                <TxtInput txtInput={[styles.input]} placeholder={"Email"} title={"Email"} setTextChanged={onEmailChanged} >
                </TxtInput>
                {/* Họ tên người gửi */}
                {/* Password Input */}
                <TxtInput txtInput={[styles.input]} placeholder={"Họ tên người gửi"} title={"Họ tên người gửi"}
                    setTextChanged={onSender}
                >
                </TxtInput>
                {/* Địa chỉ gửi hang */}
                {/* Password Input */}
                <TxtInput txtInput={[styles.input]} placeholder={"Địa chỉ gửi hàng"} title={"Địa chỉ gửi hang"}
                    setTextChanged={onAddress}
                >
                </TxtInput>
                {/* Số Điện thoại */}
                {/* Password Input */}
                <TxtInput txtInput={[styles.input]} placeholder={"Số Điện thoại"} title={"Số Điện thoại"}
                    setTextChanged={onPhone}
                >
                </TxtInput>
                {/* Ghi chú đơn hàng */}
                {/* Password Input */}
                <TxtInput txtInput={[styles.input]} placeholder={"Ghi chú đơn hàng "} title={"Ghi chú đơn hàng"}
                    setTextChanged={onNotes}
                >
                </TxtInput>
                {/* Chọn thành phố */}
                <TouchableOpacity onPress={() => {
                    props.setIsShowListCityModal(true)
                }}>
                    <TxtInput txtInput={[styles.input]} placeholder={"Chọn thành phố"} title={"Chọn thành phố"}
                        editable={false}
                        value={props.chosenCity}
                    >
                    </TxtInput>
                </TouchableOpacity>
                {/* Quận huyện */}
                <TouchableOpacity onPress={() => {
                    props.setIsShowListDistrictModal(true)
                }}>
                    <TxtInput txtInput={[styles.input]} placeholder={"Quận huyện"} title={"Quận huyện"}
                        value={props.chosenDistrict}
                        editable={false}
                    >
                    </TxtInput>
                </TouchableOpacity>
                {/* Xã phường */}
                <TouchableOpacity onPress={() => {
                    props.setIsShowListWardModal(true)

                }}>
                    <TxtInput txtInput={[styles.input]} placeholder={"Xã phường"} title={"Xã phường"}
                        editable={false}
                        value={props.chosenWard}
                    >
                    </TxtInput>
                </TouchableOpacity>
                {/* Chọn hình thức thành toán */}
                <TouchableOpacity onPress={() => {
                    props.setIsShowMethodPayment(true)
                }}>
                    <TxtInput txtInput={[styles.input]} placeholder={"Chọn hình thức thành toán"} title={"Chọn hình thức thành toán"}
                        editable={false}
                        value={props.chosenMethod}
                    >
                    </TxtInput>
                </TouchableOpacity>
                {/* Chuyển khoản */}
                {/* Tính phí chuyển khoản */}
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={{
                        height: PixelRatio.roundToNearestPixel(35), width: 150,
                        paddingHorizontal: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3, backgroundColor: ColorApp.yellow
                    }}
                        onPress={() => {
                           props?.onCalculateFee();
                        }}
                    >
                        <Image style={{ height: 15, width: 15, tintColor: ColorApp.white }}
                            resizeMode='contain'
                            source={require("../../images/shopping-cart.png")}
                        >
                        </Image>
                        <Text style={[styles.textStyle, { fontSize: 11, marginLeft: 4, color: ColorApp.white }]}>
                            Tính phí chuyển khoản
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorApp.white,
    },
    input: {
        width: '100%',
        height: PixelRatio.roundToNearestPixel(48),
        marginTop: PixelRatio.roundToNearestPixel(30),
    },
    textStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14),
    },

})