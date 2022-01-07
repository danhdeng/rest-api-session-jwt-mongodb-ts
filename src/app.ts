import express, { Application } from 'express';
import connectDB from '@/utils/connect';
import IRoute from '@/interface/route.interface';
import log from '@/utils/logger';
import deserializeUser from '@/middleware/deserializeUser';

class App {
    public express: Application;
    public port: number;

    constructor(routes: IRoute[], port: number) {
        this.express = express();
        this.port = port;
        this.initializeMiddleware();
        this.intializeRoutes(routes);
    }
    private initializeMiddleware() {
        this.express.use(express.json());
        this.express.use(deserializeUser);
    }
    private intializeRoutes(routes: IRoute[]) {
        routes.forEach((route: IRoute) => {
            this.express.use('/api', route.router);
        });
    }

    public listen = (): void => {
        this.express.listen(this.port, async () => {
            await connectDB();
            log.info(`application is running at http://localhost:${this.port}`);
        });
    };
}

export default App;
