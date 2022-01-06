import { Router } from 'express';

import {
    createUserHandler,
    verifyUserHandler,
    forgotPasswordHandler,
    getCurrentUserHandler,
    resetPasswordHandler,
} from '@/controller/user.controller';

import requireUser from '@/middleware/requireUser';
import validateResources from '@/middleware/validateResource';
import {
    createUserSchema,
    verifyUserSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from '@/schema/user.schema';
import IRoute from '@/interface/route.interface';

class UserRoute implements IRoute {
    public path = '/users';
    public router = Router();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(
            `${this.path}`,
            validateResources(createUserSchema),
            createUserHandler
        );

        this.router.post(
            `${this.path}/verify/:id/:verificationCode`,
            validateResources(verifyUserSchema),
            verifyUserHandler
        );

        this.router.post(
            `${this.path}/forgotpassword`,
            validateResources(forgotPasswordSchema),
            forgotPasswordHandler
        );
        this.router.post(
            `${this.path}/resetpassword/:id/:resetPasswordCode`,
            validateResources(resetPasswordSchema),
            resetPasswordHandler
        );

        this.router.get(`${this.path}/me`, requireUser, getCurrentUserHandler);
    }
}
export default UserRoute;
