require('dotenv').config()
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app.js')
const picture = 'http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png'
const jwt = require('jsonwebtoken')

const Doctor = require('../Model/DoctorSchema')

mongoose.connect("mongodb://localhost:27017/test_database", {useNewUrlParser: true, useUnifiedTopology: true})

let access_token = jwt.sign({role: 'Admin'}, process.env.SECRET_KEY)
let token_doctor
let id

let objDoctor = {
    email: "test@mail.com",
    username: "testname",
    password: "testing",
    specialist: "dokter kandungan",
    address: "cimanggu",
    price: 20000,
    photo: picture
}

let updateObj = {email: "test@mail.com", username: "testname", specialist: "dokter jantungan", address: "cimanggu", price: 25000, photo: picture}

beforeAll(async () => {
    await Doctor.deleteMany({})

})

afterAll(async () => {
    await Doctor.deleteMany({})
    await mongoose.connection.close()
})


describe("POST Register Doctor", () => {
    test('Should POST [success PORT]', (done) => {
        request(app)
        .post('/doctor')
        .set("access_token", access_token)
        .send(objDoctor)
        .then((response => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            token_doctor = response.body.access_token
            token_doctor = jwt.verify(token_doctor, process.env.SECRET_KEY)
            id = token_doctor._id
            console.log(id)
            expect(response.body).not.toHaveProperty('password')
            done()
        }))
    })
    test('Should POST error access_token', (done) => {
        request(app)
        .post('/doctor')
        .set("access_token", 'send')
        .send(objDoctor)
        .then((response => {
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty('message', 'Forbidden access')
            done()
        }))
    })
    test('Should POST return email error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, email: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'email cannot be empty')
            done()
        })
    })
    test('Should POST return username error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, username: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'username cannot be empty')
            done()
        })
    })
    test('Should POST return password error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, password: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', "password cannot be empty")
            done()
        })
    })
    test('Should POST return specialist error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, specialist: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'specialist cannot be empty')
            done()
        })
    })
    test('Should POST return address error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, address: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'address cannot be empty')
            done()
        })
    })
    test('Should POST return price error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, price: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'price cannot be empty')
            done()
        })
    })
    test('Should POST return photo error', (done) => {
        request(app)
        .post("/doctor")
        .set("access_token", access_token)
        .send({...objDoctor, photo: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'photo cannot be empty')
            done()
        })
    })
})

describe("POST Login doctor", () => {
    test('Should POST [success PORT]', (done) => {
        request(app)
        .post('/doctor/login')
        .send({email: objDoctor.email, password: objDoctor.password})
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            expect(response.body).not.toHaveProperty("password")
            done()
        })
    })
    test('Should return email error', (done) => {
        request(app)
        .post('/doctor/login')
        .send({password: objDoctor.password, email: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "Email/Password is wrong")
            done()
        })
    })
    test('Should return password error', (done) => {
        request(app)
        .post('/doctor/login')
        .send({email: objDoctor.email, password: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "Password wrong/empty")
            done()
        })
    })
    test('Should POST [success PORT]', (done) => {
        request(app)
        .post('/doctor/login')
        .send({email: objDoctor.email, password: 'eheeyy'})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "Bad Request")
            done()
        })
    })
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
        .get(`/doctor/${id}`)
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('email', 'test@mail.com')
            expect(response.body).toHaveProperty('username', "testname")
            expect(response.body).toHaveProperty('photo', picture)
            expect(response.body).toHaveProperty('specialist', "dokter kandungan")
            expect(response.body).toHaveProperty('address', "cimanggu")
            expect(response.body).toHaveProperty('price', 20000)
            expect(response.body).toHaveProperty('status', 'Online')
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

describe("PUT Update Doctor", () => {
    test("Should PUT Doctor [success PORT]", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send(updateObj)
        .then((response) => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('email', 'test@mail.com')
            expect(response.body).toHaveProperty('username', 'testname')
            expect(response.body).toHaveProperty('specialist', 'dokter jantungan')
            expect(response.body).toHaveProperty('address', 'cimanggu')
            expect(response.body).toHaveProperty('price', 25000)
            expect(response.body).not.toHaveProperty('password')
            done()
        })
    })
    test("Should PUT error return data not found", (done) => {
        request(app)
        .put(`/doctor/61200c1f499a7557b2349`)
        .send(updateObj)
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
            done()
        })
    })
    test("Should PUT error return email error", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, email: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'email cannot be empty')
            done()
        })
    })
    test("Should PUT error return username error", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, username: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'username cannot be empty')
            done()
        })
    })
    test("Should PUT error return specialist error", (done) =>{
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, specialist: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'specialist cannot be empty')
            done()
        })
    })
    test("Should PUT return address error", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, address: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'address cannot be empty')
            done()
        })
    })
    test("Should PUT return price error", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, price: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'price cannot be empty')
            done()
        })
    })
    test("Should PUT return photo error", (done) => {
        request(app)
        .put(`/doctor/${id}`)
        .send({...updateObj, photo: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'photo cannot be empty')
            done()
        })
    })
})

describe("Should PATCH Status", () => {
    test("Should PATCH status [success PORT]", (done) => {
        request(app)
        .patch(`/doctor/status/${id}`)
        .send({status: "Online"})
        .then((response) => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('message', 'success to update')
            done()
        })
    })
    test("Should return error status", (done) => {
        request(app)
        .patch(`/doctor/status/${id}`)
        .send({status: undefined })
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'Status cannot be empty')
            done()
        })
    })
    test("Should return error not found", (done) => {
        request(app)
        .patch(`/doctor/status/${6}`)
        .send({status:'Online' })
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
            done()
        })
    })
})

describe("Should PATCH Photo", () => {
    test('Should PATCH Photo [success PORT]', (done) => {
        request(app)
        .patch(`/doctor/photo/${id}`)
        .send({photo: 'coba coba'})
        .then((response) => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('message', "success update photo")
            done()
        })
    })
    test('Should return error photo', (done) => {
        request(app)
        .patch(`/doctor/photo/${id}`)
        .send({photo: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'Photo cannot be empty')
            done()
        })
    })
    test('Should return error data not found', (done) => {
        request(app)
        .patch(`/doctor/photo/${5}`)
        .send({photo: 'coba coba'})
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
            done()
        })
    })
})

describe("Should DELETE Success", () => {
    test('Should error forbidden', (done) => {
        request(app)
        .delete(`/doctor/${id}`)
        .set("access_token", "bababab")
        .then((response) => {
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty('message', "Forbidden to access" )
            done()
        })
    })
    test('Should error not found', (done) => {
        request(app)
        .delete(`/doctor/${1}`)
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
            done()
        })
    })
    test("Should Delete [success PORT]", (done) => {
        request(app)
        .delete(`/doctor/${id}`)
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('message', "success to delete")
            done()
        })
    })
})
