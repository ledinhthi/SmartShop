import { AuthStore } from './authen-store';
import { MainStore } from './main-store'

class AppModel {
  constructor() {
    this.AuthStore = new AuthStore();
    this.MainStore = new MainStore();
  }
}
const instance = new AppModel();
export { instance as appModel };

