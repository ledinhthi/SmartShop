import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import * as data from "../models/index"
import { COLOR } from '../utils/Constant'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'


export const Login = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <Image style={{
                width: 100,
                height: 50,
                resizeMode: 'cover'
            }}
                source={{
                    uri: "https://www.w3schools.com/w3css/img_lights.jpg"

                }}
            >
            </Image>
            {/* Username Input */}
            <TxtInput txtInput={[styles.input, {marginTop: 40}]} placeholder={"Nhập username"}>
            </TxtInput>
            {/* Password Input */}
            <TxtInput txtInput={[styles.input,  {marginTop: PixelRatio.roundToNearestPixel(15)}]} placeholder={"Nhập password "}>
            </TxtInput>
            {/* Button */}
            <ActionBtn title={"Login"} actionBtn={{ width: 150, height: 30, marginTop: PixelRatio.roundToNearestPixel(20) }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 40,
        width: 80,
        resizeMode: 'cover'
    },
    input: {
        width: PixelRatio.roundToNearestPixel(150),
        height: PixelRatio.roundToNearestPixel(35),
        marginTop: PixelRatio.roundToNearestPixel(10),
    },
    loginBtn: {
        height: 45,
        width: '60%'
    }
})


