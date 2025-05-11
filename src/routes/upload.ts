import { Router, Request, Response } from 'express';
import upload from '../middlewares/multer';
import { uploadImage } from '../controllers/upload_image_news.controller';
import { cloudinary } from '../config/cloudinaryConfig';

/**
 * @swagger
 * tags:
 *   name: Upload
 */

const uploadRouter = Router();

/**
 * @swagger
 * /upload/upload-image:
 *   post:
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Successfully uploaded image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the uploaded image
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Error during image upload
 */
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
