const axios = require("../helpers/axiosDoctor.js");
const Redis = require("redis");
const redis = new Redis();

class HistoryController {
	static async getHistory(req, res) {
		try {
			let historyStorage = await redis.get("history");
			if (historyStorage) {
				res.status(200).json(JSON.parse(historyData));
			} else {
				const historyData = await axios({
					method: "GET",
					url: "/history",
				});
				await redis.set(
					"history",
					JSON.stringify(historyData.data),
					"EX",
					86400
				);
				res.status(200).json(historyData.data);
			}
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async postHistory(req, res) {
		try {
			let { name, age, gender } = req.body;
			let createdHistory = await axios({
				method: "POST",
				url: "/history",
				data: {
					name,
					age,
					gender,
				},
			});
			await redis.del("history");
			res.status(201).json(createdHistory.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}

	static async patchStatusHistory(req, res) {
		try {
			let { status } = req.body;
			let { id } = req.params;
			const patchedStatus = await axios({
				method: "PATCH",
				url: `/history/${id}`,
				data: {
					status,
				},
			});
			await redis.del("history");
			res.status(201).json(patchedStatus.data);
		} catch (err) {
			res.status(err.response.status).json(err.response.data);
		}
	}
}
module.exports = HistoryController;
