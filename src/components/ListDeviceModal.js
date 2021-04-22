import React from "react";
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import ColorApp from "../utils/ColorApp";
import Constants from "../utils/Constant";


export const ListDeviceModal = (props) => {
    let translateXValue = React.useRef(new Animated.Value(0));

    React.useState(() => {
        return () => {
            slideOut()
        }
    }, [])
    React.useState(() => {
        if (props.sShowSliding) {
            slideIn()
        }
    }, [props.isShowSliding])

    const slideOut = () => {
        Animated.timing(
            translateXValue.current, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    }

    const slideIn = (callback) => {
        Animated.timing(
            translateXValue.current, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();

        setTimeout(() => {
            if (!!callback) {
                callback()
            }
        }, 200);
    }
    return (
        // <SafeAreaView style={[styles.modalView, { ...StyleSheet.absoluteFillObject }]} >

        < View style={[styles.modalView, { ...StyleSheet.absoluteFillObject }]}
        >
            <View style={{
                zIndex: -10,
                position: 'absolute',
                height: '100%',
                top: 0,
                right: 0,
                width: '30%',
            }}
                onTouchStart={() => {
                    props?.setIsShowSliding(false)
                }}
            >
            </View>
            <Animated.View style={[styles.inner, {
                transform: [
                    {
                        translateX: translateXValue.current
                    }
                ]
            }]}
            >

            <View style = {{backgroundColor: ColorApp.red}}>

            </View>
            </Animated.View>
        </View >
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: ColorApp.bgShadowPopup,
        zIndex: 10,
        position: 'absolute',
        left: 0
    },
    inner: {
        flex: 1,
        alignSelf: 'flex-start',
        paddingTop: Constants.isIPhoneX ? 20 : 0,
        backgroundColor: COLOR.white,
        width: '50%',
    },
    header:
    {
        flexDirection: 'row',
        width: '100%',
        height: 64,
        paddingHorizontal: 16,
        paddingVertical: 19,
        borderBottomWidth: 1,
        borderBottomColor: ColorApp.grayF0F0F0
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 72,
        paddingHorizontal: 16,
        paddingVertical: 26,
        backgroundColor: ColorApp.grayF6F6F6
    },
    settingsRoomTitle: {
        flex: 2,
        justifyContent: 'center',
    },
    settingsBtnAndBell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        fontSize: PixelRatio.roundToNearestPixel(14),
        fontFamily: Constants.FONT_NAME.NOTO_SANDS_REGULAR,
        fontWeight: '400',
        color: ColorApp.gray1D2129
    },
    settingsBtn: {
        width: 22,
        height: 22
    },
    bell: {
        width: 20,
        height: 22
    },
    arrowRight: {
        width: 16,
        height: 12,
        marginLeft: 8
    }
})