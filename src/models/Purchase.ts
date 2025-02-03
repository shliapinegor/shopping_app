import {Column, Entity, ObjectId, ObjectIdColumn} from "typeorm";
import {CartItem} from "./CartItem";

@Entity('purchases')
export class Purchase{
    @ObjectIdColumn()
    purchaseId!: ObjectId;
    @Column('number')
    userId!: number;
    @Column('array')
    items!: CartItem[];
    @Column('number')
    totalPrice!: number;
    @Column('string')
    date!: string;
}