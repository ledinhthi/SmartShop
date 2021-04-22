
import React from "react";
import { Modal, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import ColorApp from "../utils/ColorApp";
import Constants from "../utils/Constant";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const OrderModal = (props) => {

    return (
        <View style={[styles.modalView, { ...StyleSheet.absoluteFillObject }]}>
            <Modal
                visible={true}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >

                {props?.type != Constants.ORDER_MODAL_TYPE.ORDERED_INFORMATION
                    ?
                    <View style={styles.inner}>
                        {/* Excape */}
                        <FlatList
                            style={{ maxHeight: 400, maxWidth: 300, backgroundColor: ColorApp.white }}
                            data={props.data}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        props.setIsShowModal(false);
                                    }}>
                                        <View style={{ height: 50, width: 300, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                            <Text style={styles.textStyle}>
                                                {item.district}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        >
                        </FlatList>
                        
                    </View>

                    :
                    <View style={{ width: 400, height: 400 }}>

                    </View>
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,

        zIndex: 999999,
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: ColorApp.bgShadowPopup,
        paddingVertical: 20
    },
    alert: {
        width: '70%',
        borderRadius: 8,
        backgroundColor: ColorApp.white
    },
    groupButton: {
        borderTopWidth: 1,
        borderTopColor: ColorApp.grayDADADA,
        width: '100%',
        flexDirection: 'row',
        height: PixelRatio.roundToNearestPixel(38),
        marginBottom: 5
    },
    confirmButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderRightColor: ColorApp.grayDADADA,
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    textStyle: {
        fontFamily: Constants.FONT_NAME.NOTO_SANDS_REGULAR,
        fontWeight: '500',
        color: ColorApp.blue597CEB,
        fontSize: PixelRatio.roundToNearestPixel(16)
    },
    alertContent: {
        paddingVertical: 25,
        paddingHorizontal: 40,
        justifyContent: 'center'
    },
    reportAlert: {
        overflow: 'hidden',
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    scrollContainer: {
        backgroundColor: ColorApp.white,
        alignSelf: 'center',
        height: 400,
    },

})
