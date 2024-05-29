import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const UploadImage = async (url, tags, public_id) => {
    try {
        const res = await cloudinary.uploader.upload(url, { tags });

        return res;
    } catch (error) {
        console.error(error);
    }
};


// UploadImage(`/home/ivan/repos/inventory-app/public/images/Fool_Art.png`)
export {
    cloudinary
}
export default UploadImage;
