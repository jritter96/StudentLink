const request = require('supertest');
const service = require('../../src/service');
const User = require('../../src/models/user');

const testUserId = '5d8c51d08a7fc5ae1f4531a2';
const invalidUserId = '000051d08a7fc5ae1f450000';

const testUser = {
    _id: testUserId,
    firstName: 'Test',
    lastName: 'User',
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(testUser).save();
});

test('Can retrieve a valid user', async () => {
    await request(service)
        .get(`/user/${testUserId}`)
        .send()
        .expect(200);
});

test('Can not retrieve a invalid user', async () => {
    await request(service)
        .get(`/user/${invalidUserId}`)
        .send()
        .expect(404);
});

// TODO: replace with valid credential chain when implemented
test('Can login with valid credentials', async () => {
    await request(service)
        .post('/user/login')
        .send({
            firstName: 'Test',
            lastName: 'User',
        })
        .expect(200);
});

// TODO: replace with valid credential chain when implemented
test('Can not login with invalid credentials', async () => {
    await request(service)
        .post('/user/login')
        .send({
            firstName: 'INVALID',
            lastName: 'CREDENTIALS',
        })
        .expect(400);
});

test('Can create a new user', async () => {
    const newUserId = '5d8c51d08a7fc5ae1f455555';

    const newUser = {
        _id: newUserId,
        firstName: 'New',
        lastName: 'User',
    };

    // create a new user
    await request(service)
        .post('/user')
        .send(newUser)
        .expect(201);

    // validate that they are in the database
    await request(service)
        .get(`/user/${newUserId}`)
        .send()
        .expect(200);
});

test('Can update an existing user', async () => {
    const response = await request(service)
        .patch(`/user/${testUserId}`)
        .send({
            firstName: 'Tester',
        });

    expect(response.body.firstName).toEqual('Tester');
});

test('Can not update an existing user with invalid fields', async () => {
    await request(service)
        .patch(`/user/${testUserId}`)
        .send({
            _id: invalidUserId,
        })
        .expect(400);
});
