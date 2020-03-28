import mongoose from 'mongoose';
import config from './config';

export default callback => {
    //let db = mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

    let db = mongoose.connect(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log('error connecting to the database');
        process.exit();
    });

    callback(db);
}