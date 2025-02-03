import PurchaseServiceImpl from "../services/PurchaseServiceImpl";
import {ProductDto} from "../dto/ProductDto";
import {CartItem} from "../models/CartItem";
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