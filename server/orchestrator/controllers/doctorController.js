const axios = require("../helpers/axiosDoctor.js");

class DoctorController {
	static async getAllDoctors(req, res, next) {
		try {
			let allDoctorsList = await axios({
				method: "GET",
				url: "/doctor",
			});
			// return all doctors list
		} catch (err) {
			console.log(err);
		}
	}

	static async getDoctorById(req, res, next) {
		try {
			let { id } = req.params;
			let getDoctor = await axios({
				method: "GET",
				url: `/doctor/${id}`,
			});
			// return doctor object
		} catch (err) {
			console.log(err);
		}
	}

	static async registerDoctor(req, res, next) {
		try {
			let { access_token } = req.headers;
			let { email, username, password, specialist, address, price } =
				req.body;
			let registeredDoctor = await axios({
				method: "POST",
				url: "/doctor",
				data: {
					email,
					username,
					password,
					specialist,
					address,
					price,
					photo: req.file,
				},
				headers: {
					access_token,
				},
			});
			// return doctor
		} catch (err) {
			console.log(err);
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
			// return access token
		} catch (err) {
			console.log(err);
		}
	}

	static async updateDoctor(req, res, next) {
		try {
			let { id } = req.params;
			let { email, username, password, specialist, address, price } =
				req.body;
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
					photo: req.file,
				},
			});
			// return updated doctor data
		} catch (err) {
			console.log(err);
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
			// return updated doctor status
		} catch (err) {
			console.log(err);
		}
	}

	static async updatePhoto(req, res, next) {
		try {
			let { id } = req.params;
			let updatedPhoto = await axios({
				method: "PATCH",
				url: `/doctor/photo/${id}`,
				data: {
					photo: req.file,
				},
			});
			// return updated doctor data
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteDoctor(req, res, next) {
		try {
			let { id } = req.params;
			let deletedDoctor = await axios({
				method: "DELETE",
				url: `/doctor/${id}`,
			});
			// return success string
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = DoctorController;
