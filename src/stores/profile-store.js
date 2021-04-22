import { observable, action, makeAutoObservable } from 'mobx';
import APICommonService from '../services/APICommonService';
import i18n from '../translations/i18n';
import LOCALIZE_KEYS from '../translations/LOCALIZE_KEYS';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable isLoading = false;
  @observable profileType = false;
  @observable profileInfo = false;
  @observable errUpdateProfile = null;
  @observable respReportUser = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  @action setRespReportUser = (resp) => {
    this.respReportUser = resp;
  };

  @action getProfile = () => {
    this.setLoading(true);
    this.setErrProfileData(null);

    APICommonService.getCelebsData()
      .then((resp) => {
        console.log("Resp-GetProfile", resp);
        if(resp.success && resp.data) {
        //   this.setCelebsData(resp.data);
        } else {
          this.setErrProfileData(resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg))
        }
      })
      .catch((err) => {        
        this.setErrProfileData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action reportUser = (params) => {
    this.setLoading(true);
    this.setRespReportUser(null);

    APICommonService.reportUserChat(params)
      .then((resp) => {
        console.log('reportUserChat', resp);
        this.setRespReportUser(resp);
      })
      .catch((err) => {        
        this.setRespReportUser(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action
  setProfileType =(type)=> {
    this.profileType = type;
  }
  @action
  setProfileInfo =(info)=> {
    this.profileInfo = info;
  }

  @action
  setErrProfileData =(err)=> {
    this.errUpdateProfile = err;
  }
}

export {ProfileStore}