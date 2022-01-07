import 'module-alias/register';
import config from 'config';
import App from './app';
// import HealthcheckRoute from '@/routes/healthcheck.route';
// import UserRoute from './routes/user.route';
// import AuthRoute from './routes/auth.route';
import {
    HealthcheckRoute,
    UserRoute,
    AuthRoute,
    ProductRoute,
} from '@/routes/index';
import sendEmail from '@/utils/mailer';

const port = config.get<number>('port');

const app = new App(
    [
        new HealthcheckRoute(),
        new UserRoute(),
        new AuthRoute(),
        new ProductRoute(),
    ],
    port
);

app.listen();
