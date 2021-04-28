import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../service/APICommonService";
import Constants from "../utils/Constants";

class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }
    // Observable
    @observable listProduct = null;
    @observable isLoading = false;
    @observable listBrand = null;
    @observable listImageSliderAds = null;
    // Action
    @action setIsLoading = (isLoading) => {
        this.isLoading = isLoading;
    }
    @action setListProduct = (listProduct) => {
        this.listProduct = listProduct;
    }
    @action setListBrand = (listBrand) => {
        this.listBrand = listBrand;
    }
    @action setListImageSliderAds = (listSliderAds) => {
        this.listImageSliderAds = listSliderAds;
    }
    @action getListProduct = async () => {
        this.setIsLoading(true);
        await APICommonService.getListProduct()
            .then(listProduct => {
                if (listProduct) {
                    this.setListProduct(listProduct);
                }
            })
            .catch(error => {
                console.log("Error", error)
            })
            .finally(() => {
                this.setIsLoading(false);
            })
    }
    @action getListSliderAds = async () => {
        await APICommonService.getListSliderAds()
            .then(listSlider => {
                if (listSlider) {
                    this.setListImageSliderAds(listSlider);
                }
                console.log("ListSlider", listSlider)
            })
            .catch(error => {
                console.log("Error", error)
            })
            .finally(() => {

            })
    }
}

export { ProductStore };