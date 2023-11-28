import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {UserController, RaspisaniyaController,TimeController,DayController,KursController,SpecialityController} from "./controllers/index.js";
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

/* API's FOR Schedules */
app.get('/schedules', RaspisaniyaController.getAll);//To see the full course schedule api(successful)
app.post('/create-schedule', checkAuth, raspCreateValidation, handleValidationErrors,RaspisaniyaController.create);//To create a lesson program api(successful)
app.delete('/delete-schedule/:id', checkAuth, RaspisaniyaController.remove);//To delete the course schedule(successful)
app.get('/schedule/:id',RaspisaniyaController.getOne);//To get a course program by its id(successful)
app.patch('/update-schedule/:id', RaspisaniyaController.update);//this for update syllabus(successful)

/* API's FOR TIME */
app.post('/create-time',checkAuth,TimeController.create);//(successful)
app.patch('/update-time/:id',checkAuth,TimeController.update);//(successful)
app.get('/time/:id',checkAuth,TimeController.getOne);//(successful)
app.delete('/delete-time/:id',checkAuth,TimeController.remove);//(successful)
app.get('/times',TimeController.getAll);//(successful)

/* API's FOR DAY */
app.post('/create-day',DayController.create);//(successful)
app.patch('/update-day/:id',DayController.update);//(successful)
app.get('/day/:id',DayController.getOne);//(successful)
app.get('/days',DayController.getAll);//(successful)
app.delete('/delete-day/:id',DayController.remove);//(successful)

/* API's FOR KURS */
app.post('/create-kurs',KursController.create);//(successful)
app.patch('/update-kurs/:id',KursController.update);//(successful)
app.delete('/delete-kurs/:id',KursController.remove);//(successful)
app.get('/kurs/:id',KursController.getOne);//(successful)
app.get('/kursy',KursController.getAll);//(successful)

/* API's FOR speciality */
app.post('/create-speciality',SpecialityController.create);//(successful)
app.patch('/update-speciality/:id',SpecialityController.update);//(successful)
app.delete('/delete-speciality/:id',SpecialityController.remove);//(successful)
app.get('/speciality/:id',SpecialityController.getOne);//(successful)
app.get('/specialities',SpecialityController.getAll);//(successful)


app.listen(5555, ()=> console.log('Server up and running...'));