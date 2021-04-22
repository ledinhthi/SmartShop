import { observable, action, makeAutoObservable } from "mobx";
import APICommonService from "../services/APICommonService";
import i18n from "../translations/i18n";
import LOCALIZE_KEYS from "../translations/LOCALIZE_KEYS";

class NotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable isLoading = false;
  @observable notificationsData = null;
  @observable errNotificationData = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  @action getNotifications = (userId, token, refresh = false) => {
    if (!refresh) {
      this.setLoading(true);
    }
    this.setErrNotificationData(null);

    APICommonService.getNotifications(userId, token)
      .then((resp) => {
        console.log("Resp-getNotifications", resp);
        if (resp.success && resp.data) {
          this.setNotificationData(resp.data);
        } else {
          this.setNotificationData([]);
          this.setErrNotificationData(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setNotificationData([]);
        this.setErrNotificationData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action markAsReadNotification = (userId, token, notificationId) => {
    this.setLoading(true);
    this.setErrNotificationData(null);

    APICommonService.markAsReadNotification(userId, token, notificationId)
      .then((resp) => {
        console.log("Resp-markAsReadNotification", resp);
        if (resp.success) {
          let notis = this.notificationsData.filter(
            (item) => item.id !== notificationId
          );
          this.setNotificationData(notis);
        }
      })
      .catch((err) => {
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action
  setNotificationData = (data) => {
    this.notificationsData = data;
  };
  @action
  setErrNotificationData = (err) => {
    this.errNotificationData = err;
  };
}

export { NotificationStore };
