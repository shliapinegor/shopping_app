import {Column, Entity, ObjectId, ObjectIdColumn} from "typeorm";

@Entity('purchases')
export  class Purchase{
    @ObjectIdColumn()
    userId!: ObjectId;
    @Column()
    items!: number;
    @Column()
    totalPrice!: number;
    @Column()
    date!: Date;

}