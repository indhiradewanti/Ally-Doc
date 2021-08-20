const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')
let user = {email: 'rafipratama@gmail.com', password: 'rafipratama', username: 'rafi pratama'}

const Admin = require('../Model')

mongoose.connect("mongodb://localhost:27017/test_database", {useNewUrlParser: true, useUnifiedTopology: true})

beforeAll(async () => {
    await Admin.deleteMany({})
})

// afterEach(async () => {
//     await Admin.remove({})
// })

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
            // console.log(response)
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            expect(response.body).not.toHaveProperty('password')
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
            expect(response.body).toHaveProperty("role", "Admin")
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })
})
