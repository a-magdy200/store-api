import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm"
import {IsInt, IsNumber, IsPositive, Length} from "class-validator";
import {User} from "./User.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(2)
    title: string

    @Column()
    image: string

    @Column({type: 'float'})
    @IsNumber()
    @IsPositive()
    price: number

    @Column({type: "int"})
    @IsInt()
    @IsPositive()
    userId: number

    @ManyToOne(() => User, user=>user.products)
    user: User

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

}
