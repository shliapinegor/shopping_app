import {ProductDto} from "../dto/ProductDto";
import {CartItem} from "../models/CartItem";

export default interface CartService{
    createProduct(newProductDto: ProductDto): Promise<CartItem>;
    deleteProduct(id: string): Promise<Boolean>;
    getAllProducts(): Promise<CartItem[]>;
    clearCart(): Promise<Boolean>;
}