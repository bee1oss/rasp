import TimeModel from "../models/Times.js";

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
            messeage: ' не удалось создать время',
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
            message: 'Не удалось обновить время',
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
                    message: 'расписания удаление не удалось',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'расписания не найдено',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить',
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
                        message: 'расписания не называется',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'расписания не найдено',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить расписания',
        });
    }
};