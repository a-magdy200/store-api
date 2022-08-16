import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm"
import {IsEmail, IsEnum, Length} from "class-validator";
import {Product} from "./Product.entity";
import {UserTypeEnum} from "../enums/userType.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(2)
    name: string

    @Column({unique: true})
    @IsEmail()
    email: string

    @Column({type: 'enum', default: UserTypeEnum.USER, enum: UserTypeEnum})
    @IsEnum(UserTypeEnum)
    type: string;

    @OneToMany(() => Product, product => product.user)
    products: Product[]

    @Column({select: false})
    password: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

}
