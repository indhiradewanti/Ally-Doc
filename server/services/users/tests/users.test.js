require("dotenv").config();
const request = require("supertest");
const app = require("../app.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require("../models/User.js");

let createdUser = {};

beforeAll(async () => {
	await mongoose.connect("mongodb://localhost:27016/test", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	await UserModel.deleteMany({});
});

afterAll(async () => {
	await UserModel.deleteMany({});
	await mongoose.connection.close();
});

// CREATE USER
describe("POST / [SUCCESS CASE]", () => {
	test("Should return an object with key: access_token and value: any string", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				createdUser = response.body;
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty(
					"access_token",
					expect.any(String)
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST / [ERROR CASE]", () => {
	test("[Case - Email is empty] Should return 'Email is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Email is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Password is empty] Should return 'Password is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Password is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Username is empty] Should return 'Username is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Username is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Height is empty] Should return 'Height is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", "")
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Height is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Weight is empty] Should return 'Weight is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", "")
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Weight is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Age is empty] Should return 'Age is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", "")
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("msg", "Age is required");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Phone Number is empty] Should return 'Phone Number is required'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "")
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Phone Number is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Display picture is empty] Should return 'No file chosen'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("msg", "No file chosen");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Image is larger than 1,5mb] Should return 'File size is larger than 1,5mb'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testlargeimage.jpg")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"File size is larger than 1,5mb"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Display picture is not a picture] Should return 'File type is not an image'", (done) => {
		request(app)
			.post("/")
			.field("email", "test@mail.com")
			.field("password", "testPassword")
			.field("username", "testUsername")
			.field("height", 100)
			.field("weight", 100)
			.field("age", 100)
			.field("gender", "Male")
			.field("phone_number", "102983012938")
			.attach("display_picture", "./tests/testnotimage.pdf")
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"File type is not an image"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// LOGIN USER
describe("POST /login [SUCCESS CASE]", () => {
	test(`Should return key: access_token and value: any string`, (done) => {
		let userLogin = { email: `test@mail.com`, password: "testPassword" };
		request(app)
			.post("/login")
			.send(userLogin)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty(
					"access_token",
					expect.any(String)
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("POST /login [ERROR CASE]", () => {
	test(`[Case - Email is empty] Should return 'Email is required'`, (done) => {
		let userLogin = { email: ``, password: "test" };
		request(app)
			.post("/login")
			.send(userLogin)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Email is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(`[Case - Password is empty] Should return 'Password is required'`, (done) => {
		let userLogin = { email: `test@mail.com`, password: "" };
		request(app)
			.post("/login")
			.send(userLogin)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Password is required"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(`[Case - Wrong Email] Should return 'Invalid email/password'`, (done) => {
		let userLogin = { email: `wrongtestemail@mail.com`, password: "test" };
		request(app)
			.post("/login")
			.send(userLogin)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Invalid email/password"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(`[Case - Wrong Password] Should return 'Invalid email/password'`, (done) => {
		let userLogin = {
			email: `test@mail.com`,
			password: "wrongtestpassword",
		};
		request(app)
			.post("/login")
			.send(userLogin)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Invalid email/password"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// FIND ALL USERS - BELOM SELESAI
describe("GET / [SUCCESS CASE]", () => {
	let access_token = jwt.sign({ role: "Admin" }, process.env.SECRET_KEY);
	test(`Should return a list of users`, (done) => {
		request(app)
			.get("/")
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveLength(1);
				expect(response.body).toBeTruthy();
				expect.any(Array);
				expect(response.body[0]).toHaveProperty("role", "User");
				expect(response.body[0]).toHaveProperty(
					"_id",
					expect.any(String)
				);
				expect(response.body[0]).toHaveProperty(
					"email",
					"test@mail.com"
				);
				expect(response.body[0]).toHaveProperty(
					"username",
					"testUsername"
				);
				expect(response.body[0]).toHaveProperty(
					"display_picture",
					expect.any(String)
				);
				expect(response.body[0]).toHaveProperty("height", 100);
				expect(response.body[0]).toHaveProperty("weight", 100);
				expect(response.body[0]).toHaveProperty("age", 100);
				expect(response.body[0]).toHaveProperty(
					"phone_number",
					"102983012938"
				);
				expect(response.body[0]).toHaveProperty("gender", "Male");
				expect(response.body[0]).toHaveProperty(
					"timestamp",
					expect.any(String)
				);
				expect(response.body[0]).not.toHaveProperty("password");
				expect(response.body[0]).not.toHaveProperty("payment");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET / [ERROR CASE]", () => {
	let access_token = jwt.sign({ role: "User" }, process.env.SECRET_KEY);
	test(`[Case - Requester is not admin] Should return 'Unauthorized access'`, (done) => {
		request(app)
			.get("/")
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(403);
				expect(response.body).toHaveProperty(
					"msg",
					"Unauthorized access"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// FIND USER BY ID
describe("GET /:id [SUCCESS CASE]", () => {
	test(`Should return an object User with matching id`, (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.get(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty("payment", {
					card_number: expect.any(String),
					cvv: expect.any(String),
					expiry_month: expect.any(String),
					expiry_year: expect.any(String),
				});
				expect(response.body).toHaveProperty("role", "User");
				expect(response.body).toHaveProperty("_id", expect.any(String));
				expect(response.body).toHaveProperty("email", "test@mail.com");
				expect(response.body).toHaveProperty(
					"username",
					"testUsername"
				);
				expect(response.body).toHaveProperty(
					"display_picture",
					expect.any(String)
				);
				expect(response.body).toHaveProperty(
					"height",
					expect.any(Number)
				);
				expect(response.body).toHaveProperty(
					"weight",
					expect.any(Number)
				);
				expect(response.body).toHaveProperty("age", expect.any(Number));
				expect(response.body).toHaveProperty(
					"phone_number",
					expect.any(String)
				);
				expect(response.body).toHaveProperty("gender", "Male");
				expect(response.body).toHaveProperty(
					"timestamp",
					expect.any(String)
				);
				expect(response.body).not.toHaveProperty(
					"password",
					expect.any(String)
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("GET /:id [ERROR CASE]", () => {
	test("[Case - Access token doesn't belong to User]", (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		let access_token = jwt.sign({ role: "Admin" }, process.env.SECRET_KEY);
		request(app)
			.get(`/${access.id}`)
			.set("access_token", access_token)
			.then((response) => {
				expect(response.status).toBe(403);
				expect(response.body).toHaveProperty(
					"msg",
					"Unauthorized access"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// // UPDATE USER IMAGE
describe("PATCH /image/:id [SUCCESS CASE]", () => {
	test(`Should return a string 'Profile picture updated successfully'`, (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/image/${access.id}`)
			.set("access_token", createdUser.access_token)
			.attach("display_picture", "./tests/testimage.png")
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty(
					"msg",
					"Profile picture updated successfully"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PATCH /image/:id [ERROR CASE]", () => {
	test(`[Case - Display picture is empty]`, (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/image/${access.id}`)
			.attach("display_picture", "")
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("msg", "No file chosen");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(`[Case - Display picture size larger than 1,5mb] Should return 'File size is larger than 1,5mb'`, (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/image/${access.id}`)
			.attach("display_picture", "./tests/testlargeimage.jpg")
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"File size is larger than 1,5mb"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test(`[Case - Display picture is not an image] Should return 'File type is not an image'`, (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/image/${access.id}`)
			.attach("display_picture", "./tests/testnotimage.pdf")
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"File type is not an image"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// UPDATE USER
describe("PATCH /:id [SUCCESS CASE]", () => {
	test(`Should return a user object with the updated data`, (done) => {
		let updateUser = {
			email: "test@mail.com",
			height: 100,
			weight: 100,
			age: 100,
			phone_number: "123456789",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("payment", {
					card_number: expect.any(String),
					cvv: expect.any(String),
					expiry_month: expect.any(String),
					expiry_year: expect.any(String),
				});
				expect(response.body).toHaveProperty("role", "User");
				expect(response.body).toHaveProperty("_id", expect.any(String));
				expect(response.body).toHaveProperty("email", "test@mail.com");
				expect(response.body).toHaveProperty(
					"username",
					"testUsername"
				);
				expect(response.body).toHaveProperty(
					"display_picture",
					expect.any(String)
				);
				expect(response.body).toHaveProperty(
					"height",
					expect.any(Number)
				);
				expect(response.body).toHaveProperty(
					"weight",
					expect.any(Number)
				);
				expect(response.body).toHaveProperty("age", expect.any(Number));
				expect(response.body).toHaveProperty(
					"phone_number",
					expect.any(String)
				);
				expect(response.body).toHaveProperty("gender", "Male");
				expect(response.body).not.toHaveProperty(
					"password",
					expect.any(String)
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PATCH /:id [ERROR CASES]", () => {
	test("[Case - Email is empty] Should return 'Email cannot be empty'", (done) => {
		let updateUser = {
			email: "",
			height: 100,
			weight: 100,
			age: 100,
			phone_number: "123456789",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Email cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Height is empty] Should return 'Height cannot be empty'", (done) => {
		let updateUser = {
			email: "test@mail.com",
			height: "",
			weight: 100,
			age: 100,
			phone_number: "123456789",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Height cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Weight is empty] Should return 'Weight cannot be empty'", (done) => {
		let updateUser = {
			email: "test@mail.com",
			height: 100,
			weight: "",
			age: 100,
			phone_number: "123456789",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Weight cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Age is empty] Should return 'Age cannot be empty'", (done) => {
		let updateUser = {
			email: "test@mail.com",
			height: 100,
			weight: 100,
			age: "",
			phone_number: "123456789",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Age cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Phone Number is empty] Should return 'Phone Number cannot be empty'", (done) => {
		let updateUser = {
			email: "test@mail.com",
			height: 100,
			weight: 100,
			age: 100,
			phone_number: "",
			gender: "Male",
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(updateUser)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Phone Number cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// UPDATE USER PAYMENT
describe("PATCH /payment/:id [SUCCESS CASE]", () => {
	test("Should return a string 'Payment updated successfully'", (done) => {
		let paymentData = {
			card_number: `1234 5678 8765 4321`,
			cvv: `123`,
			expiry_month: `12`,
			expiry_year: `24`,
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/payment/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(paymentData)
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty(
					"msg",
					"Payment updated successfully"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("PATCH /payment/:id [ERROR CASES]", () => {
	test("[Case - Card Number is empty] Should return 'Card Number cannot be empty'", (done) => {
		let paymentData = {
			card_number: ``,
			cvv: `123`,
			expiry_month: `12`,
			expiry_year: `24`,
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/payment/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(paymentData)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Card Number cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - CVV is empty] Should return 'CVV cannot be empty'", (done) => {
		let paymentData = {
			card_number: `1234 5678 8765 4321`,
			cvv: ``,
			expiry_month: `12`,
			expiry_year: `24`,
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/payment/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(paymentData)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"CVV cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Expiry month is empty] Should return 'Expiry month cannot be empty'", (done) => {
		let paymentData = {
			card_number: `1234 5678 8765 4321`,
			cvv: `123`,
			expiry_month: ``,
			expiry_year: `24`,
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/payment/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(paymentData)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Expiry month cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	test("[Case - Expiry year is empty] Should return 'Expiry year cannot be empty'", (done) => {
		let paymentData = {
			card_number: `1234 5678 8765 4321`,
			cvv: `123`,
			expiry_month: `12`,
			expiry_year: ``,
		};
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.patch(`/payment/${access.id}`)
			.set("access_token", createdUser.access_token)
			.send(paymentData)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Expiry year cannot be empty"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

// DELETE USER
describe("DELETE /:id [SUCCESS CASE]", () => {
	test("Should return a string 'User deleted successfully'", (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		request(app)
			.delete(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toHaveProperty(
					"msg",
					"User deleted successfully"
				);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("DELETE /:id [ERROR CASE]", () => {
	test("[Case - Wrong user id] Should return 'User not found'", (done) => {
		let access = jwt.verify(
			createdUser.access_token,
			process.env.SECRET_KEY
		);
		access.id.split("");
		access.id[-1] = "a";
		console.log(access.id);
		request(app)
			.delete(`/${access.id}`)
			.set("access_token", createdUser.access_token)
			.then((response) => {
				expect(response.status).toBe(404);
				expect(response.body).toHaveProperty("msg", "User not found");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});
