import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import * as data from "../models/index"
import { COLOR } from '../utils/Constant'

export const Login = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <Image style={styles.logo}
                source={{ uri: data.LOGO }}
            >
            </Image>
            {/* Username Input */}
            <TextInput style={[styles.input, { marginTop: 20, fontSize: 10 }]}
                placeholder={"Nhập userName "}
                placeholderTextColor={COLOR.gray}
            >
            </TextInput>
            {/* Password Input */}
            <TextInput style={[styles.input, { marginTop: 10, fontSize: 10 }]}
                placeholder={"Nhập password "}
                placeholderTextColor={COLOR.gray}
            >
            </TextInput>
            {/* Button */}
            <Button style = {styles.loginBtn}
            color = {COLOR.green}
            >

            </Button>
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
        flex: 1,
        height: 40,
        paddingHorizontal: PixelRatio.roundToNearestPixel(20)
    },
    loginBtn: {
        height: 45,
        width: '60%'
    }
})


