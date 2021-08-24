const axios = require("../helpers/axiosDoctor.js");
const uploadImage = require("../helpers/imagekit.js");
const Redis = require("ioredis");
const redis = new Redis({
	host: "redis-14354.c61.us-east-1-3.ec2.cloud.redislabs.com",
	port: 14354,
	password: "rafipratama",
});

class DoctorController {
	static async getAllDoctors(req, res, next) {
		try {
			let redisDoctorStorage = await redis.get("doctor");
			if (redisDoctorStorage) {
				res.status(200).json(JSON.parse(redisDoctorStorage));
			} else {
				let allDoctorsList = await axios({
					method: "GET",
					url: "/doctor",
				});
				await redis.set(
					"doctor",
					JSON.stringify(allDoctorsList.data),
					"EX",
					86400
				);
				res.status(200).json(allDoctorsList.data);
			}
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async getDoctorById(req, res, next) {
		try {
			let { id } = req.params;
			let redisDoctorStorage = await redis.get(`doctor${id}`);
			if (redisDoctorStorage) {
				res.status(200).json(JSON.parse(redisDoctorStorage));
			} else {
				let getDoctor = await axios({
					method: "GET",
					url: `/doctor/${id}`,
				});
				await redis.set(
					`doctor${id}`,
					JSON.stringify(getDoctor.data),
					"EX",
					86400
				);
				res.status(200).json(getDoctor.data);
			}
		} catch (err) {
			console.log(err);
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async registerDoctor(req, res, next) {
		try {
			let { access_token } = req.headers;
			let { email, username, password, specialist, address, price } =
				req.body;
			let uploadedImage = await uploadImage(
				req.file.buffer,
				req.file.originalname
			);
			let registeredDoctor = await axios({
				method: "POST",
				url: "/doctor",
				data: {
					email,
					username,
					password,
					specialist,
					address,
					price: Number(price),
					photo: uploadedImage.url,
				},
				headers: {
					access_token,
				},
			});
			await redis.del("doctor");
			res.status(201).json(registeredDoctor.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async loginDoctor(req, res, next) {
		try {
			let { email, password } = req.body;
			let loggedInDoctor = await axios({
				method: "POST",
				url: "/doctor/login",
				data: {
					email,
					password,
				},
			});
			res.status(200).json(loggedInDoctor.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updateDoctor(req, res, next) {
		try {
			let { id } = req.params;
			let { email, username, specialist, address, price } = req.body;
			let uploadedImage = await uploadImage(
				req.file.buffer,
				req.file.originalname
			);
			let updatedDoctor = await axios({
				method: "PUT",
				url: `/doctor/${id}`,
				data: {
					email,
					username,
					specialist,
					address,
					price: Number(price),
					photo: uploadedImage.url,
				},
			});
			await redis.del("doctor");
			await redis.del(`doctor${id}`);
			res.status(201).json(updatedDoctor.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updateStatus(req, res, next) {
		try {
			let { status } = req.body;
			let { id } = req.params;
			let updatedStatus = await axios({
				method: "PATCH",
				url: `/doctor/status/${id}`,
				data: {
					status,
				},
			});
			await redis.del("doctor");
			await redis.del(`doctor${id}`);
			res.status(201).json(updatedStatus.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async updatePhoto(req, res, next) {
		try {
			let { id } = req.params;
			let uploadedImage = await uploadImage(
				req.file.buffer,
				req.file.originalname
			);
			let updatedPhoto = await axios({
				method: "PATCH",
				url: `/doctor/photo/${id}`,
				data: {
					photo: uploadedImage.url,
				},
			});
			await redis.del("doctor");
			await redis.del(`doctor${id}`);
			res.status(201).json(updatedPhoto.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async deleteDoctor(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let deletedDoctor = await axios({
				method: "DELETE",
				url: `/doctor/${id}`,
				headers: {
					access_token,
				},
			});
			await redis.del("doctor");
			await redis.del(`doctor${id}`);
			res.status(200).json(deletedDoctor.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}
}

module.exports = DoctorController;
