import mongoose from 'mongoose';
import config from 'config';
import log from '@/utils/logger';

async function connectDB() {
    const mongoDbUri = config.get<string>('mongodbUri');
    try {
        await mongoose.connect(mongoDbUri);
        log.info('connected to MongoDB');
    } catch (error: any) {
        log.error(error);
        log.error('Cannot connect to MongoDB');
        process.exit(1);
    }
}

export default connectDB;
