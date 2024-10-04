import { Router } from 'express';
import statusRouter from './statusRouter';
import clinicRouter from './clinicRouter';
import commentRouter from './commentRouter';
import doctorRouter from './doctorRouter';
import majorRouter from './majorRouter';
import postRouter from './postRouter';
import roleRouter from './roleRouter';
import scheduleRouter from './scheduleRouter';
import serviceRouter from './servicesRouter';
import timeRouter from './timeRouter';
import userRouter from './userRouter';
import homeDirectoryRouter from './home_directoryRouter';
import homeMenuRouter from './home_menuRouter';
import appointmentRouter from './appointmentRouter';
let appRouter = Router();
appRouter.use('/status', statusRouter);
appRouter.use('/appointment', appointmentRouter);
appRouter.use('/clinic', clinicRouter);
appRouter.use('/comment', commentRouter);
appRouter.use('/doctor', doctorRouter);
appRouter.use('/major', majorRouter);
appRouter.use('/post', postRouter);
appRouter.use('/role', roleRouter);
appRouter.use('/schedule', scheduleRouter);
appRouter.use('/service', serviceRouter);
appRouter.use('/time', timeRouter);
appRouter.use('/user', userRouter);
appRouter.use('/home-directory', homeDirectoryRouter);
appRouter.use('/home-menu', homeMenuRouter);

export default appRouter;
