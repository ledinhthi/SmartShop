import { AuthStore } from './authen-store';
import { FriendListStore } from './friend-list-store';
import { SettingStore } from './setting-store';
import { NotificationStore } from './notification-store';
import { SharingAccountStore } from './sharing-account-store';
import { ChatStore } from './chat-store';
import { MainStore } from './main-store'
import { ProfileStore } from './profile-store';

class AppModel {
  constructor() {
    this.AuthStore = new AuthStore();
    this.FriendListStore = new FriendListStore();
    this.SharingAccountStore = new SharingAccountStore();
    this.NotificationStore = new NotificationStore();
    this.ChatStore = new ChatStore();
    this.MainStore = new MainStore();
    this.SettingStore = new SettingStore();
    this.ProfileStore = new ProfileStore();
  }
}
const instance = new AppModel();
export { instance as appModel };

