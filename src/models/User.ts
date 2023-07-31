import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import moment from 'moment';

interface UserDocument extends Document {
	_id: string;
	first_name: string;
    last_name: string;
	email: string;
    age: number;
	password?: string;
    created?: number;
	matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
	_id: {
		type: String,
		default: () => nanoid(), 
	},
	first_name: {
		type: String,
		trim: true,
		required: true,
	},
	last_name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true,
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
	},
	created: {
		type: Number, 
		default: () => moment().unix(),
	},
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password || '');
};

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export {
	User
}