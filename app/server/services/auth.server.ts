import { User } from "../models/userModel"

export const signup = async (email: string, password: string, username: string) => {
    if (!email || !password || !username) {
        return {
            status: 400,
            error: "All fields are required.",
        };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            status: 409,
            error: "User already exists.",
        };
    }

    const newUser = new User({ email, password, username });
    await newUser.save();

    return {
        status: 201,
        message: "User registered successfully!"
    };
};


export const signin = async (email: string, password: string) => {
    if (!email || !password) {
        return {
            status: 400,
            error: "All fields are required.",
        };
    }

    const user = await User.findOne({ email });
    const isPasswordCorrect = await user?.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return {
            status: 401,
            error: "invalid user.",
        };
    }
    return {
        status: 200,
        message: "User login successfully!",
        data: user
    };

}