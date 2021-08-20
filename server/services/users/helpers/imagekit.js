const axios = require("axios");
const formData = require("form-data");

const apiKey = Buffer.from(process.env.IMAGE_KIT_PRIVATE_KEY + `:`).toString(
	"base64"
);

const instanceAxios = axios.create({
	baseURL: `${process.env.IMAGE_KIT_BASE_URL}`,
	headers: {
		Authorization: `Basic ${apiKey}`,
	},
});

let uploadImage = async (fileBuffer, filename) => {
	let fileData = fileBuffer.toString("base64");

	const formDataImageKit = new formData();

	formDataImageKit.append("fileName", filename);
	formDataImageKit.append("file", fileData);

	let uploaded = await instanceAxios({
		method: "POST",
		url: "/files/upload",
		data: formDataImageKit,
		headers: {
			...formDataImageKit.getHeaders(),
		},
	});

	return uploaded.data;
};

module.exports = uploadImage;
