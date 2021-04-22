import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../services/APICommonService";
import i18n from "../translations/i18n";
import LOCALIZE_KEYS from "../translations/LOCALIZE_KEYS";
import Constants from "../utils/Constants";
import { removeKeyItemAsyncStorage, setItemAsyncStorage } from "../utils/Util";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  userToken = null;
  userId = null;

  @observable isLoading = false;
  @observable errLogin = null;
  @observable respCheckExistingName = null;
  @observable errRegister = null;
  @observable successRegister = null;
  @observable errProfileInfo = null;
  @observable profileInfoSuccessUpdated = null;
  @observable userInfo = null;
  @observable affiliateInfos = [];
  @observable errForgotPass = null;
  @observable respForgotPass = null;
  @observable registerInfoTemp = null;
  @observable registeredUserInfo = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };
  @action setErrorLogin = (err) => {
    this.errLogin = err;
  };

  @action setErrorRegister = (err) => {
    this.errRegister = err;
  };
  @action setSuccessRegister = (info) => {
    this.successRegister = info;
  };

  @action setRespCheckExistingName = (resp) => {
    this.respCheckExistingName = resp;
  };

  @action setErrorForgotPass = (err) => {
    this.errForgotPass = err;
  };

  @action setErrorProfileInfo = (err) => {
    this.errProfileInfo = err;
  };
  @action setProfileInfoSuccessUpdated = (info) => {
    this.profileInfoSuccessUpdated = info;
  }

  @action setLoginInfo = (info) => {
    if (info) {
      this.userToken = info.access_token;

      // Update Bearer toke
      APICommonService.updateBearerToken(this.userToken)

      this.userInfo = info.user;
    }
  };

  @action updateProfileInfo = (info) => {
    this.userInfo.profile = info;
  };

  @action updateUserInfo = (info) => {
    this.userInfo = info;
  };

  @action setRespForgotPass = (resp) => {
    this.respForgotPass = resp;
  };

  @action setRegisterInfoTemp = (info) => {
    this.registerInfoTemp = info;
  }
  @action setRegisteredUserInfo = (info) => {
    this.registeredUserInfo = info;
  }

  @action reset = () => {};

  @action logout = () => {
    // OFF HomeScreen flag when success logged-out
    Constants.isHomeOnScreen = false;

    // Update Bearer toke
    APICommonService.updateBearerToken(null)

    // Reset data
    removeKeyItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.USER_NAME);
    removeKeyItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.PASSWORD);
    this.userToken = null;
    this.userInfo = null;
  };

  @action resetDataForgotPass = () => {
    this.setErrorForgotPass(null);
    this.setRespForgotPass(null);
  };

  @action login = (username, pass) => {
    this.setLoading(true);
    this.setErrorLogin(null);
    APICommonService.login(username, pass)
      .then((resp) => {
        /*
        {"data": {"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zLjM2LjE1NC4zOjgxMDBcL2FwaVwvdjFcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjE4MDQ2OTIzLCJleHAiOjE2MTgwNTA1MjMsIm5iZiI6MTYxODA0NjkyMywianRpIjoibXRTY3M4WngyUk1CU2NLQyIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.jZC70G01_YlnnpdxsW_R2LoygmBjLaSw3tx8Ay3AVsc", "token_type": "Bearer", "user": {"created_at": "2021-04-05T07:17:38.000000Z", "email": "", "email_verified_at": null, "id": 1, "is_receive_notification": 1, "last_visited": null, "name": "nguyennk", "type": 1, "updated_at": "2021-04-05T07:17:38.000000Z"}}, "message": "Login success.", "success": true}
         */
        console.log("Resp", resp);
        if (resp.success && resp.data) {
          this.setLoginInfo(resp.data);

          // Save local to remember login
          setItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.USER_NAME, username);
          setItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.PASSWORD, pass);
        } else {
          this.setErrorLogin(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrorLogin(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action register = (params) => {
    this.setLoading(true);
    this.setErrorRegister(null);
    APICommonService.register(params)
      .then((resp) => {
        /* 
        {"data": {"created_at": "2021-04-11T15:16:41.000000Z", "email": "", "id": 2, "name": "son7kim", "type": 1, "updated_at": "2021-04-11T15:16:41.000000Z"}, "message": "Register success.", "success": true}
         */
        console.log("Resp", resp);
        if (resp.success && resp.data) {
          // Keep register info to navigate dashboard after review permission page
          this.setRegisteredUserInfo(resp.data);

          // Save local to remember login
          setItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.USER_NAME, params.name);
          setItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.PASSWORD, params.password);
          this.setSuccessRegister(resp.data);
        } else {
          this.setErrorRegister(
            resp.message || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrorRegister(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };
 
  @action checkExistingUserName = (userName) => {
    this.setLoading(true);
    this.setRespCheckExistingName(null);
    APICommonService.checkExistingUserName(userName)
      .then((resp) => {
        console.log("checkExistingUserName", resp);
        this.setRespCheckExistingName(resp);
      })
      .catch((err) => {
        this.setRespCheckExistingName(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action forgotPass = (email) => {
    this.setLoading(true);
    this.setErrorForgotPass(null);
    APICommonService.forgotPassword(email)
      .then((resp) => {
        console.log("Resp", resp);
        if (resp.success && resp.data) {
          this.setRespForgotPass(resp.data);
        } else {
          this.setErrorForgotPass(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrorForgotPass(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action getProfile = () => {
    this.setLoading(true);
    this.setErrorProfileInfo(null);

    APICommonService.getProfile(this.userToken)
      .then((resp) => {
        console.log("Resp-GetProfile", resp);
        if (resp.success && resp.data && resp.data.userInfor) {
        } else {
          this.setErrorProfileInfo(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrorProfileInfo(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action updateProfile = (params) => {
    this.setLoading(true);
    this.setErrorProfileInfo(null);

    APICommonService.updateProfile(this.userToken, params)
      .then((resp) => {
        console.log("Resp-UpdateProfile", resp);
        if (resp.success) {
          this.updateProfileInfo(resp.data);

          this.setProfileInfoSuccessUpdated(resp);
        } else {
          this.setErrorProfileInfo(
            resp.data
              ? resp.data.message || i18n.t(LOCALIZE_KEYS.internal_err_msg)
              : resp.message || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrorProfileInfo(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };
}

export { AuthStore };
