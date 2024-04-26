import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET= "mysecretkey"


export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


export const comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, userPassword);
};


export const generateToken = (userId: string): string => {
    const secret = JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET in .env file');
    }
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};
