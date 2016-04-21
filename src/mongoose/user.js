import mongoose from 'mongoose';

export default mongoose.model('user', mongoose.Schema({
	id: String,
	firstName: String,
	lastName: String,
	title: String,
	email: String
}));
