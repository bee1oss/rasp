import TimeModel from "../../models/Times.js";

export const create = async (req, res) => {//ok
    try {
        const timesDoc = new TimeModel({
            time: req.body.time,
        });
        const time = await timesDoc.save();

        res.json(time);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create time',
        });
    }
};

export const update = async (req, res) => {//ok
    try {
        const timeId = req.params.id;

        await TimeModel.updateOne({
            _id: timeId,
        }, {
            time: req.body.time,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update time',
        });
    }
};

export const remove = async (req, res) => {//ok
    try {
        const timeId = req.params.id;

        TimeModel.findOneAndDelete({
            _id: timeId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete time',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find time for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete time',
        });
    }
};

export const getOne = async (req, res) => {//ok
    try {
        const timeId = req.params.id;

        TimeModel.findOneAndUpdate(
            {
                _id: timeId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find time',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find time',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get time',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const times = await TimeModel.find();
        res.json(times);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'time display operation failed',
        });
    }
};