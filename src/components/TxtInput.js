import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import { COLOR } from '../utils/Constant'

export const TxtInput = (props) => {
    return (
        <View style={[styles.container, props.txtInput]}>
            <Text style={styles.text}>
                {props.title || ""}
            </Text>
            <TextInput style={{height: PixelRatio.roundToNearestPixel(48)}}
                placeholder={props.placeholder || ""}
                placeholderTextColor={COLOR.gray}>
            </TextInput>
        </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: COLOR.gray,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 3
    },
    txtInput: {
        backgroundColor: 'red',
        fontSize: PixelRatio.roundToNearestPixel(16),
        textAlign: 'left',
        marginTop: 5,
        color: COLOR.black
    },
    text: {
        position: 'absolute',
        top: -25
    }

})