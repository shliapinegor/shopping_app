import 'reflect-metadata'
import {DataSource} from "typeorm";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import {Purchase} from "../models/Purchase";
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@shliapinstudy.s26kb.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`,
    entities: [Product, CartItem, Purchase],
    synchronize: true,
    useUnifiedTopology: true
});

export async function initDB(){
    try {
        await AppDataSource.initialize();
        console.log('Done')
    }
    catch (e){
        console.log(e)
    }
}