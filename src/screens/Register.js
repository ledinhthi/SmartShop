import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard
} from 'react-native';
import * as data from "../models/index"
import { COLOR } from '../utils/Constant'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity } from 'react-native-gesture-handler';


export const Login = (props) => {
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                        <Text style = {styles.text}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Text style = {styles.text}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Button */}
                <ActionBtn title={"Đăng nhập"} actionBtn={styles.loginBtn} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.white
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 24,
        width: '80%',
        height: PixelRatio.roundToNearestPixel(48),
    },
    text: {
        color: COLOR.yellow,
        fontSize: PixelRatio.roundToNearestPixel(14)
    }
})


