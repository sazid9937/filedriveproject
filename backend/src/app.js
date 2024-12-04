import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileRoutes from './routes/fileRoutes.js';
import getFilesRoute from './routes/getFilesRoute.js'
import storeFavoriteFile from './routes/storeFavoriteFiles.js'
import trashFiles from './routes/trashRoute.js'
import signup from './routes/signup.js'
import login from './routes/login.js'

const app = express();



// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())

// Use routes
app.use('/api/files', fileRoutes);
app.use('/api/getfiles', getFilesRoute)
app.use('/api/setfiles', storeFavoriteFile)
app.use('/api/delete', trashFiles)
app.use('/api/signup',signup)
app.use('/api/login',login)



export default app  