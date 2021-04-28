import { AuthStore } from './authen-store';
import { MainStore } from './main-store'
import { OrderStore } from './order-store'
import { ProductStore } from './product-store'
class AppModel {
  constructor() {
    this.AuthStore = new AuthStore();
    this.MainStore = new MainStore();
    this.OrderStore = new OrderStore();
    this.ProductStore = new ProductStore();
  }
}
const instance = new AppModel();
export { instance as appModel };

