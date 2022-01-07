import {
    getModelForClass,
    prop,
    Ref,
    modelOptions,
} from '@typegoose/typegoose';
// import { nanoid } from 'nanoid';
import { User } from '@/models/user.model';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Product {
    @prop({
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
    })
    productId: string;
    @prop({ ref: () => User })
    user: Ref<User>;
    @prop({ required: true })
    title: string;
    @prop({ required: true })
    description: string;
    @prop({ required: true })
    price: number;
    @prop({ required: true })
    image: string;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
