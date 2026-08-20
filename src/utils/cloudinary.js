import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        console.log('Image uploaded to Cloudinary:', result.url);
        return result;
    }
    catch (error) {
        fs.unlinkSync(filePath);
        return { error: 'Failed to upload image to Cloudinary', details: error.message };
    }
}; 
export { uploadImage };