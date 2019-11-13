const request = require('supertest');
const service = require('../../src/service');

test('Can retrieve a valid user', async () => {
    await request(service)
        .get('/user/5d8c51d08a7fc5ae1f4531a2')
        .send()
        .expect(200);
});

test('Can not retrieve a invalid user', async () => {
    await request(service)
        .get('/user/000051d08a7fc5ae1f450000')
        .send()
        .expect(404);
});

// TODO: replace with valid credential chain when implemented
test('Can login with valid credentials', async () => {
    await request(service)
        .post('/user/login')
        .send({
            firstName: 'Connor',
            lastName: 'Fong',
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
