import React from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, PixelRatio, SafeAreaView, KeyboardAvoidingView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import ColorApp from '../utils/ColorApp'

export const TxtInput = (props) => {
    return (
        <View style={[styles.container, props.txtInput]}>
            <Text style={styles.text}>
                {props.title || ""}
            </Text>
            <TextInput style={{ height: PixelRatio.roundToNearestPixel(48) }}
                placeholder={props.placeholder || ""}
                editable={props?.editable || true}
                placeholderTextColor={ColorApp.gray}
                
                onChangeText={(textChanged) => {
                    props?.setTextChanged(textChanged)
                }}
            >
            </TextInput>
        </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: ColorApp.gray,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 3
    },
    txtInput: {
        backgroundColor: ColorApp.red,
        fontSize: PixelRatio.roundToNearestPixel(16),
        textAlign: 'left',
        marginTop: 5,
        color: ColorApp.black
    },
    text: {
        position: 'absolute',
        top: -25
    }

})