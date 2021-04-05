import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableOpacity, Image
} from 'react-native';
import { COLOR } from '../utils/Constant'

export const ActionBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.container, props.actionBtn]}
            onPress={() => {
                console.log("OnActionBtn")
            }}
        >
            <Text style={styles.textStyle}>
                {props.title || "Unknown"}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        backgroundColor: COLOR.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelRatio.roundToNearestPixel(10),
        maxHeight:  PixelRatio.roundToNearestPixel(40),
    },
    textStyle: {
        color: COLOR.red,
        fontSize: PixelRatio.roundToNearestPixel(12),
    }
})