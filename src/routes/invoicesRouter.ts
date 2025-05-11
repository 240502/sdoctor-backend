import { container } from 'tsyringe';
import { InvoiceController } from '../controllers/invoices.controller';
import { Router } from 'express';
import path from 'path';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Invoices
 */

const invoiceRouter = Router();
const invoiceController = container.resolve(InvoiceController);

/**
 * @swagger
 * /invoice/create:
 *   post:
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               amount:
 *                 type: number
 *                 format: float
 *               dueDate:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid request body
 */
invoiceRouter.post(
    '/create',
    invoiceController.createInvoice.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/update:
 *   put:
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       400:
 *         description: Invalid request body
 */
invoiceRouter.put(
    '/update',
    invoiceController.updateInvoice.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/delete/{id}:
 *   delete:
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.delete(
    '/delete/:id',
    invoiceController.deleteInvoice.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/get-recent/{userId}:
 *   get:
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recent invoice retrieved successfully
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.get(
    '/get-recent/:userId',
    invoiceController.getRecentInvoice.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/get-total-revenue-by-date-in-now-week:
 *   post:
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Total revenue for the current week retrieved successfully
 */
invoiceRouter.post(
    '/get-total-revenue-by-date-in-now-week',
    invoiceController.getTotalRevenueByDateInNowWeek.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/view:
 *   post:
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice viewed successfully
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.post(
    '/view',
    invoiceController.viewInvoice.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/download-invoice/{id}:
 *   get:
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice PDF downloaded successfully
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.get('/download-invoice/:id', (req, res) => {
    const filePath = path.join(__dirname, `invoice-${req.params.id}.pdf`); // Thay thế với đường dẫn tới file PDF
    res.download(filePath, 'invoice.pdf', (err) => {
        if (err) {
            console.error('Lỗi khi tải file:', err);
        }
    });
});

/**
 * @swagger
 * /invoice/update-status:
 *   put:
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice status updated successfully
 *       400:
 *         description: Invalid request body
 */
invoiceRouter.put(
    '/update-status',
    authenticate,
    invoiceController.updateInvoiceStatus.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/get-by-appointment/{appointmentId}:
 *   get:
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully by appointment ID
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.get(
    '/get-by-appointment/:appointmentId',
    invoiceController.getInvoiceByAppointmentId.bind(invoiceController),
);

/**
 * @swagger
 * /invoice/create-pdf:
 *   post:
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice PDF created successfully
 *       400:
 *         description: Invalid request body
 */
invoiceRouter.post(
    '/create-pdf',
    invoiceController.createInvoicePdf.bind(invoiceController),
);

export default invoiceRouter;
