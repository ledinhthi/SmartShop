
import React from "react";
import { Modal, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import ColorApp from "../utils/ColorApp";
import Constants from "../utils/Constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const ListCityModal = (props) => {
    let chosenItem = React.useRef().current;
    const setChosenItem = (chosenItem) => {
        chosenItem = chosenItem;
    }
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
                <View style={styles.inner}>
                    {/* Excape */}
                    <View >
                        <Text style={styles.textStyle, { color: ColorApp.white }}>
                            DANH SÁCH THÀNH PHỐ
                        </Text>
                    </View>
                    <FlatList
                        style={{ flexGrow: 0, minHeight: 70, maxHeight: 400, maxWidth: 300, backgroundColor: ColorApp.white }}
                        data={props.data}
                        contentContainerStyle={{
                            flexGrow: 1,
                            alignItems: 'center',
                            paddingVertical: 20
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    props.setIsShowModal(false);
                                    setChosenItem(item)
                                }}>
                                    <View style={{ height: 40, width: 250, marginHorizontal: 30, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={styles.textStyle}>
                                            {item.city}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    >
                    </FlatList>
                </View>
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
        color: ColorApp.black,
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
