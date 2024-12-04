import express from 'express';
import User from '../models/users.model.js'; // Assuming you have a User model
// import bcrypt from 'bcrypt'; // For hashing passwords, if you plan to use it

const router = express.Router();

// Ensure you have the middleware to parse JSON bodies
router.use(express.json());

router.post('/', async (req, res) => {
    const { email, password } = req.body; // Fetch email and password from request body

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' });
    }

    try {
        // Optionally, hash the password before saving to the database
        // const hashedPassword = await bcrypt.hash(password, 10);
        console.log('-----------------', email, password)
        // Create a new user
        const newUser = new User({
            email,
            password, // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).send({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({
            message: 'Error creating user',
            error: error.message,
        });
    }
});

export default router;
