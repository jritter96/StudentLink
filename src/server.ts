import * as express from 'express';
import * as classRouter from './routes/class';
import * as userRouter from './routes/user';

const server = express();
const ENDPOINT = process.env.ENDPOINT || 'http://localhost';
const PORT = process.env.PORT || 3000;

server.use('/users', userRouter);
server.use('/classes', classRouter);

server.get('/', (req, res) => {
    res.send('This is a placeholder for documentation.');
});

server.listen(PORT, () => {
    console.log(`Server is running in ${ENDPOINT}:${PORT}`);
});
