import {appModel} from './appModel';

export const useStore = () => {
  const {
    AuthStore,
    FriendListStore,
    SharingAccountStore,
    NotificationStore,
    ChatStore,
    MainStore,
    SettingStore,
    ProfileStore
  } = appModel;

  return {
    AuthStore,
    FriendListStore,
    SharingAccountStore,
    NotificationStore,
    ChatStore,
    MainStore,
    SettingStore,
    ProfileStore
  };
};
