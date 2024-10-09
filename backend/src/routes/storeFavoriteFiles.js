import express from 'express';
import File from "../models/file.model.js";

const router = express.Router();

router.put('/:id/favorite', async (req, res) => {
    try {
        let fileId = req.params.id;

        // if (fileId.startsWith('user_')) {
        //     fileId = fileId.slice(5);
        // }

        console.log('-----------------',fileId);
        // Assuming 'userId' is a field in your schema that stores this custom ID
        const file = await File.findOneAndUpdate({ _id: fileId }, { $set: { isFavorite: req.body.isFavorite } }, { new: true });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json({ message: 'File marked as favorite', file });
    } catch (error) {
        res.status(500).json({ message: 'Error updating file', error });
    }
});

export default router;
