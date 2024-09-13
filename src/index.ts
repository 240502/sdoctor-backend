import app from './app';
import { config } from './config/config';

app.set('port', config.port);

app.listen(config.port, () => {
    console.log(`Server connected to http://localhost:${config.port}`);
});
