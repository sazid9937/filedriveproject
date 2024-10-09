import express from 'express';
import File from "../models/file.model.js";

const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
        let fileId = req.params.id;

        console.log('-----------------',fileId);
        const file = await File.findOneAndUpdate({ _id: fileId }, { $set: { isTrash: req.body.isTrash } } ,{  trashedAt: new Date() }, { new: true });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json({ message: 'File successfully trashed', file });
    } catch (error) {
        res.status(500).json({ message: 'Error updating file', error });
    }
});

export default router;
