import {Router} from "express";
import expressAsyncHandler from "express-async-handler";
import {appRepositories} from "../dao/AppRepositories";
import CartServiceImpl from "../services/CartServiceImpl";
import CartController from "../controllers/CartController";
import {ProductDto} from "../dto/ProductDto";
import {CartItem} from "../models/CartItem";
import {body, param, validationResult} from "express-validator";
import validationMiddleware from "../middleware/validationMiddleware";


const cartRouter = Router();


const cartService = new CartServiceImpl(appRepositories);
const cartController = new CartController(cartService);

//get all
cartRouter.get('', expressAsyncHandler(async(req, res) => {
    const products: CartItem[] = await cartController.getAllProducts()
    res.status(200).json(products)
}))
//add product
cartRouter.post('',
    body('name').isString().notEmpty(),
    body('price').isInt({min: 1}),
    validationMiddleware
    ,expressAsyncHandler(async(req, res) => {
        const newProductDto = req.body as ProductDto;
        const newProduct: CartItem = await cartController.createProduct(newProductDto);
        res.status(200).json(newProduct)
}))
//clear cart
cartRouter.delete('', expressAsyncHandler(async(req, res) => {
    const result: Boolean = await cartController.clearCart();
    res.status(200).json(result)
}))
//delete one item from cart
cartRouter.delete('/:id',
    param('id').isString().notEmpty().isLength({min: 10}) , validationMiddleware,
    expressAsyncHandler(async(req, res) => {
    const id = req.params!.id as string
    const result: Boolean = await cartController.deleteProduct(id);
    res.status(200).json(result)
}))

export default cartRouter