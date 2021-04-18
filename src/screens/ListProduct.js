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
import ColorApp from '../utils/ColorApp';


export const ListProduct = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
                source={{ uri: "http://smartshopnew.tk/public/frontend/images/logo.jpg" }}
            >
            </Image>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: ColorApp.red
    },
    logo: {
        height: 100,
        width: 150,
        resizeMode: 'contain'
    },

})


