import { Router } from 'express';
import {
    createSessionHandler,
    refreshSessionHandler,
} from '@/controller/auth.controller';

import validateResource from '@/middleware/validateResource';

import { CreateSessionSchema } from '@/schema/auth.schema';
import IRoute from '@/interface/route.interface';
class AuthRoute implements IRoute {
    public path = '/sessions';
    public router = Router();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(
            `${this.path}`,
            validateResource(CreateSessionSchema),
            createSessionHandler
        );
        this.router.post(`${this.path}/refresh`, refreshSessionHandler);
    }
}

export default AuthRoute;
