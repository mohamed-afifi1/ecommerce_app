const mongoose = require('mongoose');

const dbconnect = () => {
        mongoose.connect(process.env.DB_URL)
    .then((con)=>{ console.log('DB State:', con.connection.readyState);})
    .catch((err) =>{console.error(`database error ${err}`);
        process.exit(1);
    })

}

module.exports = dbconnect;