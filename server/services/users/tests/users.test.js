const request = require("supertest");
const app = require("../app.js");

// DUMMY CUSTOMER DATA
const testingUserData = {
	email: "test@email.com",
	password: "testPassword",
	username: "testUsername",
	height: 100,
	weight: 100,
	age: 100,
	phone_number: "testphone_number",
	gender: "Male",
};

// CREATE USER
// describe("POST / [SUCCESS CASE]", () => {
// 	test("Should return an object with key: access_token and value: any string", (done) => {
// 		request(app)
// 			.post("/")
// 			.field("email", "test@mail.com")
// 			.field("password", "testPassword")
// 			.field("username", "testUsername")
// 			.field("height", 100)
// 			.field("weight", 100)
// 			.field("age", 100)
// 			.field("gender", "Male")
// 			.field("phone_number", "102983012938")
// 			.attach("display_picture", "./tests/testimage.jpg")
// 			.then((response) => {
// 				done();
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// });

// describe("POST / [ERROR CASE]", () => {
// 	test("[Case - Email is empty] Should return 'Email is required'", (done) => {
// 		request(app)
// 			.post("/")
// 			.field("email", "")
// 			.field("password", "testPassword")
// 			.field("username", "testUsername")
// 			.field("height", 100)
// 			.field("weight", 100)
// 			.field("age", 100)
// 			.field("gender", "Male")
// 			.field("phone_number", "102983012938")
// 			.attach("display_picture", "./tests/testimage.jpg")
// 			.then((response) => {
// 				expect(response.status).toBe(400);
// 				console.log(response.body);
// 				expect(response.body).toHaveProperty(
// 					"msg",
// 					"Email is required"
// 				);
// 			})
// 			.catch((err) => {
// 				done(err);
// 			});
// 	});
// });

// describe("POST /login [SUCCESS CASE]", () => {
// 	test(`Should return key: access_token and value: any string`, (done) => {
// 		let userLogin = { email: `test@mail.com`, password: "test" };
// 		request(app)
// 			.post("/login")
// 			.send(userLogin)
// 			.then((response) => {
// 				expect(response.status).toBe(200);
// 				expect(response.body).toHaveProperty(
// 					"access_token",
// 					expect.any(String)
// 				);
// 				done();
// 			})
// 			.catch((err) => {

// 				done(err);
// 			});
// 	});
// });
