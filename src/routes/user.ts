import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET user using a classId');
});

router.post('/', (req, res) => {
    // TODO: implement
});

module.exports = router;
