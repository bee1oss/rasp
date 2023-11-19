import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {UserController, RaspisaniyaController,TimeController} from "./controllers/index.js";
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
app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login);//login olurken auth islemi
app.post('/auth/register',registerValidation, handleValidationErrors, UserController.register);//uye olma islemii
//app.get('/auth/me', checkAuth, UserController.getMe);
/* API's FOR RASP */
app.get('/rasps', RaspisaniyaController.getAll);//butun raspy cagirmak icinn
app.post('/rasps', checkAuth, raspCreateValidation, handleValidationErrors,RaspisaniyaController.create);//bu post olusturmak icinn
app.delete('/rasps/:id', checkAuth, RaspisaniyaController.remove);//bu postu silmek icin
app.get('/rasps/:id',RaspisaniyaController.getOne);//bu tek bir veriyi raspisaniya satirini almak icindir not:bunu sakin silme cunku bu update icin kullanilmaktadir
app.patch('/rasps/:id', checkAuth,raspCreateValidation,handleValidationErrors, RaspisaniyaController.update);//bu postu degistirmek icinn
/* API's FOR TIME */
app.post('/times',checkAuth,TimeController.create);
app.patch('/times/:id',checkAuth,TimeController.update);
app.get('/times/:id',checkAuth,TimeController.getOne);
app.delete('/times/:id',checkAuth,TimeController.remove);
app.listen(5555, ()=> console.log('Server up and running...'));