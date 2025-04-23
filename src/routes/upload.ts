import { Router, Request, Response } from 'express';
import upload from '../middlewares/multer';
import { uploadImage } from '../controllers/upload_image_news.controller';
import { cloudinary } from '../config/cloudinaryConfig';

const uploadRouter = Router();

// // POST route để upload ảnh
// Route để tải lên một hình ảnh với tên trường 'file'
uploadRouter.post('/upload', upload.single('file'), uploadImage);
// Route để tải lên nhiều hình ảnh
// uploadRouter.post('/upload', upload.array('files', 10), uploadImages);

uploadRouter.post(
    '/upload-image',
    upload.single('file'),
    async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        try {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error: any, result: any) => {
                    if (error) {
                        return res.status(500).send('Upload failed');
                    }
                    res.json({ url: result.secure_url });
                },
            );
            stream.end(req.file.buffer);
        } catch (error) {
            res.status(500).send('Error uploading image');
        }
    },
);

export default uploadRouter;
