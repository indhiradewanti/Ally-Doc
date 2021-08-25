import axios from "../../url/axios.js";

export const ActionTypeUserDoctor = {
	allUserDoctor: "ALL_USER_DOCTOR",
	filterUserDoctor: "FILTER_USER_DOCTOR",
	isLogin: "IS_LOGIN_DOCTOR_USER",
};

// export const allChat = (payload) => {
//     return {
//         type: ActionTypeChat.allChat,
//         payload
//     }
// }

export const filter = (payload) => {
	return {
		type: ActionTypeUserDoctor.filterUserDoctor,
		payload,
	};
};

export const doctorHistory = (payload) => (dispatch) => {
	dispatch({
		type: ActionTypeUserDoctor.allUserDoctor,
		payload,
	});
};

export const userDoctor = (payload) => async (dispatch) => {
	try {
		const id = localStorage.getItem("UserId");
		const access_token = localStorage.getItem("access_token");
		const { data: user } = await axios.get(`/user/${id}`, {
			headers: { access_token },
		});
		const { data: doctor } = await axios.get(`/doctor/${payload}`);
		const obj = {
			userId: id,
			userName: user.username,
			userGender: user.gender,
			userPhoto: user.display_picture,
			doctorId: payload,
			doctorName: doctor.username,
			doctorPhoto: doctor.photo,
			doctorSpecialist: doctor.specialist,
		};
		console.log(obj, "ini obj");
		let patientHistory = await axios({
			method: "POST",
			url: "/history",
			data: obj,
		});
		dispatch({
			type: ActionTypeUserDoctor.allUserDoctor,
			payload: obj,
		});
	} catch (err) {
		console.log(err);
	}
};

// export const allUserDoctors = (payload) => async (dispatch) => {
//     try {
//         dispatch({
//             type: ActionTypeUserDoctor.allUserDoctor,
//             payload,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const filter = (payload) => async (dispatch) => {
//     try {
//         dispatch({
//             type: ActionTypeUserDoctor.filterUserDoctor,
//             payload,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

export const isLogin = (payload) => {
	console.log(payload);
	return {
		type: ActionTypeUserDoctor.isLogin,
		payload,
	};
};

export const loginDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.post(`/doctor/login`, doctor);
		console.log(data);
		localStorage.setItem("DoctorId", data.id);
		localStorage.setItem("access_token", data.access_token);
		dispatch(isLogin("doctor"));
	} catch (err) {
		console.log(err);
	}
};

export const loginUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/user/login", user);
		const access_token = data.access_token;
		localStorage.setItem("UserId", data.id);
		localStorage.setItem("access_token", access_token);
		// dispatch(isLogin(access_token))
		dispatch(isLogin("user"));
	} catch (err) {
		console.log(err);
	}
};

export const regisUser = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post("/user/create", user, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const access_token = data.access_token;
		console.log(data, "data");
		localStorage.setItem("UserId", data.id);
		localStorage.setItem("access_token", access_token);
		dispatch(isLogin("user"));
	} catch (err) {
		console.log(err);
	}
};
