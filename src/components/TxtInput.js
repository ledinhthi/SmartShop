import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import { COLOR } from '../utils/Constant'

export const TxtInput = (props) => {
    return (
        <View style={[styles.container, props.txtInput]}>
            <TextInput style={styles.txtInput}
                placeholder={props.placeholder || "Nhap"}
                placeholderTextColor={COLOR.gray}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      
        borderColor: COLOR.gray,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 3
    },
    txtInput: {
        // flex: 1,
        backgroundColor: 'red',
        fontSize: PixelRatio.roundToNearestPixel(10),
        textAlign: 'center'
    }
})