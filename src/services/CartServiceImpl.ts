import CartService from "./CartService";
import {Product} from "../models/Product";
import AppRepositories, {appRepositories} from "../dao/AppRepositories";
import {ProductDto} from "../dto/ProductDto";
import {CartItem} from "../models/CartItem";

export default class CartServiceImpl implements CartService{
    private appRepositories: AppRepositories;
    constructor(appRepositories: AppRepositories) {
        this.appRepositories = appRepositories;
    }

    clearCart(): Promise<Boolean> {
        return this.appRepositories.clearCart();
    }

    createProduct(newProductDto: ProductDto): Promise<CartItem> {
        return this.appRepositories.addProductToCart(newProductDto)
    }

    deleteProduct(id: string): Promise<Boolean> {
        return this.appRepositories.removeItem(id);
    }

    getAllProducts(): Promise<CartItem[]> {
        return this.appRepositories.getAllItems();
    }


}