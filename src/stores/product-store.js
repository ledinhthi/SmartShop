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
    @observable listCatergory = [];
    @observable listImageSliderAds = null;
    @observable stringError = "";
    // Action
    @action setStrinError = (stringError) => {
        this.stringError = stringError;
    }
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
    @action setCatergories = (catergory) => {
        this.listCatergory = catergory
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
    @action getBrands = async () => {
        await APICommonService.getBrands()
            .then(brands => {
                console.log("brands", brands)
                this.setListBrand(brands)
            })
            .catch((error) => {
                console.log("Error", error)
                setStrinError(error)
            })
    }
    @action getCatergory = async () => {
        await APICommonService.getCategorys()
            .then(catergories => {
                console.log("catergories", catergories)
                this.setCatergories(catergories)
            })
            .catch((error) => {
                console.log("Error", error)
                setStrinError(error)
            })
    }
    @action getProductByBranId = (brandId) => {
        this.setIsLoading(true);
        APICommonService.getProductByBrandId(brandId)
            .then(listProduct => {
                if (listProduct && listProduct.length > 0) {
                    this.setListProduct(listProduct)
                }
            })
            .catch((error) => {
                console.log("Error", error)
                setStrinError(error)
            })
            .finally(() => {
                this.setIsLoading(false);
            })
    }
    @action getProductByCategoryId = (catergoryId) => {
        this.setIsLoading(true);
        APICommonService.getProductByCatergoryId(catergoryId)
            .then(listProduct => {
                console.log("listProduct", listProduct)
                if (listProduct && listProduct.length > 0) {
                    this.setListProduct(listProduct)
                }
            })
            .catch((error) => {
                console.log("Error", error)
                setStrinError(error)
            })
            .finally(() => {
                this.setIsLoading(false);
            })
    }
}

export { ProductStore };