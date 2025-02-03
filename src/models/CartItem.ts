import {Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, OneToOne} from "typeorm";
import {Product} from "./Product";


@Entity('cartItems')
export  class CartItem {
    @ObjectIdColumn()
    itemId!: ObjectId;
    @Column('string')
    productId!: string;
    @Column('number')
    userId!: number;
    @Column('number')
    quantity!: number
    @OneToOne(() => Product, (product) => product.id)
    product!: Product;
}