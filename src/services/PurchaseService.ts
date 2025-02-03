import {Purchase} from "../models/Purchase";

export default interface PurchaseService{
    completePurchase(): Promise<Purchase>;
}