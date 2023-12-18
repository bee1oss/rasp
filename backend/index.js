import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {PredmetController,TeacherController,UserController, RaspisaniyaController,TimeController,DayController,KursController,SpecialityController,GroupCrontroller} from "./controllers/index.js";
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
app.get('/rasps', RaspisaniyaController.getAll);//butun raspy cagirmak icinn
app.post('/rasps',RaspisaniyaController.create);//bu post olusturmak icinn
app.delete('/rasps/:id', checkAuth, RaspisaniyaController.remove);//bu postu silmek icin
app.get('/rasps/:id',RaspisaniyaController.getOne);//bu tek bir veriyi raspisaniya satirini almak icindir not:bunu sakin silme cunku bu update icin kullanilmaktadir
app.patch('/rasps/:id', checkAuth,raspCreateValidation,handleValidationErrors, RaspisaniyaController.update);//bu postu degistirmek icinn

/* API's FOR TIME */
app.post('/create-time',TimeController.create);//(successful)
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

/* API's FOR Groups */
app.post('/create-group',GroupCrontroller.create);//(successful)
app.patch('/update-group/:id',GroupCrontroller.update);//(successful)
app.delete('/delete-group/:id',GroupCrontroller.remove);//(successful)
app.get('/group/:id',GroupCrontroller.getOne);//(successful)
app.get('/groups',GroupCrontroller.getAll);//(successful)


/* API's FOR Teacher */
app.post('/create-teacher',TeacherController.create);//(successful)
app.patch('/update-teacher/:id',TeacherController.update);//(successful)
app.delete('/delete-teacher/:id',TeacherController.remove);//(successful)
app.get('/teacher/:id',TeacherController.getOne);//(successful)
app.get('/teachers',TeacherController.getAll);//(successful)

/* API's FOR Predmet */
app.post('/create-predmet',PredmetController.create);//(successful)
app.patch('/update-predmet/:id',PredmetController.update);//(successful)
app.delete('/delete-predmet/:id',PredmetController.remove);//(successful)
app.get('/predmet/:id',PredmetController.getOne);//(successful)
app.get('/predmets',PredmetController.getAll);//(successful)


app.listen(5555, ()=> console.log('Server up and running...'));