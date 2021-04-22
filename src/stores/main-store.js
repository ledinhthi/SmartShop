import { action, makeAutoObservable, observable } from "mobx";
import APICommonService from "../services/APICommonService";
import i18n from "../translations/i18n";
import LOCALIZE_KEYS from "../translations/LOCALIZE_KEYS";
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