import { Router, Request, Response } from 'express';
import upload from '../middlewares/multer';
import { uploadImage } from '../controllers/uploadImageNewsController';

const uploadRouter = Router();

// // POST route để upload ảnh
// Route để tải lên một hình ảnh với tên trường 'file'
uploadRouter.post('/upload', upload.single('file'), uploadImage);
// Route để tải lên nhiều hình ảnh
// uploadRouter.post('/upload', upload.array('files', 10), uploadImages);
export default uploadRouter;
