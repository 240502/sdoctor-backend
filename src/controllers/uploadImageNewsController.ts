// src/controllers/uploadController.ts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { cloudinary, UploadApiResponse } from '../config/cloudinaryConfig';

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file as Express.Multer.File;
    console.log(file.buffer);
    console.log(file);
    try {
        const result: UploadApiResponse = await new Promise(
            (resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'ckeditor_uploads' },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary Upload Error:', error);
                            reject(error);
                        } else if (result) {
                            console.log(
                                `Successfully uploaded: ${result.secure_url}`,
                            );

                            resolve(result);
                        } else {
                            reject('No result from Cloudinary');
                        }
                    },
                );

                stream.end(file.buffer);
            },
        );

        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        res.status(500);
        throw new Error('Cloudinary upload failed');
    }
});

// export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
//     const { publicId } = req.body;
//     if (!publicId) {
//         res.status(404);
//     }
//     try {
//         const result = await cloudinary.uploader.destroy(publicId);

//         if (result.result !== 'ok') {
//             throw new Error('Failed to delete image');
//         }

//         res.status(200).json({ message: 'Image deleted successfully' });
//     } catch (error) {
//         console.error('Cloudinary Delete Error:', error);
//         res.status(500);
//         throw new Error('Cloudinary delete failed');
//     }
// });
