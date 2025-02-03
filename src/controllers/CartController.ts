import CartService from "../services/CartService";
import {ProductDto} from "../dto/ProductDto";
import {CartItem} from "../models/CartItem";


export default class CartController {
    private cartService: CartService;

    constructor(cartService: CartService) {
        this.cartService = cartService;
    }


    async createProduct(newProductDto: ProductDto): Promise<CartItem> {
        return await this.cartService.createProduct(newProductDto)
    }

    async getAllProducts(): Promise<CartItem[]> {
        return await this.cartService.getAllProducts()
    }

    async clearCart(): Promise<Boolean> {
        return await this.cartService.clearCart();
    }

    async deleteProduct(id: string): Promise<Boolean> {
        return await this.cartService.deleteProduct(id);
    }
}