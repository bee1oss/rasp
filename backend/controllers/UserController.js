import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            }, 'secret',
            {
                expiresIn: '30d',
            },);

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Не удалось зарегистрироваться',
        });
    }
};
//asassasa
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Ваш адрес электронной почты или пароль неверны',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Авторизация не удалась',
        });
    }
};

/*export const getMe = async (req,res)=>{
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }else{
            const {passwordHash, ...userData} = user._doc;

            res.json(userData);
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({//asas
            messeage: 'У вас нет доступа',
        });
    }
};*/