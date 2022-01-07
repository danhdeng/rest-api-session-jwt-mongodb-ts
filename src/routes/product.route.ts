import IRoute from '@/interface/route.interface';
import { Router } from 'express';
import validateResources from '@/middleware/validateResource';
import requireUser from '@/middleware/requireUser';
import {
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    getProductHandler,
} from '@/controller/product.controller';

import {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getProductSchema,
} from '@/schema/product.schema';
import validateResource from '@/middleware/validateResource';
class ProductRoute implements IRoute {
    public path = '/products';
    public router = Router();
    constructor() {
        this.initializeRoute();
    }
    private initializeRoute() {
        this.router.post(
            `${this.path}`,
            [requireUser, validateResource(createProductSchema)],
            createProductHandler
        );
        this.router.put(
            `${this.path}/:productId`,
            [requireUser, validateResource(updateProductSchema)],
            updateProductHandler
        );
        this.router.get(
            `${this.path}/:productId`,
            validateResource(getProductSchema),
            getProductHandler
        );

        this.router.delete(
            `${this.path}/:productId`,
            [requireUser, validateResource(deleteProductSchema)],
            deleteProductHandler
        );
    }
}

export default ProductRoute;
