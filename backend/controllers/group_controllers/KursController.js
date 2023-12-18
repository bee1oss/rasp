import KursModel from "../../models/group/Kurs.js";

export const create = async (req, res) => {//ok
    try {
        const coursesDoc = new KursModel({
            course: req.body.course,
        });
        const course = await coursesDoc.save();

        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create course',
        });
    }
};

export const update = async (req, res) => {//ok
    try {
        const courseId = req.params.id;

        await KursModel.updateOne({
            _id: courseId,
        }, {
            course: req.body.course,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update course',
        });
    }
};

export const remove = async (req, res) => {//ok
    try {
        const courseId = req.params.id;

        KursModel.findOneAndDelete({
            _id: courseId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete course',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find course for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete course',
        });
    }
};

export const getOne = async (req, res) => {//ok
    try {
        const courseId = req.params.id;

        KursModel.findOneAndUpdate(
            {
                _id: courseId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find course',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find course',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get course',
        });
    }
};

export const getAll = async (req, res) => {//ok
    try {
        const courses = await KursModel.find();
        res.json(courses);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'course display operation failed',
        });
    }
};