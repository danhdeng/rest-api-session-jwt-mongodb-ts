import 'module-alias/register';
import config from 'config';
import App from './app';
import HealthcheckRoute from '@/routes/healthcheck.route';
import UserRoute from './routes/user.route';
import sendEmail from '@/utils/mailer';

const port = config.get<number>('port');

const app = new App([new HealthcheckRoute(), new UserRoute()], port);

app.listen();
