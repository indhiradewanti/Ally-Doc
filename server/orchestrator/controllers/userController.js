const axios = require("../helpers/axiosUser.js");
const uploadImage = require("../helpers/imagekit.js");
const Redis = require("ioredis");
const redis = new Redis();

class UserController {
	static async createNewUser(req, res) {
		try {
			let uploadedImage = await uploadImage(
				req.file.buffer,
				req.file.originalname
			);
			let newUserData = req.body;
			newUserData.display_picture = uploadedImage.url;
			let createdUser = await axios({
				method: "POST",
				data: newUserData,
			});
			await redis.del(`user`);
			res.status(201).json(createdUser.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async loginUser(req, res, next) {
		try {
			let { email, password } = req.body;
			let loggedInUser = await axios({
				method: "POST",
				url: "/login",
				data: {
					email,
					password,
				},
			});
			res.status(200).json(loggedInUser.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async findAllUsers(req, res, next) {
		try {
			let { access_token } = req.headers;
			let redisUserStorage = await redis.get("user");
			if (redisUserStorage) {
				res.status(200).json(JSON.parse(redisUserStorage));
			} else {
				let allUsersData = await axios({
					method: "GET",
					url: "/",
					headers: {
						access_token,
					},
				});
				await redis.set(
					"user",
					JSON.stringify(allUsersData.data),
					"EX",
					86400
				);
				res.status(200).json(allUsersData.data);
			}
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async findUserById(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let redisUserStorage = await redis.get(`user${id}`);
			if (redisUserStorage) {
				res.status(200).json(JSON.parse(redisUserStorage));
			} else {
				let foundUserById = await axios({
					method: "GET",
					url: `${id}`,
					headers: {
						access_token,
					},
				});
				await redis.set(
					`user${id}`,
					JSON.stringify(foundUserById.data),
					"EX",
					86400
				);
				res.status(200).json(foundUserById.data);
			}
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updateUserImage(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let uploadedImage = await uploadImage(
				req.file.buffer,
				req.file.originalname
			);
			let updatedUserImage = await axios({
				method: "PATCH",
				url: `/image/${id}`,
				data: {
					display_picture: uploadedImage.url,
				},
				headers: {
					access_token,
				},
			});
			await redis.del("user");
			await redis.del(`user${id}`);
			res.status(201).json(updatedUserImage.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updateUserData(req, res, next) {
		try {
			let { email, height, weight, age, phone_number } = req.body;
			let { id } = req.params;
			let { access_token } = req.headers;
			let updatedUserData = await axios({
				method: "PATCH",
				url: `/${id}`,
				data: {
					email,
					height,
					weight,
					age,
					phone_number,
				},
				headers: {
					access_token,
				},
			});
			await redis.del("user");
			await redis.del(`user${id}`);
			res.status(201).json(updatedUserData.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updateUserPayment(req, res, next) {
		try {
			let { card_number, cvv, expiry_month, expiry_year } = req.body;
			let { id } = req.params;
			let { access_token } = req.headers;
			let updatedUserPayment = await axios({
				method: "PATCH",
				url: `/payment/${id}`,
				data: {
					card_number,
					cvv,
					expiry_month,
					expiry_year,
				},
				headers: {
					access_token,
				},
			});
			await redis.del(`user${id}`);
			res.status(200).json(updatedUserPayment.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let deletedUserData = await axios({
				method: `DELETE`,
				url: `/${id}`,
				headers: {
					access_token,
				},
			});
			await redis.del("user");
			await redis.del(`user${id}`);
			res.status(200).json(deletedUserData.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}
}

module.exports = UserController;
