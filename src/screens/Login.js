import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard, TouchableOpacity
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import Constant from '../utils/Constant'
import { useStore } from "../stores/useStore";
import { observer } from "mobx-react";
export const Login = observer(({route, navigation}) => {
    const onRegisterBtn = () => {
        navigation.navigate(Constant.PAGE_KEY.REGISTER_PAGE_KEY)
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <KeyboardAvoidingView style={styles.subContainer}>

                <Image style={styles.logo}
                    source={{ uri: "http://smartshopnew.tk/public/frontend/images/logo.jpg" }}
                >
                </Image>
                {/* Username Input */}
                <TxtInput txtInput={[styles.input, { marginTop: 50 }]} placeholder={"Nhập tài khoản"} title={"Tài khoản"}>
                </TxtInput>
                {/* Password Input */}
                <TxtInput txtInput={[styles.input]} placeholder={"Nhập mật khẩu"} title={"Mật khẩu"}>
                </TxtInput>
                {/* Forgot, register */}
                <View style={{width: '80%', flexDirection: 'row', marginTop: 10}}>
                    <TouchableOpacity style={{flex: 1, alignSelf: 'flex-start' }}>
                        <Text style={styles.text}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end' }}
                        onPress ={onRegisterBtn}
                    >
                        <Text style={[styles.text]}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>

                <ActionBtn title={"Đăng nhập"} actionBtn={styles.loginBtn} />
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
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorApp.white
    },
    logo: {
        height: 100,
        width: 200,
        resizeMode: 'contain'
    },
    input: {
        width: '80%',
        height: PixelRatio.roundToNearestPixel(48),
        marginTop: PixelRatio.roundToNearestPixel(30),
    },
    loginBtn: {
        marginTop: 20,
        width: '80%',
        height: PixelRatio.roundToNearestPixel(48),
    },
    text: {
        color: ColorApp.black362624,
        fontSize: PixelRatio.roundToNearestPixel(14),
        fontWeight: '700'
    }
})


