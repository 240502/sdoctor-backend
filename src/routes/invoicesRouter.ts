import { container } from 'tsyringe';
import { InvoiceController } from '../controllers/invoicesController';
import { Router } from 'express';

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

export default invoiceRouter;
