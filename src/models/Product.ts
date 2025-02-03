import {Column, Entity, ObjectId, ObjectIdColumn} from "typeorm";

@Entity('products')
export  class Product{
    @ObjectIdColumn()
    id!: ObjectId;
    @Column('text')
    name!: string;
    @Column('number')
    price!: number;
}