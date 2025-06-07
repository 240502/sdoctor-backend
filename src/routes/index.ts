import { Request, Response, Router } from 'express';
import statusRouter from './statusRouter';
import clinicRouter from './clinicRouter';
import commentRouter from './commentRouter';
import doctorRouter from './doctorRouter';
import majorRouter from './majorRouter';
import postRouter from './postRouter';
import roleRouter from './roleRouter';
import timeRouter from './timeRouter';
import userRouter from './userRouter';
import homeMenuRouter from './home_menuRouter';
import appointmentRouter from './appointmentRouter';
import scheduleDetailRouter from './doctorScheduleDetailRouter';
import categoryServicesRouter from './category_servicesRouter';
import postCategoryRouter from './post_category';
import uploadRouter from './upload';
import patientProfileRouter from './patient_profileRouter';
import appointmentStatusRouter from './appointment_statusRouter';
import notificationRouter from './notificationRouter';
import invoiceRouter from './invoicesRouter';
import serviceRouter from './serviceRouter';
import medicalPackageRouter from './medical_packageRouter';
import paymentRouter from './payment';
import paymentMethodRouter from './paymentMethodRouter';
import departmentRouter from './departmentRouter';
import degreesRouter from './degreesRouter';
import scheduleRouter from './schedulesRouter';
import mailerRouter from './mailerRouter';
import workExperiencesRouter from './workExperienceRouter';
import educationRouter from './educationRouter';
import doctorExpertisesRouter from './doctorExertisesRouter';
import clinicSpecialtyRouter from './clinic_specialtyRouter';
import medicalEquipmentRouter from './medical_equipmentRouter';
import workingHoursRouter from './working_hoursRouter';
import supportStaffRouter from './support_staffRouter';
import doctorServiceRouter from './doctor_serviceRouter';
import axios from 'axios';
import examinationResultRouter from './examination_resultRouter';
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
appRouter.use('/time', timeRouter);
appRouter.use('/user', userRouter);
appRouter.use('/home-menu', homeMenuRouter);
appRouter.use('/schedule-details', scheduleDetailRouter);
appRouter.use('/category-services', categoryServicesRouter);
appRouter.use('/post-category', postCategoryRouter);
appRouter.use('/', uploadRouter);
appRouter.use('/patient-profile', patientProfileRouter);
appRouter.use('/appointment-status', appointmentStatusRouter);
appRouter.use('/notification', notificationRouter);
appRouter.use('/invoice', invoiceRouter);
appRouter.use('/service', serviceRouter);
appRouter.use('/service-category', categoryServicesRouter);
appRouter.use('/medical-package', medicalPackageRouter);
appRouter.use('/payment', paymentRouter);
appRouter.use('/payment-method', paymentMethodRouter);
appRouter.use('/department', departmentRouter);
appRouter.use('/degrees', degreesRouter);
appRouter.use('/mailer', mailerRouter);
appRouter.use('/work-experiences', workExperiencesRouter);
appRouter.use('/education', educationRouter);
appRouter.use('/doctor-expertises', doctorExpertisesRouter);
appRouter.use('/clinic-specialty', clinicSpecialtyRouter);
appRouter.use('/medical-equipment', medicalEquipmentRouter);
appRouter.use('/working-hours', workingHoursRouter);
appRouter.use('/support-staff', supportStaffRouter);
appRouter.use('/doctor-service', doctorServiceRouter);
appRouter.use('/results', examinationResultRouter);

appRouter.get('/province', async (req, res) => {
    try {
        console.log('call province');

        const response = await axios.get(
            'https://vapi.vnappmob.com/api/v2/province',
            {
                headers: {
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                },
            },
        );
        res.json(response.data);
    } catch (error: any) {
        if (error.response?.status === 308) {
            const newUrl = error.response.headers.location;
            if (newUrl) {
                const retryResponse = await axios.get(newUrl, {
                    headers: {
                        Accept: 'application/json',
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                    },
                });
                return res.json(retryResponse.data);
            }
            return res
                .status(500)
                .json({ error: 'No Location header in 308 response' });
        }
        res.status(500).json({ error: 'Failed to fetch provinces' });
    }
});

// Proxy endpoint cho quận/huyện
appRouter.get('/province/district/:provinceId', async (req, res) => {
    try {
        const response = await axios.get(
            `https://vapi.vnappmob.com/api/v2/province/district/${req.params.provinceId}`,
            {
                headers: {
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                },
            },
        );
        res.json(response.data);
    } catch (error: any) {
        if (error.response?.status === 308) {
            const newUrl = error.response.headers.location;
            if (newUrl) {
                const retryResponse = await axios.get(newUrl, {
                    headers: {
                        Accept: 'application/json',
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                    },
                });
                return res.json(retryResponse.data);
            }
            return res
                .status(500)
                .json({ error: 'No Location header in 308 response' });
        }
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

// Proxy endpoint cho phường/xã
appRouter.get('/province/ward/:districtId', async (req, res) => {
    try {
        const response = await axios.get(
            `https://vapi.vnappmob.com/api/v2/province/ward/${req.params.districtId}`,
            {
                headers: {
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                },
            },
        );
        res.json(response.data);
    } catch (error: any) {
        if (error.response?.status === 308) {
            const newUrl = error.response.headers.location;
            if (newUrl) {
                const retryResponse = await axios.get(newUrl, {
                    headers: {
                        Accept: 'application/json',
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                    },
                });
                return res.json(retryResponse.data);
            }
            return res
                .status(500)
                .json({ error: 'No Location header in 308 response' });
        }
        res.status(500).json({ error: 'Failed to fetch wards' });
    }
});

export default appRouter;
