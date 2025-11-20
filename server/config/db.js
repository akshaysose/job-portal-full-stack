import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'))

    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
        console.error('Error: MONGODB_URI is not defined in environment variables')
        console.error('Please create a .env file in the server directory with: MONGODB_URI=mongodb://localhost:27017 or mongodb+srv://...')
        process.exit(1)
    }

    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
        console.error('Error: MONGODB_URI must start with "mongodb://" or "mongodb+srv://"')
        console.error('Current value:', mongoUri ? 'Set but invalid format' : 'Not set')
        process.exit(1)
    }

    try {
        // If connection string already includes database name, use it as-is
        // Otherwise, append /job-portal
        const connectionString = mongoUri.includes('/job-portal') || mongoUri.includes('?') 
            ? mongoUri 
            : `${mongoUri}/job-portal`
        await mongoose.connect(connectionString)
    } catch (error) {
        console.error('Database connection error:', error.message)
        process.exit(1)
    }

}

export default connectDB