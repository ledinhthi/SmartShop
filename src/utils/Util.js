import AsyncStorage from '@react-native-community/async-storage';
import React from "react";
import { ActivityIndicator, Alert, Animated, InteractionManager, Linking, View } from "react-native";
import Communications from "react-native-communications";
import ImagePicker from "react-native-image-picker";
import { BallIndicator } from 'react-native-indicators';
import i18n from "../translations/i18n";
import LOCALIZE_KEYS from "../translations/LOCALIZE_KEYS";
import Constants from "./Constants";
import { getDateStr } from './TimeHelper';

// based on iphone 5s's scale
// Use iPhone8 1x as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = Constants.deviceW / baseWidth;
const scaleHeight = Constants.deviceH / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);
export const scaledSize = (size) => Math.ceil((size * scale));

export const setItemAsyncStorage = async (key, value) => {
    let newKey = key.replace("-", "");
    await AsyncStorage.setItem(newKey, value);
}

export const getItemAsyncStorage = async (key) => {
    let newKey = key.replace("-", "");
    let data = await AsyncStorage.getItem(newKey);

    return data;
}

export const removeAllItemAsyncStorage = async () => {
    let status = await AsyncStorage.clear();

    return status;
}

export const removeKeyItemAsyncStorage = async (key) => {
    let status = await AsyncStorage.removeItem(key);

    return status;
}


export const invalidOrEmptyString = (str) => {
    return (str == null || typeof str == 'undefined' || str.trim().length == 0)
}

// Show notice dialog
export const showNoticeAlert = (
    title,
    message,
    cancelAble,
    callBack,
    textButton = i18n.t(LOCALIZE_KEYS.close_title)
) => {
    Alert.alert(
        title,
        message,
        [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            { text: textButton, onPress: callBack }
        ],
        { cancelable: cancelAble }
    );
};

// Show Confirm dialog
export const showConfirmAlert = (
    title,
    message,
    confirmTitle = i18n.t(LOCALIZE_KEYS.confirm_title),
    cancelTitle = i18n.t(LOCALIZE_KEYS.cancel_title),
    cancelAble,
    callbackConfirm,
    callbackCancel
) => {
    Alert.alert(
        title,
        message,
        [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            { text: confirmTitle, onPress: callbackConfirm },
            { text: cancelTitle, onPress: callbackCancel }
        ],
        { cancelable: cancelAble }
    );
};

// Show indicator progress bar.
export const indicatorProgress = (props = {}) => (
    <View style={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        zIndex: 99999999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    }} >
        <BallIndicator color={props.color || 'rgb(237,33,40)'} />
    </View>
);

export const indicatorProgressBottom = () => (
    <ActivityIndicator
        style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            zIndex: 9999
        }}
        color='#ffa500'
        size="large"
    />
);

export const indicatorProgressCenter = () => (
    <ActivityIndicator
        style={{
            position: "absolute",
            bottom: Constants.deviceH / 2,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            zIndex: 9999
        }}
        color='#ffa500'
        size="large"
    />
);

export const showImagePicker = (callbackDone, maxW = 512, maxH = 512) => {
    var options = {
        title: i18n.t(LOCALIZE_KEYS.select_a_photo_title),
        cancelButtonTitle: i18n.t(LOCALIZE_KEYS.cancel_title),
        takePhotoButtonTitle: i18n.t(LOCALIZE_KEYS.take_a_photo_title),
        chooseFromLibraryButtonTitle: i18n.t(LOCALIZE_KEYS.choose_from_gallery_title),
        quality: 1.0,
        maxWidth: maxW,
        maxHeight: maxH,
        allowsEditing: false,
        permissionDenied: {
            title: i18n.t(LOCALIZE_KEYS.permission_denied_title),
            text: i18n.t(LOCALIZE_KEYS.photo_permision_requeried_msg),
            reTryTitle: i18n.t(LOCALIZE_KEYS.retry_title),
            okTitle: i18n.t(LOCALIZE_KEYS.im_sure_title)
        }
    };

    ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
            return;
        } else if (response.error) {
            return;
        } else if (response.customButton) {
            return;
        } else {
            if (callbackDone) {
                callbackDone(response);
            }
        }
    });
}

export const getTimeFromDuration = (duration) => {
    // 86400 = 1 day 24 * 1 hour 60 * 1 minute 60
    var days = Math.floor(duration / 86400);
    let remainder = duration % 86400;
    var hours = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    var minutes = Math.floor(remainder / 60);
    var seconds = remainder % 60;

    if (days < 0) {
        days = 0;
    }
    if (hours < 0) {
        hours = 0;
    }
    if (minutes < 0) {
        minutes = 0;
    }
    if (seconds < 0) {
        seconds = 0;
    }
    return { days, hours, minutes, seconds }
}

export const openLink = (url) => {
    if (!invalidOrEmptyString(url)) {
        Linking.openURL(url);
    }
}

export const openPhoneCall = (phoneNumber) => {
    if (phoneNumber && phoneNumber != '') {
        Communications.phonecall(phoneNumber, true);
    }
}

export const emailValidator = (e) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);
}

export const phoneValidator = (phoneInput) => {
    var phoneno = /^\d{6,12}$/;
    return phoneno.test(phoneInput);
}

//  validate code, double input
export const codeValidator = (codeNumber) => {
    var code  = /^\d{1,6}$/;
    return code.test(codeNumber);
}

// validate password input
export const passwordValidator = (password) => {
    var validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&])(?=.*[a-zA-Z]).{6,}$/;
    return validation.test(password);
} 
// validate \d{1,8}.?(\d{1,8})?
export const inputMeasureValidator = (inputMeasure) => {
    var measureValidator = /^(\d{1,8})[.]?(\d{1,8})?$/;
    return measureValidator.test(inputMeasure);
}

export const onSlideUpView = (translateYValue) => {
    InteractionManager.runAfterInteractions().then(() => {
        Animated.spring(translateYValue, {
            toValue: 0,
            tension: 25,
            useNativeDriver: true,
        }).start(() => {
            // this.setViewState({ isF: false })
        });
    });
}

const _getDifference = (date) => {
    return parseInt(((new Date()).getTime() - date.getTime()) / 1000);
}


export const getChatDate = (dateStr) => {
    const mDate = new Date(dateStr);
    var diff = _getDifference(mDate);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    switch (true) {
        case diff < 30:
            // if (diff <= 0) {
            return "Now"
            // }
            return diff + " secs ago";
        case diff < 2 * minute:
            return "1 min ago";
        case diff < hour:
            return `${Math.floor(diff / minute)} mins ago`;
        case Math.floor(diff / hour) === 1:
            return `1 hr ago`;
        case diff < day:
            return `${Math.floor(diff / hour)} hrs ago`;
        case diff < 2 * day:
            return `Yesterday, ` + getDateStr(mDate, "HH:mm A");
        default:
            return getDateStr(mDate, "DD MMM YYYY, HH:mm A");
    }
}