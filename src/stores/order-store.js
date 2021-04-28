import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../service/APICommonService";
import Constants from "../utils/Constants";

class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }
    // Observable
    @observable listOrderProduct = null;
    @observable isLoading = false;
    @action setListOrderProduct = (listOrderProduct) => {
        this.listOrderProduct = listOrderProduct;
    }
    @action setIsLoading = (isLoading) => {
        this.isLoading = isLoading;
    }
}

export { OrderStore };