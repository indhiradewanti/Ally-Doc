const axios = require("../helpers/axiosDoctor.js");
const uploadImage = require("../helpers/imagekit.js");

class DoctorController {
	static async getAllDoctors(req, res, next) {
		try {
			let allDoctorsList = await axios({
				method: "GET",
				url: "/doctor",
			});
			res.status(200).json(allDoctorsList.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async getDoctorById(req, res, next) {
		try {
			let { id } = req.params;
			let { access_token } = req.headers;
			let getDoctor = await axios({
				method: "GET",
				url: `/doctor/${id}`,
				headers: {
					access_token,
				},
			});
			res.status(200).json(getDoctor.data);
		} catch (err) {
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
			let { email, username, password, specialist, address, price } =
				req.body;
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
					password,
					specialist,
					address,
					price,
					photo: uploadedImage.url,
				},
			});
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
			res.status(201).json(updatedPhoto.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async deleteDoctor(req, res, next) {
		try {
			let { id } = req.params;
			let deletedDoctor = await axios({
				method: "DELETE",
				url: `/doctor/${id}`,
			});
			res.status(200).json(deletedDoctor.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}
}

module.exports = DoctorController;
