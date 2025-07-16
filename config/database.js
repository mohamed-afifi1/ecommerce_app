const mongoose = require('mongoose');

const dbconnect = () => {
        mongoose.connect(process.env.DB_URL)
    .then((con)=>{ console.log('connect with db')})
    .catch((err) =>{console.error(`database error ${err}`);
        process.exit(1);
    })

}

module.exports = dbconnect;