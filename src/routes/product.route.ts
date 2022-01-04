import IRoute from '@/interface/route.interface';
import { Router } from 'express';

class ProductRoute implements IRoute {
    public path = '/product';
    public router = Router();
}

export default ProductRoute;
