import 'module-alias/register';
import config from 'config';
import App from './app';
import HealthcheckRoute from '@/routes/healthcheck.route';
import sendEmail from '@/utils/mailer';

sendEmail();

const port = config.get<number>('port');

const app = new App([new HealthcheckRoute()], port);

app.listen();
