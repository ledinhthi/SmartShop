import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../service/APICommonService";
import Constants from "../utils/Constants";

class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Observable
    @observable listOrderProduct = [];
    @observable listChosenProduct = [];
    @observable isLoading = false;
    @observable listCity = [];
    @observable listWards = [];
    @observable listDistricts = [];
    @observable errorString = "";
    @action setListChosenProduct = (listChosenProduct) => {
        this.listChosenProduct = listChosenProduct;
    }
    @action setListOrderProduct = (listOrderProduct) => {
        this.listOrderProduct = listOrderProduct;
    }
    @action setIsLoading = (isLoading) => {
        this.isLoading = isLoading;
    }
    @action setListCity = (listCity) => {
        this.listCity = listCity;
    }
    @action setListWards = (listWards) => {
        this.listWards = listWards;
    }
    @action setListDistricts = (listDistrict) => {
        this.listDistricts = listDistrict;
    }
    @action setErrorString = (error) => {
        this.errorString = error;
    }
    @action getListCity = async () => {
        await APICommonService.getListCity()
            .then(listCity => {
                if (listCity) {
                    // console.log("[GetListCity] ListCity", listCity)
                    this.setListCity(listCity);
                }

            })
            .catch(error => {
                console.log("[GetListCity] Error", error)
                this.setErrorString(error);
            })
    }
    @action getListDistrict = async () => {
        await APICommonService.getListDistrict()
            .then(listDistrict => {
                if (listDistrict) {

                    this.setListDistricts(listDistrict)
                }

            })
            .catch(error => {
                console.log("[getListDistrict] Error", error)
                this.setErrorString(error);
            })
    }
    @action getListWards = async () => {
        await APICommonService.getListWards()
            .then(listWards => {
                if (listWards) {

                    this.setListWards(listWards)
                }
            })
            .catch(error => {
                console.log("[getListWards] Error", error)
                this.setErrorString(error);
            })
    }
    makeShipping = async (params) => {
        let shippinResult = APICommonService.makeShipping(params);
        return shippinResult;
    }
    makeOrder = async (params) => {
        let orderResult = APICommonService.makeOrder(params);
        return orderResult;
    }
    makeOrderDetail = async (params) => {
        let orderDetailResult = APICommonService.makeOrderDetail(params);
        return orderDetailResult;
    }
    calculateFee = async (params) => {
        console.log("params", params)
        let feeResult = APICommonService.calculateFee(params);
        return feeResult;
    }

    @action addProductToOrder = (product) => {
        let listOrder = [...this.listChosenProduct];
        if (listOrder) {
            let isExisted = false;
            listOrder.map(order => {
                if (order.product_name == product.product_name) {
                    isExisted = true;
                    return;
                }
            })
            if (!isExisted) {
                listOrder.push(product)
            }

        }
        else {
            listOrder.push(product)
        }
        console.log("Size of product", listOrder.length)
        this.setListChosenProduct(listOrder)
    }
}

export { OrderStore };