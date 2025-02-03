import PurchaseService from "./PurchaseService";
import AppRepositories from "../dao/AppRepositories";
import {Purchase} from "../models/Purchase";

export default class PurchaseServiceImpl implements PurchaseService{


    private appRepositories: AppRepositories;
    constructor(appRepositories: AppRepositories) {
        this.appRepositories = appRepositories;
    }
    completePurchase(): Promise<Purchase> {
        return  this.appRepositories.completePurchase();
    }

}