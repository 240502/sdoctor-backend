import { container } from 'tsyringe';
import { InvoiceController } from '../controllers/invoices.controller';
import { Router } from 'express';
import path from 'path';
import { authenticate } from '../middlewares/authMiddleware';
const invoiceRouter = Router();
const invoiceController = container.resolve(InvoiceController);

invoiceRouter.post(
    '/create',
    invoiceController.createInvoice.bind(invoiceController),
);
invoiceRouter.put(
    '/update',
    invoiceController.updateInvoice.bind(invoiceController),
);
invoiceRouter.delete(
    '/delete/:id',
    invoiceController.deleteInvoice.bind(invoiceController),
);
invoiceRouter.get(
    '/get-recent',
    invoiceController.getRecentInvoice.bind(invoiceController),
);
invoiceRouter.post(
    '/get-total-revenue-by-date-in-now-week',
    invoiceController.getTotalRevenueByDateInNowWeek.bind(invoiceController),
);

invoiceRouter.post(
    '/view',
    invoiceController.viewInvoice.bind(invoiceController),
);
invoiceRouter.get('/download-invoice/:id', (req, res) => {
    const filePath = path.join(__dirname, `invoice-${req.params.id}.pdf`); // Thay thế với đường dẫn tới file PDF
    res.download(filePath, 'invoice.pdf', (err) => {
        if (err) {
            console.error('Lỗi khi tải file:', err);
        }
    });
});
invoiceRouter.put(
    '/update-status',
    authenticate,
    invoiceController.updateInvoiceStatus.bind(invoiceController),
);

invoiceRouter.get(
    '/get-by-appointment/:appointmentId',
    invoiceController.getInvoiceByAppointmentId.bind(invoiceController),
);
invoiceRouter.post(
    '/create-pdf',
    invoiceController.createInvoicePdf.bind(invoiceController),
);
export default invoiceRouter;
