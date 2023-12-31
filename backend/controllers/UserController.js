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
            messeage: 'Failed to register',
        });
    }
};
//asassasa
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User is not found',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Your e-mail address or password is incorrect',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '3d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Authorization failed',
        });
    }
};

export const getMe = async (req,res)=>{
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: 'User is not found',
            });
        }else{
            const {passwordHash, ...userData} = user._doc;

            res.json(userData);
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({//asas
            messeage: 'You dont have access',
        });
    }
};