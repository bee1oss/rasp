import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {UserController, RaspisaniyaController,TimeController,DayController} from "./controllers/index.js";
import {handleValidationErrors,checkAuth} from "./utils/index.js";
//mongodb+srv://bega:1999@cluster0.yras7hz.mongodb.net/CRUD_DB?retryWrites=true&w=majority


const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';
const app = express();
mongoose
    .connect(url,{})
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

app.use(cors());
app.use(express.json());
/* API's FOR USER */
app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login);//login api(successful)
app.post('/auth/register',registerValidation, handleValidationErrors, UserController.register);//registration api(successful)
app.get('/auth/me', checkAuth, UserController.getMe);//(successful)
/* API's FOR Syllabus */
app.get('/syllabuses', RaspisaniyaController.getAll);//To see the full course schedule api(successful)
app.post('/create-syllabus', checkAuth, raspCreateValidation, handleValidationErrors,RaspisaniyaController.create);//To create a lesson program api(successful)
app.delete('/syllabus/delete/:id', checkAuth, RaspisaniyaController.remove);//To delete the course schedule(successful)
app.get('/syllabus/:id',RaspisaniyaController.getOne);//To get a course program by its id(successful)
app.patch('/syllabus/:id', checkAuth,raspCreateValidation,handleValidationErrors, RaspisaniyaController.update);//this for update syllabus(successful)
/* API's FOR TIME */
app.post('/create-time',checkAuth,TimeController.create);//(successful)
app.patch('/time/:id',checkAuth,TimeController.update);//(successful)
app.get('/time/:id',checkAuth,TimeController.getOne);//(successful)
app.delete('/time/delete/:id',checkAuth,TimeController.remove);//(successful)
app.get('/times',TimeController.getAll);//(successful)
/* API's FOR DAY */
app.post('/create-day',DayController.create);//(successful)
app.patch('/day/:id',DayController.update);//(successful)
app.get('/day/:id',DayController.getOne);//(successful)
app.get('/days',DayController.getAll);//(successful)
app.delete('/day/delete/:id',DayController.remove);//(successful)
app.listen(5555, ()=> console.log('Server up and running...'));