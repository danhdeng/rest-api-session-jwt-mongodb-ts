import mongoose from 'mongoose';
import config from 'config';
import logger from '@/utils/logger';

async function connectDB() {
    const mongoDbUri = config.get<string>('mongodbUri');
    try {
        await mongoose.connect(mongoDbUri);
        logger.info('connected to MongoDB');
    } catch (error: any) {
        logger.error(error);
        logger.error('Cannot connect to MongoDB');
        process.exit(1);
    }
}

export default connectDB;
