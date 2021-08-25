require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app.js");
const picture =
  "http://sman3rks.sch.id/media_library/posts/post-image-1594363147962.png";

const jwt = require("jsonwebtoken");

let id

mongoose.connect("mongodb://localhost:27017/test_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let access_token = jwt.sign({ role: "Doctor" }, process.env.SECRET_KEY);
let false_token = jwt.sign({ role: "Admin" }, process.env.SECRET_KEY);
const postHistory = {
    userName: "test",
    userPhoto: 'balalala',
    userGender: "male",
    userId: '612514f81388d0001373abd2',
    doctorId: '612514f81388d0001373abd2',
    doctorName: 'test',
    doctorPhoto: 'test',
    doctorSpecialist: 'test'
};

const History = require("../Model/HistorySchema");

beforeAll(async () => {
  await History.deleteMany({});
});

afterAll(async () => {
  await History.deleteMany({});
  await mongoose.connection.close();
});

describe("POST History", () => {
  test("Should POST [success PORT]", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
      .send(postHistory)
      .then((response) => {
          id = response.body._id
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id", expect.any(String))
        expect(response.body).toHaveProperty("userName", "test");
        expect(response.body).toHaveProperty("userPhoto", 'balalala');
        expect(response.body).toHaveProperty("userGender", "male");
        expect(response.body).toHaveProperty("userId", '612514f81388d0001373abd2')
        expect(response.body).toHaveProperty("doctorId", '612514f81388d0001373abd2')

        done();
      });
  });
  
  test("Should POST return name error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
      .send({ ...postHistory, name: undefined })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "name cannot be empty");
        done()
      });
  });
  test("Should POST return age error", (done) => {
      request(app)
      .post("/history/")
      .set("access_token", access_token)
        .send({...postHistory, age: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "age cannot be empty")
            done()
        })
  })
  test("Should POST return gender error", (done) => {
      request(app)
      .post("/history/")
      .set("access_token", access_token)
      .send({...postHistory, gender: undefined})
      .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body).toHaveProperty("message", "gender cannot be empty")
          done()
      })
  })
})

describe("GET History", () => {
    test("Should GET [success PORT]", (done) => {
        request(app)
        .get("/history/")
        .set("access_token", access_token)
        .then((response) => {
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBeGreaterThan(0);
            done()
        })
    })
    test("Should GET return access_token error", (done) => {
        request(app)
        .get('/history/')
        .set("access_token", false_token)
        .then((response) => {
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty("message", "Forbidden to access");
            done();
        })
    })
})

describe("PATCH status history", () => {
    test("Should PATCH [success PORT]", (done) => {
        request(app)
        .patch(`/history/${id}`)
        .set("access_token", access_token)
        .send({status: 'completed'})
        .then((response) => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("status", "completed")
            done()
        })
    })
    test("Should PATCH return access_token error", (done) => {
        request(app)
        .patch(`/history/${id}`)
        .set("access_token", false_token)
        .send({status: 'completed'})
        .then((response) => {
            expect(response.status).toBe(403)
            expect(response.body).toHaveProperty("message", "Forbidden to access")
            done()
        })
    })
    test("Should PATCH return status error", (done) => {
        request(app)
        .patch(`/history/${id}`)
        .set("access_token", access_token)
        .send({status: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "status cannot be empty")
            done()
        })
    })
})