import { cloudinary } from '../configs/cloudinary.mjs';

class Cloudinary {
    constructor() {}

    static async upload(url, tags) {
        try {
            const res = await cloudinary.uploader.upload(url, { tags });

            return res;
        } catch (error) {
            console.error(error);
        }
    }

    static async update(url, public_id, invalidate = true) {
        try {
            const res = await cloudinary.uploader.upload(url, {
                public_id,
                invalidate,
            });

            return res;
        } catch (error) {
            console.error(error);
        }
    }

    static async destroy(public_id, invalidate = true) {
        try {
            const res = await cloudinary.uploader.destroy(public_id, {
                invalidate,
            });

            return res;
        } catch (error) {
            console.error(error);
        }
    }
}

export default Cloudinary;
