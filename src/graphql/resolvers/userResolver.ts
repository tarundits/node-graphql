import { User } from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET_KEY = 'lifeisshortliveitlarge';

const generateToken = (user: any) => {
	const payload = {
	  userId: user._id,
	  email: user.email,
	};

	console.log(payload);
  
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

const userResolver = {

	Query: {
	    hello: () => "GraphQL is Awesome",
		welcome: (parent: any, args: any) => `Hello ${args.name}`,
		users: async () => {
			let users =  await User.find({}) 
			return users
		},
        user: async (parent: any, args: any) => await User.findById(args.id),
	},

	Mutation: {
		create: async (parent: any, args: any) => {
			const { first_name, last_name, age, email, password } = args;

			const existingUser = await User.findOne({ email });

			if (existingUser) {
				throw new Error("User with this email already exists.");
			}

			// Hash and encrypt the password before saving
			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				first_name,
				last_name,
				age,
				email,
				password: hashedPassword,
			});

			await newUser.save();

			const token = generateToken(newUser);
			return { token, user: newUser };
		},

		update: async (parent: any, args: any) => {
			const { id, first_name, last_name, age, email } = args;
			const result = await User.findByIdAndUpdate(id, { first_name, last_name, age, email }, { new: true });
			return result;
		},

		delete: async (parent: any, args: any) => {
			const { id } = args;
			const deletedUser = await User.deleteOne({_id: id});
			if (!deletedUser) {
				throw new Error(`User with ID ${id} not found`);
			}
			return deletedUser;
		},

		login: async (parent: any, args: any) => {
			const { email, password } = args;
			const user = await User.findOne({ email });
	  
			if (!user) {
			  throw new Error("User not found.");
			}
	  
			const isPasswordValid = user.matchPassword(password);
	  
			if (!isPasswordValid) {
			  throw new Error("Invalid password.");
			}
	  
			const token = generateToken(user);
			return { token, user };
		},
	},
};

export {
	userResolver
}