import express from "express";
import File from "../models/file.model";

const router = express.Router();

router.get('/favorite', async (req, res) => {
const token = req.headers['authorization']; 
const userId = token && token.split(' ')[1];
if (!userId) return res.status(401).send('Unauthorized');
try {
    console.log('Fetching files for userId:', userId);
    // Retrieve all files from the database
    const files = await File.find({ userId });

    // Send the list of files back to the client
    res.send(files);
} catch (error) {
    console.error('Error retrieving files from the database:', error);
    res.status(500).send({
        message: 'Error retrieving files from the database',
        error: error.message
    });
}
});
export default router;