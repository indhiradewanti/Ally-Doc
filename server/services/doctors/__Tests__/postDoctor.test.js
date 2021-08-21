const jwt = require("jsonwebtoken");
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