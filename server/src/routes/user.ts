import * as express from 'express';
import { generateName } from '../utils/generate-name';
const User = require('../models/user');
const Course = require('../models/course');
const Group = require('../models/group');
import { matchUser } from '../utils/matching';
import { getRegisteredCourses } from '../utils/get-registered-courses';

const router = express.Router();

/*
 * Read a user from the database using its Object ID
 *
 * GET /user/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Gets all the data for the courses taken by a user
 *
 * GET /user/:id/courses
 */
router.get('/:id/courses', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        const userCopy = JSON.parse(JSON.stringify(user));
        userCopy.coursesObj = await Course.find({ courseCode: { $in: userCopy.courses } });
        res.send(userCopy);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Gets all the data for the groups a user is in
 *
 * GET /user/:id/courses
 */
router.get('/:id/groups', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        const userCopy = JSON.parse(JSON.stringify(user));
        userCopy.groupsObj = await Group.find({ _id: { $in: userCopy.groups } });
        res.send(userCopy);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Get a user's courses from the Canvas API and use them to populate the database
 *
 * POST /user/:id/courses
 */
router.post('/:id/courses', async (req, res) => {
    try {
        await getRegisteredCourses(req.params.id);
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * TEMPORARY
 * Authenticate a user from the database using their first name and last name
 *
 * POST /user/login
 */
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.attemptLogin(username, password);

        if (!user) {
            return res.status(400).send({
                error: 'Invalid login credentials requested',
            });
        }

        res.send({ _id: user._id, firstName: user.firstName, lastName: user.lastName, createdAt: user.createdAt });
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Create or overwrite a push notification entry for a user
 *
 * POST /user/:id/push_notification
 */
router.post('/:id/push_notification', async (req, res) => {
    const token = req.body.token.value;

    if (!token) {
        return res.status(400).send({
            error: 'Invalid push notification token update requested',
        });
    }

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            res.status(404).send();
        }

        user.pushNotificationToken = token;

        await user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
 * Match a user with a group
 *
 * POST /user/userId/match
 */
router.post('/:id/match', async (req, res) => {
    try {
        matchUser(req.params.id, (err, group) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(group);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Create a user
 *
 * POST /user
 */
router.post('/', async (req, res) => {
    const allUsers = await User.find({});

    for (const user of allUsers) {
        if (user.username === req.body.username) {
            res.status(400).send('Username already exists');
        }
    }

    const user = new User({
        ...req.body,
        aliasName: generateName(),
        groups: [],
    });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Modifies a user
 * PATCH /user/:id
 */
router.patch('/:id', async (req, res) => {
    // collect all of the requested key updates and validate them against allowed changes
    const updates = Object.keys(req.body);

    const allowedUpdates = [
        'firstName',
        'lastName',
        'aliasName',
        'courses',
        'groups',
        'schedule',
        'token',
        'username',
        'password',
    ];

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates requested' });
    }

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            res.status(404).send();
        }

        updates.forEach(update => {
            user[update] = req.body[update];
        });

        await user.save();

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
