import {Column, Entity, ObjectId, ObjectIdColumn} from "typeorm";


@Entity('cartItems')
export  class CartItem{
    @ObjectIdColumn()
    userId!: ObjectId;
    @Column()
    productId!: number;
    @Column()
    quantity!: number
}