import { observable, action, makeAutoObservable } from 'mobx';
import APICommonService from '../services/APICommonService';
import i18n from '../translations/i18n';
import LOCALIZE_KEYS from '../translations/LOCALIZE_KEYS';
import Constants from '../utils/Constants';

class FriendListStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable isLoading = false;
  @observable celebsData = null;
  @observable errCelebsData = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  @action getCelebsData = (refresh = false, type = Constants.USER_TYPE.CELEB) => {
    if(!refresh) {
      this.setLoading(true);
    }
    this.setErrCelebsData(null);

    APICommonService.getCelebsData(type)
      .then((resp) => {
        console.log("Resp-GetCelebs", resp);
        if(resp.success && resp.data) {
          this.setCelebsData(resp.data);
        } else {
          this.setCelebsData([]);
          this.setErrCelebsData(resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg))
        }
      })
      .catch((err) => {
        this.setCelebsData([]);
        this.setErrCelebsData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action
  setCelebsData =(data)=> {
    this.celebsData = data;
  }
  @action
  setErrCelebsData =(err)=> {
    this.errCelebsData = err;
  }
}

export {FriendListStore}