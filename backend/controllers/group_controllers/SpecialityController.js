import SpecialityModel from "../../models/group/Speciality.js";

export const create = async (req, res) => {//
    try {
        const specialitiesDoc = new SpecialityModel({
            speciality: req.body.speciality,
        });
        const speciality = await specialitiesDoc.save();

        res.json(speciality);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create speciality',
        });
    }
};

export const update = async (req, res) => {//
    try {
        const specialityId = req.params.id;

        await SpecialityModel.updateOne({
            _id: specialityId,
        }, {
            speciality: req.body.speciality,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update speciality',
        });
    }
};

export const remove = async (req, res) => {//
    try {
        const specialityId = req.params.id;

        SpecialityModel.findOneAndDelete({
            _id: specialityId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete speciality',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find speciality for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete speciality',
        });
    }
};

export const getOne = async (req, res) => {//
    try {
        const specialityId = req.params.id;

        SpecialityModel.findOneAndUpdate(
            {
                _id: specialityId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find speciality',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find speciality',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get speciality',
        });
    }
};

export const getAll = async (req, res) => {//
    try {
        const specialities = await SpecialityModel.find();
        res.json(specialities);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'specialities display operation failed',
        });
    }
};