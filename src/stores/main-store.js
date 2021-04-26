import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../service/APICommonService";
import Constants from "../utils/Constants";
import { setItemAsyncStorage } from "../utils/Util";

class MainStore {
    constructor() {
        makeAutoObservable(this);
    }
    //----------- Observable ----------//
    @observable isHideBottomBar = true;
    //----------- Action -------------//
    @action setIsHideBottomBar = (isHideBottomBar) => {
        this.isHideBottomBar = isHideBottomBar;
    };
}
export {MainStore}