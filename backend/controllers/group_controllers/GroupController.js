import GroupModel from "../../models/group/Group.js";

export const getAll = async (req, res) => {
    try {
        const groups = await GroupModel.find().populate('speciality').exec();
        res.json(groups);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'group display operation failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const groupId = req.params.id;

        GroupModel.findOneAndDelete({
            _id: groupId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'group deletion failed',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'no group found',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const groupId = req.params.id;

        GroupModel.findOneAndUpdate(
            {
                _id: groupId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'no group announced',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'no group found',
                    });
                }

                res.json(doc);
            },
        ).populate('kurs').populate('speciality');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get group',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new GroupModel({
            group_number: req.body.group_number,
            kurs: req.body.kurs,
            speciality: req.body.specialityId
        });
        const group = await doc.save();

        res.json(group);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create group',
        });
    }
};

export const update = async (req, res) => {
    try {
        const groupId = req.params.id;

        await GroupModel.updateOne({
            _id: groupId,
        }, {
            group_number: req.body.group_number,
            kurs: req.body.kurs,
            speciality: req.body.specialityId,

        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update Group',
        });
    }
};