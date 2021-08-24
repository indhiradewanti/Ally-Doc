const axios = require("../helpers/axiosDoctor.js");
const Redis = require("ioredis");
const redis = new Redis({
	host: "redis-14354.c61.us-east-1-3.ec2.cloud.redislabs.com",
	port: 14354,
	password: "rafipratama",
});

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
					headers: {
						access_token: req.headers.access_token,
					},
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
				headers: {
					access_token: req.headers.access_token,
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
