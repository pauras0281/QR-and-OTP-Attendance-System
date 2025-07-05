const Subject = require('../model/sub')

const subController = async(req, res) =>{
    let subjects;

    try {
        subjects = await Subject.find();
    } catch (error) {
        return console.log(error);
    }
    return res.status(200).json(subjects);

}

module.exports = subController