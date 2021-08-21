const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')

const Doctor = require('../Model/DoctorSchema')

mongoose.connect("mongodb://localhost:27017/test_database", {useNewUrlParser: true, useUnifiedTopology: true})

beforeAll(async () => {
    await Doctor.deleteMany({})
    await Doctor.insertMany([
        {_id: 1, email: 'rafipratama@mail', password: 'rafipratama', username: 'rafipratama', photo: 'blalalal', specialist: 'doctor umum', address: 'cimanggu', price: 2000},
        {_id: 2, email: 'rafipratama@mail', password: 'rafipratama', username: 'rafipratama', photo: 'blalalal', specialist: 'doctor umum', address: 'cimanggu', price: 2000},
        {_id: 3, email: 'rafipratama@mail', password: 'rafipratama', username: 'rafipratama', photo: 'blalalal', specialist: 'doctor umum', address: 'cimanggu', price: 2000}
    ])
})

afterAll(async () => {
    await Doctor.deleteMany({})
    await mongoose.connection.close()
})

describe("GET All Doctor Success", () => {
    test('Should GET [success port]', (done) => {
        request(app)
        .get('/doctor')
        .then((response) => {
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBeGreaterThan(0);
            done()
        })
    })
})

describe("GET Id Doctor", () => {
    test('Should GET Id Success', (done) => {
        request(app)
        .get('/doctor/1')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('email', 'rafipratama@mail')
            expect(response.body).toHaveProperty('password', 'rafipratama')
            expect(response.body).toHaveProperty('username', 'rafipratama')
            expect(response.body).toHaveProperty('photo', 'blalalal')
            expect(response.body).toHaveProperty('specialist', 'doctor umum')
            expect(response.body).toHaveProperty('address', 'cimanggu')
            expect(response.body).toHaveProperty('price', 2000)
            expect(response.body).toHaveProperty('status', 'Offline')
            expect(response.body).toHaveProperty('role', 'Doctor')
            expect(response.body).toHaveProperty('timestamp', expect.any(Date))
            done()
        })
    })
    test('Should Error -  return 404 error not found', (done) => {
        request(app)
        .get('/doctor/6')
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
            done()
        })
    })
})


