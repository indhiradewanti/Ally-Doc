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
        expect(response.body).toHaveProperty("userName", "test");
        expect(response.body).toHaveProperty("userPhoto", 'balalala');
        expect(response.body).toHaveProperty("userGender", "male");
        expect(response.body).toHaveProperty("userId", '612514f81388d0001373abd2')
        expect(response.body).toHaveProperty("doctorId", '612514f81388d0001373abd2')
        expect(response.body).toHaveProperty("doctorName", 'test')
        expect(response.body).toHaveProperty("doctorPhoto", 'test')
        expect(response.body).toHaveProperty("doctorSpecialist", 'test')
        expect(response.body).toHaveProperty("status", 'in progress')
        done();
      });
  });
  
  test("Should POST return userName error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
      .send({ ...postHistory, userName: undefined })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "userName cannot be empty");
        done()
      });
  });
  test("Should POST return userId error", (done) => {
      request(app)
      .post("/history/")
      .set("access_token", access_token)
        .send({...postHistory, userId: undefined})
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("message", "userId cannot be empty")
            done()
        })
  })
  test("Should POST return userGender error", (done) => {
      request(app)
      .post("/history/")
      .set("access_token", access_token)
      .send({...postHistory, userGender: undefined})
      .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body).toHaveProperty("message", "userGender cannot be empty")
          done()
      })
  })
  test("Should POST return userPhoto error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
    .send({...postHistory, userPhoto: undefined})
    .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "userPhoto cannot be empty")
        done()
    })
  })
  test("Should POST return doctorId error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
    .send({...postHistory, doctorId: undefined})
    .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "doctorId cannot be empty")
        done()
    })
  })
  test("Should POST return doctorName error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
    .send({...postHistory, doctorName: undefined})
    .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "doctorName cannot be empty")
        done()
    })
  })
  test("Should POST return doctorPhoto error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
    .send({...postHistory, doctorPhoto: undefined})
    .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "doctorPhoto cannot be empty")
        done()
    })
  })
  test("Should POST return doctorSpecialist error", (done) => {
    request(app)
    .post("/history/")
    .set("access_token", access_token)
    .send({...postHistory, doctorSpecialist: undefined})
    .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "doctorSpecialist cannot be empty")
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