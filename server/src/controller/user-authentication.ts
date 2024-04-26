import express from 'express';
import { getUserByEmail, createUser } from '../models/user';
import { hashPassword, generateToken, comparePassword } from '../middleware';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).send('Missing required fields');
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return res.status(200).json({
            token: generateToken(user._id.toString()),
            username: user.username  
        });;

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
            
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = generateToken(user._id.toString());
        
        return res.status(200).json({ token, username: user.username });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
