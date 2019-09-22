import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET course using a courseId');
});

router.post('/', (req, res) => {
    // TODO: implement
});

module.exports = router;
