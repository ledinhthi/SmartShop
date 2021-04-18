import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableOpacity, Image
} from 'react-native';
import ColorApp from '../utils/ColorApp'

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
        backgroundColor: ColorApp.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelRatio.roundToNearestPixel(8),
        maxHeight:  PixelRatio.roundToNearestPixel(40),
    },
    textStyle: {
        color: ColorApp.black362624,
        fontWeight: '700',
        fontSize: PixelRatio.roundToNearestPixel(16),
    }
})