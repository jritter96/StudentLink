export {};

const request = require('supertest');
const service = require('../../src/service');
const Course = require('../../src/models/course');

const testCourseId = '5d8c51d08a7fc5ae1f4531a2';
const invalidCourseId = '000051d08a7fc5ae1f450000';

const testCourse = {
    _id: testCourseId,
    courseCode: 'TEST',
    courseSection: '101',
};

beforeEach(async () => {
    await Course.deleteMany();
    await new Course(testCourse).save();
});

test('Can retrieve a valid course', async () => {
    await request(service)
        .get(`/course/${testCourseId}`)
        .send()
        .expect(200);
});

test('Can not retrieve an invalid course', async () => {
    await request(service)
        .get(`/course/${invalidCourseId}`)
        .send()
        .expect(404);
});

test('Can create a new course', async () => {
    const newCourseId = '5d8c51d08a7fc5ae1f455555';

    const newCourse = {
        _id: newCourseId,
        courseCode: 'TEST',
        courseSection: '400',
    };

    // create a new user
    await request(service)
        .post('/course')
        .send(newCourse)
        .expect(201);

    // validate that they are in the database
    await request(service)
        .get(`/course/${newCourseId}`)
        .send()
        .expect(200);
});

test('Can update an existing course with valid fields', async () => {
    await request(service)
        .patch(`/course/${testCourseId}`)
        .send({
            times: ['1100000000000000000000000011'],
        });
});

test('Can not update an existing course with invalid fields', async () => {
    await request(service)
        .patch(`/course/${testCourseId}`)
        .send({
            _id: invalidCourseId,
        })
        .expect(400);
});
