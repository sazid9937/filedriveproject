import express from 'express';
import User from '../models/users.model.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' });
    }

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Optionally, compare the hashed password using bcrypt
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // For simplicity, assuming the password is stored in plain text (not recommended)
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password.' });
        }

        // If email and password are correct, return success
        res.status(200).send({ message: 'Login successful!', userId: user._id });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

export default router;
