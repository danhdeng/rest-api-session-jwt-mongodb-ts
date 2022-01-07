import { Request, Response } from 'express';
import {
    CreateProductInput,
    UpdateProductInput,
    DeleteProductInput,
    GetProductInput,
} from '@/schema/product.schema';
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
} from '@/service/product.service';

export const createProductHandler = async (
    req: Request<{}, {}, CreateProductInput>,
    res: Response
) => {
    const userId = res.locals._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
};

export const updateProductHandler = async (
    req: Request<UpdateProductInput['params']>,
    res: Response
) => {
    const userId = res.locals._id;
    const productId = req.params.productId;
    const updateProductDetails = req.body;
    const product = await findProduct({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    if (!String(product.user !== userId)) {
        return res.sendStatus(403);
    }
    const updateProduct = await findAndUpdateProduct(
        { productId },
        updateProductDetails,
        { new: true }
    );

    return res.send(updateProduct);
};

export const getProductHandler = async (
    req: Request<GetProductInput['params']>,
    res: Response
) => {
    const productId = req.params.productId;
    const updateProductDetails = req.body;
    const product = await findProduct({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    return res.send(product);
};

export const deleteProductHandler = async (
    req: Request<DeleteProductInput['params']>,
    res: Response
) => {
    const userId = res.locals._id;
    const productId = req.params.productId;
    const updateProductDetails = req.body;
    const product = await findProduct({ productId });
    if (!product) {
        return res.sendStatus(404);
    }
    if (!String(product.user !== userId)) {
        return res.sendStatus(403);
    }
    await deleteProduct({ productId });

    return res.sendStatus(200);
};
