import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentController } from '../controllers/appointment.controller';
import { authenticate } from '../middlewares/authMiddleware';
const appointmentRouter = Router();
const appointmentController = container.resolve(AppointmentController);

/**
 * @swagger
 * tags:
 *   name: Appointment
 */

/**
 * @swagger
 * /appointment/get-by-id/{id}:
 *   get:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin lịch hẹn
 */
appointmentRouter.get(
    '/get-by-id/:id',
    appointmentController.getAppointmentById.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-by-type:
 *   post:
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn
 */
appointmentRouter.post(
    '/get-by-type',
    appointmentController.getAppointmentByType.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-total-patient-in-day/{doctorId}:
 *   get:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Số lượng bệnh nhân
 */
appointmentRouter.get(
    '/get-total-patient-in-day/:doctorId',
    appointmentController.getTotalPatientInDay.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-total-appointments-completed/{doctorId}:
 *   get:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Số lượng lịch hẹn đã hoàn thành
 */
appointmentRouter.get(
    '/get-total-appointments-completed/:doctorId',
    appointmentController.getTotalAppointmentsCompleted.bind(
        appointmentController,
    ),
);

/**
 * @swagger
 * /appointment/create:
 *   post:
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lịch hẹn được tạo thành công
 */
appointmentRouter.post(
    '/create',
    appointmentController.orderAppointment.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/update-appointment-status:
 *   put:
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Trạng thái lịch hẹn được cập nhật
 */
appointmentRouter.put(
    '/update-appointment-status',
    appointmentController.updateAppointmentStatus.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-appointment-at-invoice:
 *   post:
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Trả về thông tin lịch hẹn
 */
appointmentRouter.post(
    '/get-appointment-at-invoice',
    appointmentController.getAppointmentAtInvoice.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-appointment-by-uuid:
 *   get:
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Trả về lịch hẹn
 */
appointmentRouter.get(
    '/get-appointment-by-uuid',
    appointmentController.getAppointmentByUuid.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-appointment-with-options:
 *   get:
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn với tuỳ chọn
 */
appointmentRouter.get(
    '/get-appointment-with-options',
    appointmentController.getAppointmentWithOptions.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-waitting-patients-count/{doctorId}:
 *   get:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Số lượng bệnh nhân đang chờ
 */
appointmentRouter.get(
    '/get-waitting-patients-count/:doctorId',
    appointmentController.getWaitingPatientsCount.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/get-appointments-in-day/{doctorId}:
 *   get:
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn trong ngày
 */
appointmentRouter.get(
    '/get-appointments-in-day/:doctorId',
    appointmentController.getAppointmentsInDay.bind(appointmentController),
);

/**
 * @swagger
 * /appointment/statistics-appointments-by-day:
 *   get:
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Kết quả thống kê lịch hẹn
 */
appointmentRouter.get(
    '/statistics-appointments-by-day',
    appointmentController.statisticsAppointmentsByDay.bind(
        appointmentController,
    ),
);

/**
 * @swagger
 * /appointment/get-recent-appointments:
 *   get:
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn gần đây
 */
appointmentRouter.get(
    '/get-recent-appointments',
    appointmentController.getRecentAppointments.bind(appointmentController),
);

export default appointmentRouter;
