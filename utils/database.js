import mongoose from 'mongoose';

let isConnected = false;

const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDB already connected');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI.toString(), {
			dbName: 'prompts',
		});

		isConnected = true;
		console.log('MongoDB is connected');
	} catch (error) {
		console.log('Error in MongoDB connection' + error);
	}
};

export default connectToDB;
