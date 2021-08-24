import axios from "../../url/axios";

export const regisAdmin = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/admin/register", user);
		localStorage.setItem("access_token", data.access_token);
	} catch (err) {
		console.log(err);
	}
};

export const loginAdmin = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/admin/login", {
			email: user.email,
			password: user.password,
		});
		localStorage.setItem("access_token", data.access_token);
	} catch (err) {
		console.log(err);
	}
};
