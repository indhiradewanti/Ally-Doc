const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')
let user = {email: 'rafipratama@gmail.com', password: 'rafipratama', username: 'rafi pratama'}

const Admin = require('../Model')

mongoose.connect("mongodb://localhost:27017/test_database", {useNewUrlParser: true, useUnifiedTopology: true})

beforeAll(async () => {
    await Admin.deleteMany({})
})

afterAll(async () => {
    await Admin.deleteMany({})
    await mongoose.connection.close()
})

describe("POST Regis Success", () => {
    test('Should POST [success port]', (done) => {
        request(app)
        .post('/admin/regis')
        .send(user)
        .then((response) => {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })
    test("400 Failed register - should return email cannot be empty", (done) => {
        request(app)
        .post('/admin/regis')
        .send({password: 'rafipratama', username: 'Rafi'})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'email cannot be empty')
            done()
        })
    })
    test("400 Failed register - should return password cannot be empty", (done) => {
        request(app)
        .post('/admin/regis')
        .send({email: 'rafipratama', username: 'Rafi'})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'password wrong/empty')
            done()
        })
    })
    test("400 Failed register - should return cannot be empty", (done) => {
        request(app)
        .post('/admin/regis')
        .send({password: 'rafipratama', email: 'rafi@gmail.com'})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'username cannot be empty')
            done()
        })
    })
})

describe("POST Login Success", () => {
    test('Should POST [success port]', (done) => {
        request(app)
        .post('/admin/login')
        .send({email: user.email, password: user.password})
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })
    test('400 Failed login - should return email is wrong', (done) => {
        request(app)
        .post('/admin/login')
        .send({password: user.password, email: 'cewwww'})
        .then((response) => {
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', "Email/Password is Wrong")
            done()
        })
    })
})

