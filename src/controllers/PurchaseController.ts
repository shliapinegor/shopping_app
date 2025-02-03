import PurchaseServiceImpl from "../services/PurchaseServiceImpl";
import {Purchase} from "../models/Purchase";

export default class PurchaseController{
    private purchaseService: PurchaseServiceImpl;


    constructor(purchaseService: PurchaseServiceImpl) {
        this.purchaseService = purchaseService;
    }

    async createPurchase(): Promise<Purchase> {
        return await this.purchaseService.completePurchase()
    }
}