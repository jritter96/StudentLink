import * as log from 'log';
const mongoose = require('mongoose');

const ENDPOINT = process.env.ENDPOINT_DB;
const DESC = process.env.DESC_DB;

mongoose.connect(ENDPOINT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    log.notice(`Connected to database at ${DESC}`);
});
