import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../service/APICommonService";
import Constants from "../utils/Constants";
import md5 from 'md5'
// import { removeKeyItemAsyncStorage, setItemAsyncStorage } from "../utils/Util";

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
    this.userInfo = info;
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

  @action reset = () => { };

  @action logout = () => {
    // OFF HomeScreen flag when success logged-out
    Constants.isHomeOnScreen = false;

    // Update Bearer toke
    APICommonService.updateBearerToken(null)

    // // Reset data
    // removeKeyItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.USER_NAME);
    // removeKeyItemAsyncStorage(Constants.ASYNC_STORAGE_KEY.PASSWORD);
    this.userToken = null;
    this.userInfo = null;
  };

  @action resetDataForgotPass = () => {
    this.setErrorForgotPass(null);
    this.setRespForgotPass(null);
  };

  @action login = (username, pass) => {
    let currentUsername = username;
    let currentPass = pass;
    this.setLoading(true);
    this.setErrorLogin(null);
    // var md5 = require('md5');
    APICommonService.login()
      .then((resp) => {
        console.log("Resp", resp);
        let listUser = resp;
        if (listUser) {
          for (let idxUser in listUser) {
            let convertedMd5 = md5(currentPass);
            if ((listUser[idxUser]?.customer_email == currentUsername) && (listUser[idxUser]?.customer_password == convertedMd5)) {
              console.log("Onssuccess")
              this.setLoginInfo(listUser[idxUser]);
              break;
            }
          }
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
        this.setRegisteredUserInfo(resp);
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
