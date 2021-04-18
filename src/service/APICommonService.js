import axios from "react-native-axios";
import { invalidOrEmptyString } from "../utils/Util";
import { API_KEY, API_URL } from "./APIConstant";

class APICommonService {
  constructor() {
    this.ApiAxios = axios.create({
      baseURL: API_URL.SERVER_HOST,
      responseType: "json", // Automatically parses the JSON string in the response
      timeout: 60000, //time out 60s
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  updateBearerToken = (token) => {
    if (!invalidOrEmptyString(token)) {
      this.ApiAxios.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      this.ApiAxios.defaults.headers["Authorization"] = "";
    }
  };

  paserError = (err) => {
    if (err.hasOwnProperty("response")) {
      return err.response;
    }
    return err;
  };

  paserResponseData = (resp) => {
    if (resp.hasOwnProperty("data")) {
      return resp.data;
    }
    return resp;
  };

  axioGet = async (url, params = null) => {
    let options = {
      method: "get",
      url: url,
      params: params,
    };

    try {
      let dataResp = await this.ApiAxios(options);
      return this.paserResponseData(dataResp);
    } catch (err) {
      return this.paserError(err);
    }
  };

  axioPost = async (url, body) => {
    let options = {
      method: "post",
      url: url,
      data: body,
    };

    try {
      let dataResp = await this.ApiAxios(options);
      return this.paserResponseData(dataResp);
    } catch (err) {
      return this.paserError(err);
    }
  };

  axioDelete = async (url, params = null) => {
    let options = {
      method: "delete",
      url: url,
      params: params,
    };

    try {
      let dataResp = await this.ApiAxios(options);
      return this.paserResponseData(dataResp);
    } catch (err) {
      return this.paserError(err);
    }
  };
  axioPut = async (url, params = null) => {
    let options = {
      method: "put",
      url: url,
      data: params,
    };

    try {
      let dataResp = await this.ApiAxios(options);
      return this.paserResponseData(dataResp);
    } catch (err) {
      return this.paserError(err);
    }
  };

  login = async (username, password) => {
    let params = {};
    params[API_KEY.USER_NAME_KEY] = username;
    params[API_KEY.USER_PASSWORD_KEY] = password;

    return this.axioPost(API_URL.LOGIN, params);
  };

  checkExistingUserName = async (userName) => {
    let params = {
      name: userName
    };
    return this.axioGet(API_URL.CHECK_USER_NAME, params);
  };

  register = async (params = null) => {
    // return this.axioPost(API_URL.REGISTER, params);
    /*
      "name": "nguyennk",
        "password": "123123",
        "password_confirmation": "123123",
        "type": 1,
        "profile_type": 1,
        "nickname": "nguyen",
        "status": "Hello",
        "avatar_photo": binary
    */
    let url = `${API_URL.SERVER_HOST}${API_URL.REGISTER}`;
    let formdata = new FormData();
    formdata.append("name", params.name);
    formdata.append("password", params.password);
    formdata.append("password_confirmation", params.password_confirmation);
    formdata.append("profile_type", params.profile_type);
    formdata.append("type", params.type);
    formdata.append("nickname", params.nickname);
    formdata.append("status", params.status);

    if (params.avatar_photo) {
      formdata.append(`avatar_photo`, {
        uri: params.avatar_photo,
        type: "image/jpeg", // or use other libs to detect mimetype...
        name: `profile.jpg`,
      });
    }

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => {
        let status = response.status;
        return response.json().then((responseJson) => {
          let sJson = { ...responseJson, statusRequest: status };
          return sJson;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  forgotPassword = async (email) => {
    return this.axioGet(`${API_URL.FORGOT_PASSWORD}${email}`);
  };

  getCelebsData = async (type) => {
    let params ={type: type};
    return this.axioGet(API_URL.GET_LIST_USERS, params);
  };

  submitUpdateChatNotify = async () => {
    return this.axioPost(API_URL.UPDATE_RECEIVE_CHAT_NOTIFICATION);
  };
  reportUserChat = async (params) => {
    return this.axioPost(API_URL.REPORT_USER, params);
  };

  getSharingsData = async (userId, token) => {
    let url = API_URL.GET_SHARING_ACCOUNT.replace("{userid}", userId);
    url = `${url}?token=${token}`;
    return this.axioGet(url);
  };

  getSharingDataDetail = async (userId, token, sharedId) => {
    let url = API_URL.GET_SHARING_DATA_DETAIL.replace("{userid}", userId);
    url = `${url}/${sharedId}?token=${token}`;
    return this.axioGet(url);
  };

  deleteSharingData = async (sharingId, userId, token) => {
    let url = API_URL.DELETE_SHARING_ACCOUNT.replace("{userid}", userId);
    url = `${url}/${sharingId}?token=${token}`;
    return this.axioDelete(url);
  };

  searchSharingUsers = async (userId, token, searchInput) => {
    let url = API_URL.SEARCH_MY_SHARING_USER.replace("{userid}", userId);
    url = `${url}/${searchInput}?token=${token}`;
    return this.axioGet(url);
  };

  submitSharingData = async (userId, token, sharedId, sharedRole) => {
    let params = {
      shared_id: sharedId,
      shared_role: sharedRole,
    };
    let url = API_URL.SUBMIT_SHARE_USER.replace("{userid}", userId);
    url = `${url}?token=${token}`;
    return this.axioPost(url, params);
  };

  submitSharingDataV2 = async (userId, token, projectId, body) => {
    let url = API_URL.SUBMIT_SHARED_DATA_TO_USERS.replace("{userid}", userId);
    url = url.replace("{token}", token);
    url = url.replace("{project_id}", projectId);

    return this.axioPost(url, body);
  };

  updateSharingData = async (userId, token, id, sharedId, sharedRole) => {
    let params = {
      shared_id: sharedId,
      shared_role: sharedRole,
    };

    let url = API_URL.UPDARE_SHARING.replace("{userid}", userId);
    url = `${url}/${id}?token=${token}`;
    return this.axioPost(url, params);
  };

  getSharedsData = async (userId, token) => {
    let url = API_URL.GET_LIST_DATA_SHARED.replace("{userid}", userId);
    url = `${url}?token=${token}`;
    return this.axioGet(url);
  };

  getSharedDataDetail = async (userId, token, sharedId) => {
    let url = API_URL.GET_SHARED_DATA_DETAIL.replace("{userid}", userId);
    url = `${url}/${sharedId}?token=${token}`;
    return this.axioGet(url);
  };

  confirmSharedData = async (userId, token, shareId) => {
    let url = API_URL.CONFIRM_SHARED_DATA.replace("{userid}", userId);
    url = `${url}/${shareId}?token=${token}`;
    return this.axioGet(url);
  };
  rejectSharedData = async (userId, token, shareId) => {
    let url = API_URL.REJECT_SHARED_DATA.replace("{userid}", userId);
    url = `${url}/${shareId}?token=${token}`;
    return this.axioGet(url);
  };

  getProfile = async (token) => {
    return this.axioGet(`${API_URL.PROFILE}?token=${token}`);
  };

  updateProfile = async (accessToken, params) => {
    // return this.axioPost(API_URL.REGISTER, params);
    /*
        "nickname": "nguyen",
        "status": "Hello",
        "avatar_photo": binary
    */
   let url = `${API_URL.SERVER_HOST}${API_URL.UPDATE_PROFILE}`;
   let formdata = new FormData();
   formdata.append("nickname", params.nickname);
   formdata.append("status", params.status);

   if (params.avatar_photo) {
     formdata.append(`avatar_photo`, {
       uri: params.avatar_photo,
       type: "image/jpeg", // or use other libs to detect mimetype...
       name: `profile.jpg`,
     });
   }
   console.log('FORM', formdata)

   return fetch(url, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "multipart/form-data",
       "Authorization": `Bearer ${accessToken}`
     },
     body: formdata,
   })
     .then((response) => {
       let status = response.status;
       return response.json().then((responseJson) => {
         let sJson = { ...responseJson, statusRequest: status };
         return sJson;
       });
     })
     .catch((err) => {
       console.log(err);
     });
  };

  updateFCMToken = async (userId, userToken, fcmToken) => {
    let params = {};
    params.phoneToken = fcmToken;

    let url = API_URL.UPDATE_FCM_TOKEN.replace("{userid}", userId);

    return this.axioPost(`${url}?token=${userToken}`, params);
  };

  removeFCMToken = async (userId, userToken, fcmToken) => {
    let params = {};
    params.phoneToken = fcmToken;

    let url = API_URL.UPDATE_FCM_TOKEN.replace("{userid}", userId);

    return this.axioDelete(`${url}?token=${userToken}`, params);
  };

  getNotifications = async (userId, token) => {
    let url = API_URL.GET_NOTIFICATION.replace("{userid}", userId);
    return this.axioGet(`${url}?token=${token}`);
  };

  markAsReadNotification = async (userId, token, notificationId) => {
    let url = API_URL.MARK_AS_READ_NOTIFICATION.replace("{userid}", userId);
    return this.axioGet(`${url}/${notificationId}?token=${token}`);
  };

  getSharingProjects = async (userId, token) => {
    let url = API_URL.GET_SHARING_PROJECTS.replace("{userid}", userId);
    return this.axioGet(`${url}?token=${token}`);
  };

  getUsersByProjectId = async (userId, token, projectId) => {
    let url = API_URL.GET_USERS_BY_PROJECT.replace("{userid}", userId);
    url = url.replace("{token}", token);
    url = url.replace("{project_id}", projectId);

    return this.axioGet(`${url}`);
  };

  submitSharedDataToUsers = async (userId, token, projectId, body) => {
    let url = API_URL.SUBMIT_SHARED_DATA_TO_USERS.replace("{userid}", userId);
    url = url.replace("{token}", token);
    url = url.replace("{project_id}", projectId);

    return this.axioPost(`${url}`, body);
  };

  deleteUserShared = async (userId, token, sharingId) => {
    let url = API_URL.DELETE_USER_SHARED.replace("{userid}", userId);
    url = url.replace("{token}", token);
    url = url.replace("{sharingid}", sharingId);

    return this.axioDelete(`${url}`);
  };
}

export default new APICommonService();
