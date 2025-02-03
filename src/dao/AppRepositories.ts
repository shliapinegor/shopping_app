import {AppDataSource} from "./db";
import {CartItem} from "../models/CartItem";
import {Product} from "../models/Product";
import {Purchase} from "../models/Purchase";
import {ProductDto} from "../dto/ProductDto";

export default class AppRepositories {
    private cartRepository = AppDataSource.getRepository(CartItem);
    private productRepository = AppDataSource.getRepository(Product);
    private purchaseRepository = AppDataSource.getRepository(Purchase);

    async completePurchase(){
        const cartItems = await this.cartRepository.find();
        const productsList = await this.productRepository.find();
        if(cartItems.length === 0){
            throw new Error('There arent any items in the cart')
        }

        const totalSum = cartItems.reduce((accumulator, currentValue) =>
        accumulator + (currentValue.quantity * (productsList.find(e => e.id.toString() === currentValue.productId) )?.price!),
            0)

        const newPurchase = this.purchaseRepository.create({
            userId: await this.getUserId(),
            items: cartItems,
            totalPrice: totalSum,
            date: new Date().toUTCString()
        }
        )
        const result = await this.purchaseRepository.save(newPurchase);
        if(result){
            this.clearCart()
        }
        return  result




    }

    async getUserId(){
        const purchases = await this.purchaseRepository.find();
        return purchases.length + 1
    }

    async addNewProduct(product: ProductDto): Promise<Product>{
        const search = await this.productRepository.findOneBy(product)
        if(!search){
            const newProduct = this.productRepository.create(product)
            return await this.productRepository.save(newProduct);
        } else {
            return search
        }

    }
    async addProductToCart(product: ProductDto) : Promise<CartItem>{
        const currectProduct = await this.addNewProduct(product);
        const currentCart = await this.getAllItems()
        const find = currentCart.find(e => e.productId === currectProduct.id.toString())


        if(find){
            await this.cartRepository.update(find, {quantity: find.quantity + 1});
            return {...find, quantity: find.quantity+1}
        } else {
            const newItem =  this.cartRepository.create({productId: currectProduct.id.toString(), quantity: 1})
            return await this.cartRepository.save(newItem)
        }
    }


    async clearCart(): Promise<Boolean>{
        try {
            await this.cartRepository.delete({})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async getAllItems(): Promise<CartItem[]>{
        return await this.cartRepository.find()
    }

    async removeItem(id: string):Promise<Boolean>{
        return !!(await this.cartRepository.delete(id)).affected;
    }
}

export const appRepositories = new AppRepositories();