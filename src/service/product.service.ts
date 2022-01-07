import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from 'mongoose';

import ProductModel, { Product } from '@/models/product.model';

export const createProduct = async (input: Partial<Product>) => {
    return await ProductModel.create(input);
};

export const findProduct = async (
    query: FilterQuery<Product>,
    options: QueryOptions = { lean: true }
) => {
    return await ProductModel.findOne(query, {}, options);
};

export const findAndUpdateProduct = async (
    query: FilterQuery<Product>,
    update: UpdateQuery<Product>,
    options: QueryOptions
) => {
    return await ProductModel.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<Product>) => {
    return await ProductModel.deleteOne(query);
};
