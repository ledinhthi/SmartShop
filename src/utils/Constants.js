import { Platform, StatusBar, Dimensions, PixelRatio } from "react-native";
// import DeviceInfo from "react-native-device-info";


export class GlobalVariables {
  // static info;
}


export default module = {
  lastLat: 0,
  lastLng: 0,
  fcmToken: '',
  deviceW: getDeviceResolution(true),
  deviceH: getDeviceResolution(false),
  isIOS: checkIOS(),
  // uniqueDeviceID: getUniqueDeviceId(),
  // isIPhoneX: checkIPhoneX(),
  // isAndroidX: checkAndroidX(),
  statusBarH: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  HEIGHT_NAVIGATION_BAR: checkIOS() ? 75 : 60,
  WIDTH_TAB_ICON: 27,
  HEIGHT_TAB_ICON: 36,
  HEIGHT_BUTTON: 50,
  HEIGHT_BUTTON_SMALL: 40,
  HEIGHT_TEXT_INPUT_SMALL: 40,
  HEIGHT_INPUT: checkIOS() ? 50 : 50,
  OPACITY_BUTTON: 0.7,
  FONT_TEXT_DEFAULT: 14,
  PAD_LEFT_RIGHT_NORMAL_APP: 15,
  PAD_LEFT_RIGHT_FLAG_LOGIN: 10,

  VERSION_APP: `1.1.0`,
  VERSION_APP_CODE: 11,

  // Delay time to load more data
  DELAY_TIME_TO_LOAD_MORE: 300,

  // Check app already open
  isHomeOnScreen: false,

  DATE_TIME_FORMAT: {
    MM_DD_YYYY: 'MM/DD/YYYY',
    YYYY_MM_DD: 'YYYY-MM-DD',
    YYYYMMDDHHMMSS: 'YYYY-MM-DD hh:mm:ss',
    DDMMYYYY: 'DD/MM/YYYY',
    DO_MMMM: 'Do MMMM',
    D_MMMM_YYYY: 'D MMMM, YYYY',
    DD_MMM_YYYY: 'DD MMM, YYYY',
    YYYYMMDD_T_HHMMSS_SSSZ: 'YYYY-MM-DDTHH:mm:ss.SSSz',
    HH_MM_DD_MM_YYYY: 'hh:mm, DD/MM/YYYY',
    DD_MM_YYYY_HH_MM: 'DD/MM/YYYY - HH:mm',
    HH_MM_SS: 'HH:mm:ss',
    HH_MM: 'HH:mm'
  },

  PAGE_KEY: {
    // Guest
    SPLASH_PAGE_KEY: 'SplashPage',
    LOGIN_PAGE_KEY: 'LoginPage',
    REGISTER_PAGE_KEY: 'RegisterPage',
    FORGOT_PASSWORD_KEY: 'ForgotPasswordPage',

    //dashboard
    MAIN_PAGE_KEY: 'MainPage',
    PRODUCT_PAGE_KEY: 'ProductPage',
    BASKET_PAGE_KEY: 'BasketPage',
    BASKET_DETAIL_PAGE_KEY: 'BasketDetailPage',
    VIDEO_PAGE_KEY: 'VideoPage',
    LIST_PRODUCT_PAGE_KEY: 'ListProductPage',
    DETAIL_PRODUCT_PAGE_KEY: 'DetailProductPage',
    LOOK_OVER_PAGE_KEY: 'Xem nhanh',
    ORDER_PAGE_KEY: 'OrderPage',
    MAIN_DASKBOARD: 'MainDashboard'
  },

  STACK_SCREEN_KEY: {
    SPLASH_STACK_KEY: 'SplashStack',
    DASHBOARD_STACK_KEY: 'DashboardStack',
    GUEST_STACK_KEY: 'GuestStack',
  },

  APP_EVENT_KEY: {
    CHANGE_STACK_NOTIFY_KEY: 'ChangeStackNotify',

    SUCCESS_UPDATED_PROFILE: 'SuccessUpdatedProfile',

    PROCESS_PUSH_FROM_FB: 'ProcessPushFromFirebase',
    NEW_NOTIFICATION: 'HaveNewNotification',
    USER_SUCCESS_LOG_IN: 'UserSuccessLogin',
    USER_LOGOUT: 'UserLogout',
    RELOAD_MAINTENANCE_JOB: 'RELOAD_MAINTENANCE_JOB',
    RELOAD_MAINTENANCE_JOBS: 'RELOAD_MAINTENANCE_JOBS',

    RELOAD_JOBS_DATA: 'RELOAD_JOBS_DATA',

    INCREASE_COMMENT_COUNTING_JOB: 'INCREASE_COMMENT_COUNTING_JOB',

    UPDATE_FOCUS_INDEX_PD_DETAIL: 'UPDATE_FOCUS_INDEX_PD_DETAIL',
    NAVIGATO_TO_SHARED_DATA_DETAIL: 'GoToSharedDataDetail'
  },

  ASYNC_STORAGE_KEY: {
    EMAIL: 'emailIlio',
    PASSWORD: 'passwordIlio',
    ALREADY_USING_APP: 'AlreadyUsingAppIlio',
    DEFAULT_LOCALE_LANGUAGE: 'DefaultLocaleLanguageIlio',
    ASK_PERMISSION_PNS_FIRST_TIME: 'AskPermissionPNSFirstTimeIlio',
  },

  LANGUAGES_SUPPORT: {
    EN: 'en',
    VN: 'vi'
  },
  LANGUAGES_SUPPORT_DISPLAY: {
    EN: 'EN',
    VN: 'VN',
  },

  APP_STATE_KEYS: {
    active: '',
    inactive: 'inactive',
    background: 'background'
  },

  FONT_NAME: {
    NOTO_SANDS_BOLD_ITALIC: 'NotoSans-BoldItalic',
    NOTO_SANDS_BOLD: 'NotoSans-Bold',
    NOTO_SANDS_ITALIC: 'NotoSans-Italic',
    NOTO_SANDS_REGULAR: 'NotoSans'
  },

  NOTIFICATION_TYPE: {
    ERROR_ACCOUNT: 1,
    ERROR_FACEBOOK_ACCOUNT: 2,
    ERROR_GOOGLE_ACCOUNT: 3,
    HAVE_COMMENT_ON_PAGE: 4,
    HAVE_DATA_ON_PAGE: 5,
    HAVE_DATA_SHARED: 6
  },

  ORDER_MODAL_TYPE: {
    LIST_CITY_MODAL: 0,
    LIST_DISTRICT_MODAL: 1,
    LIST_WARD_MODAL: 2,
    PAYMENT_METHOD_MODAL: 3,
    ORDERED_INFORMATION: 4
  },
  PREFIX_URL: {
    PRODUCT: "http://smartshopnew.tk/public/uploads/product/",
    SLIDER: "http://smartshopnew.tk/public/uploads/slider/"
  }

}

function getDeviceResolution(isWidth) {
  const { width, height } = Dimensions.get('window');
  if (isWidth) {
    return width;
  }
  return height;
}

function checkIOS() {
  return Platform.OS === "ios";
}

// function getUniqueDeviceId() {
//   var uniqueId = DeviceInfo.getUniqueId();
//   return uniqueId;
// }

/* Check ipX and ip11 */
// function checkIPhoneX() {
//   let _isIphoneX = false;
//   if (Platform.OS === "ios") {
//     let model = DeviceInfo.getModel();
//     let indexX = model.toUpperCase().search("X");
//     let index11 = model.toUpperCase().search("IPHONE 1");
//     if ((indexX >= 0 && indexX < model.length) || (index11 >= 0 && index11 < model.length)) {
//       _isIphoneX = true;
//     }
//   }
//   return _isIphoneX;
// }

// function checkAndroidX() {
//   if (Platform.OS === "android") {
//     return DeviceInfo.hasNotch() || StatusBar.currentHeight >= 30 // || model == "redmi note 6 pro"
//   }

//   return false
// }

export function getNearestPixel(size) {
  return PixelRatio.roundToNearestPixel(size);
}