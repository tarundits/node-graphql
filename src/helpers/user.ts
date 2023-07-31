import jwt from 'jsonwebtoken';
import { User } from "../models/User";

const SECRET_KEY = 'lifeisshortliveitlarge';

const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY) as { userId: string };
	} catch (error) {
		throw new Error('Invalid token or authentication failed.');
	}
}

const getUser = async ({ req }: { req: any }) => {
	const token = req.headers.authorization?.split(' ')[1];

	if(!token) {
		return;
	}

	const { userId } = verifyToken(token);

	if(!userId) {
		return;
	}

	const user = await User.findById(userId);

	if(!user) {
		throw new Error('User not found.');
	}

	return user;
}

export {
	getUser
};