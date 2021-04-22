import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../services/APICommonService";

class SettingStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable isLoading = false;
  @observable respSetupNotify = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  @action updateReceiveChatNotify = () => {
    this.setLoading(true);
    this.setRespSetupNotify(null);

    APICommonService.submitUpdateChatNotify()
      .then((resp) => {
        console.log("Resp-submitUpdateChatNotify", resp);
        this.setRespSetupNotify(resp);
      })
      .catch((err) => {
        this.setRespSetupNotify(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action
  setRespSetupNotify = (resp) => {
    this.respSetupNotify = resp;
  };
}

export { SettingStore };
