export const API_URL = {
    /*  BASE_URL */
    SERVER_HOST: 'http://3.36.154.3:8100/api/v1/',

    REGISTER: "auth/register",
    FORGOT_PASSWORD: "api/v1/users/forgotpassword/",
    LOGIN: "auth/login", 
    GET_LIST_USERS: 'users',
    PROFILE: 'api/v1/users/self',
    UPDATE_PROFILE: "user/profile",
    CHECK_USER_NAME: 'user/check/name',
    UPDATE_RECEIVE_CHAT_NOTIFICATION: 'user/receive-notification',
    REPORT_USER: 'reports',
    GET_SHARING_ACCOUNT: 'api/v1/datasharing/{userid}/list',
    GET_SHARING_DATA_DETAIL: 'api/v1/data/{userid}/detail',
    DELETE_SHARING_ACCOUNT: 'api/v1/datasharing/{userid}/delete',
    SEARCH_MY_SHARING_USER: 'api/v1/web/{userid}/search',
    SUBMIT_SHARE_USER: 'api/v1/datasharing/{userid}',
    UPDARE_SHARING: 'api/v1/datasharing/{userid}/edit',
    UPDATE_FCM_TOKEN: 'api/v1/phonetoken/{userid}',
    GET_LIST_DATA_SHARED: 'api/v1/datasharing/{userid}/data',
    GET_SHARED_DATA_DETAIL: 'api/v1/datasharing/{userid}/detaildatashare',
    CONFIRM_SHARED_DATA: 'api/v1/datasharing/{userid}/confirm',
    REJECT_SHARED_DATA: 'api/v1/datasharing/{userid}/reject',
    GET_NOTIFICATION: 'api/v1/notification/{userid}',
    MARK_AS_READ_NOTIFICATION: 'api/v1/notification/{userid}',
    GET_SHARING_PROJECTS: 'api/v1/web/{userid}/List',
    GET_USERS_BY_PROJECT: 'api/v1/datasharing/{userid}/list/all?token={token}&project={project_id}',
    SUBMIT_SHARED_DATA_TO_USERS: 'api/v1/datasharing/{userid}/save/all?token={token}&project={project_id}',
    DELETE_USER_SHARED: 'api/v1/datasharing/{userid}/delete/{sharingid}?token={token}'
}


export const API_KEY = {
    ACCEPT_LANGUAGE_KEY: 'Accept-Language',
    PUSHING_TOKEN_KEY: 'pushing_toke',
    AUTHORIZATION_KEY: 'Authorization',
    USER_NAME_KEY: 'name',
    USER_PASSWORD_KEY: 'password',
    CONFIRM_PASSWORD_KEY: 'password_confirmation',

}