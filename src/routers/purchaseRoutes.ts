import {Router} from "express";
import {appRepositories} from "../dao/AppRepositories";
import PurchaseServiceImpl from "../services/PurchaseServiceImpl";
import PurchaseController from "../controllers/PurchaseController";
import expressAsyncHandler from "express-async-handler";


const purchaseRoutes = Router()

const purchaseService = new PurchaseServiceImpl(appRepositories);
const purchaseController = new PurchaseController(purchaseService);

purchaseRoutes.post('',  expressAsyncHandler(async(req, res) => {
     const result = await purchaseController.createPurchase()
    res.status(200).json(result)
}))





export default purchaseRoutes