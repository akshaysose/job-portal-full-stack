import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {

    const cloudName = process.env.CLOUDINARY_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_SECRET_KEY

    if (!cloudName || !apiKey || !apiSecret) {
        console.warn('Warning: Cloudinary credentials not set. File uploads may not work.')
        console.warn('Set CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_SECRET_KEY in your .env file')
        return
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    })

    console.log('Cloudinary configured successfully')

}

export default connectCloudinary