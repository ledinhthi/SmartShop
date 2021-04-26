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
import { useStore } from "../stores/useStore";
import { observer } from "mobx-react";
import * as Util from "../utils/Util";

export const Register = observer(({ route, navigation }) => {
    const { AuthStore } = useStore();
    let name = React.useRef("").current;
    let email = React.useRef("").current;
    let password = React.useRef("").current;
    let reEnterPassword = React.useRef("").current;
    let phone = React.useRef("").current;

    const goBack = () => {
        navigation.goBack()
    }

    const register = () => {
        if (Util.invalidOrEmptyString(name)) {
            Util.showNoticeAlert("Lỗi đăng ký", "Điền Tên!!");
            return;
        }
        if (Util.invalidOrEmptyString(email)) {
            Util.showNoticeAlert("Lỗi đăng ký", "Điền địa chỉ email!!");
            return;
        }
        if (Util.invalidOrEmptyString(password)) {
            Util.showNoticeAlert("Lỗi đăng ký", "Điền mật khẩu!!");
            return;
        }
        if (Util.invalidOrEmptyString(phone)) {
            Util.showNoticeAlert("Lỗi đăng ký", "Điền số điện thoại!!");
            return;
        }
        if (password != reEnterPassword) {
            Util.showNoticeAlert("Lỗi đăng ký", "Password không trùng nhau!!");
            return;
        }
        let params = {
            customer_name: name,
            customer_email: email,
            customer_password: password,
            customer_phone: phone
        }
        AuthStore.register(params)
    }

    const setName = (nameInput) => {
        name = nameInput
    }
    const setEmail = (emailInput) => {
        email = emailInput
    }

    const setPassword = (passwordInput) => {
        password = passwordInput
    }
    const setReEnterPassword = (reEnterPasswordInput) => {
        reEnterPassword = reEnterPasswordInput
    }
    const setPhone = (phoneInput) => {
        phone = phoneInput
    }
    React.useEffect(() => {
        if (AuthStore.registeredUserInfo) {
            Util.showConfirmAlert("Thành công", "Đăng ký thành công tài khoản!!", "Xác nhận", "Từ chối", true, goBack)
        }
    }, [AuthStore.registeredUserInfo])
    React.useEffect(() => {
        return () => {
            AuthStore.setRegisteredUserInfo(null);
        }
    }, [])
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <KeyboardAvoidingView style={styles.subContainer}
            >
                {/* Đăng ký title */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingVertical: 40, }}
                >
                    <Text style={[styles.text, { textAlign: 'center', fontWeight: '700', fontSize: PixelRatio.roundToNearestPixel(17), }]}>
                        ĐĂNG KÝ
                    </Text>
                    {/* Họ và tên  */}
                    <TxtInput txtInput={[styles.input, { marginTop: 40 }]} placeholder={"Họ và tên"} title={"Họ tên"}
                        setTextChanged={setName}
                    >
                    </TxtInput>
                    {/* Địa chỉ */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Địa chỉ email"} title={"Địa chỉ"}
                        setTextChanged={setEmail}
                    >
                    </TxtInput>
                    {/* Mật khẩu */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Mật khẩu"} title={"Mật khẩu"}
                        setTextChanged={setPassword}
                    >
                    </TxtInput>
                    {/* Nhập lại mật khẩu */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Nhập lại mật khẩu"} title={"Nhập lại mật khẩu"}
                        setTextChanged={setReEnterPassword}
                    >
                    </TxtInput>
                    {/* Nhập Số điện thoại */}
                    <TxtInput txtInput={[styles.input, { marginTop: 30 }]} placeholder={"Số điện thoại"} title={"Số điện thoại"}
                        setTextChanged={setPhone}
                    >
                    </TxtInput>
                    {/* Button */}
                    <ActionBtn title={"Đăng Ký"} actionBtn={styles.loginBtn} action={register} />
                    {/* Back to login */}
                    <TouchableOpacity onPress={goBack}>
                        <Text style={[styles.text, { marginTop: 20, color: ColorApp.black, fontWeight: '400', fontSize: PixelRatio.roundToNearestPixel(17) }]}>
                            Quay lại
                   </Text>
                    </TouchableOpacity>
                    {/* Show loading */}
                    {AuthStore.isLoading && <Util.indicatorProgress />}
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
})
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


