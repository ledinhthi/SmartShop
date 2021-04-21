import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, TouchableHighlight
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


export const Register = (props) => {
    const goBack = () => {
        props.navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <KeyboardAvoidingView style={styles.subContainer}
            >
                {/* Đăng ký title */}
                <ScrollView 
                contentContainerStyle ={{flexGrow: 1,   paddingVertical: 40,}}
                >
                    <Text style={[styles.text, {textAlign: 'center', fontWeight: '700', fontSize: PixelRatio.roundToNearestPixel(17), }]}>
                        ĐĂNG KÝ
                   </Text>
                    {/* Họ và tên  */}
                    <TxtInput txtInput={[styles.input, { marginTop: 40 }]} placeholder={"Họ và tên"} title={"Họ tên"}>
                    </TxtInput>
                    {/* Địa chỉ */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Địa chỉ email"} title={"Địa chỉ"}>
                    </TxtInput>
                    {/* Mật khẩu */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Mật khẩu"} title={"Mật khẩu"}>
                    </TxtInput>
                    {/* Nhập lại mật khẩu */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Nhập lại mật khẩu"} title={"Nhập lại mật khẩu"}>
                    </TxtInput>
                    {/* Nhập Số điện thoại */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Số điện thoại"} title={"Số điện thoại"}>
                    </TxtInput>
                    {/* Button */}
                    <ActionBtn title={"Đăng Ký"} actionBtn={styles.loginBtn} />
                    {/* Back to login */}
                    <TouchableOpacity onPress={goBack}>
                        <Text style={[styles.text, {marginTop: 20, color: ColorApp.black, fontWeight: '400', fontSize: PixelRatio.roundToNearestPixel(17) }]}>
                            Quay lại
                   </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorApp.white
    },

    text: {
        color: ColorApp.yellow,
        fontSize: PixelRatio.roundToNearestPixel(14),
        fontWeight: '400'
    },
    input: {
        width: '100%',
        height: PixelRatio.roundToNearestPixel(48),
        marginTop: PixelRatio.roundToNearestPixel(30),
    },
    loginBtn: {
        marginTop: 30,
        width: '100%',
        height: PixelRatio.roundToNearestPixel(48),
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 50,
        backgroundColor: ColorApp.white
    },
})


