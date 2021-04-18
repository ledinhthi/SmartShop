import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image, Keyboard
} from 'react-native';
import * as data from "../models/index"
import ColorApp from '../utils/ColorApp'
import { TxtInput } from '../components/TxtInput'
import { ActionBtn } from '../components/ActionBtn'
import { TouchableOpacity } from 'react-native-gesture-handler';


export const BasketStore = (props) => {
    return (
        <View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorApp.white
    },

})


