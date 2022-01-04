import 'module-alias/register';
import config from 'config';
import App from './app';
import HealthcheckRoute from '@/routes/healthcheck.route';

const port = config.get<number>('port');

const app = new App([new HealthcheckRoute()], port);

app.listen();
