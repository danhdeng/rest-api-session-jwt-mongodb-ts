import IRoute from '@/interface/route.interface';
import { Router, Request, Response } from 'express';

class HealthcheckRoute implements IRoute {
    public path = '/healthcheck';
    public router = Router();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get(`${this.path}`, (req: Request, res: Response) => {
            return res.sendStatus(200);
        });
    }
}

export default HealthcheckRoute;
