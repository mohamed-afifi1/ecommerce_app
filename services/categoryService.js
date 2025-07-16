const catModel = require('../models/categoryModel')

exports.newcategory = (req, res) => {
    const name = req.body.name;
    console.log(name);
    const newcat = new catModel({ name });
    newcat.save().then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.json(err);
    })
}