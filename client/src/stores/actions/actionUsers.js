import axios from "../../url/axios";

export const ActionTypeUser = {
	allUser: "ALL_USER",
	detailUser: "DETAIL_USER",
	loadingUser: "LOADING_USER",
	errorUser: "ERROR_USER",
	isLogin: "IS_LOGIN",
};

export const allUser = (payload) => {
	return {
		type: ActionTypeUser.allUser,
		payload: payload,
	};
};

export const detailUser = (payload) => {
	return {
		type: ActionTypeUser.detailUser,
		payload: payload,
	};
};

export const loadingUser = (payload) => {
	return {
		type: ActionTypeUser.loadingUser,
		payload: payload,
	};
};

export const errorUser = (payload) => {
	return {
		type: ActionTypeUser.errorUser,
		payload: payload,
	};
};

export const isLogin = (payload) => {
	return {
		type: ActionTypeUser.isLogin,
		payload: payload,
	};
};

export const fetchDataUser = () => async (dispatch) => {
	try {
		dispatch(loadingUser(true));
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.get("/user", {
			headers: { access_token },
		});
		dispatch(loadingUser(false));
		dispatch(allUser(data));
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const fetchDetailUser = (user) => async (dispatch) => {
	try {
		dispatch(loadingUser(true));
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.get(`/user/${user.id}`, {
			headers: { access_token },
		});
		dispatch(loadingUser(false));
		dispatch(detailUser(data));
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const regisUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/user/create", user, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const access_token = data.access_token;
		console.log(data, "data");
		localStorage.setItem("access_token", access_token);
		dispatch(isLogin(access_token));
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const loginUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/user/login", user);
		const access_token = data.access_token;
		localStorage.setItem("access_token", access_token);
		dispatch(isLogin(access_token));
	} catch (err) {
		dispatch(errorUser(err));
	}
};

export const updateUserImage = (user) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.patch(`/user/image/${user._id}`, user, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(fetchDataUser());
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const updateUser = (user) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.patch(`/user/${user._id}`, user, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(fetchDetailUser(user._id));
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const updatePayment = (user) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.patch(`/user/payment/${user._id}`, user, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(fetchDetailUser(user._id));
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};

export const removeUser = (user) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.delete(`/user/${user._id}`, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(fetchDataUser());
	} catch (err) {
		console.log(err);
		dispatch(errorUser(err));
	}
};
