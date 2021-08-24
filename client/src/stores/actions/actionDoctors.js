import axios from "../../url/axios";

export const ActionTypeDoctor = {
	allDoctor: "ALL_DOCTOR",
	detailDoctor: "DETAIL_DOCTOR",
	createDoctor: "CREATE_DOCTOR",
	removeDoctor: "REMOVE_DOCTOR",
	updateDoctor: "UPDATE_DOCTOR",
	patchStatus: "PATCH_STATUS_DOCTOR",
	patchPhoto: "PATCH_PHOTO_DOCTOR",
	errorDoctor: "ERROR_DOCTOR",
	loadingDoctor: "LOADING_DOCTOR",
	loggedIn: "LOGGED_IN_DOCTOR",
};

export const allDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.allDoctor,
		payload: payload,
	};
};

export const detailDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.detailDoctor,
		payload: payload,
	};
};

export const errorDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.errorDoctor,
		payload: payload,
	};
};

export const loadingDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.loadingDoctor,
		payload: payload,
	};
};

export const updateDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.updateDoctor,
		payload: payload,
	};
};

export const patchStatusDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.patchStatusDoctor,
		payload: payload,
	};
};

export const patchPhotoDoctor = (payload) => {
	return {
		type: ActionTypeDoctor.patchPhotoDoctor,
		payload: payload,
	};
};

export const loggedIn = (payload) => {
	return {
		type: ActionTypeDoctor.loggedIn,
		payload: payload,
	};
};

export const fetchDataDoctor = () => async (dispatch) => {
	try {
		dispatch(loadingDoctor(true));
		const { data } = await axios.get("/doctor");
		console.log(data);
		dispatch(allDoctor(data));
	} catch (err) {
		dispatch(errorDoctor);
	} finally {
		dispatch(loadingDoctor(false));
	}
};

export const fetchDetailDoctor = (id) => async (dispatch) => {
	try {
		dispatch(loadingDoctor(true));
		const { data } = await axios.get(`/doctor/${id}`);
		dispatch(loadingDoctor(false));
		dispatch(detailDoctor(data));
	} catch (err) {
		console.log(err);
		dispatch(errorDoctor);
	}
};

export const createNewDoctor = (doctor) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.post(`/doctor/register`, doctor, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(fetchDataDoctor());
	} catch (err) {
		console.log(err);
	}
};

export const loginDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.post(`/doctor/login`, doctor);
		console.log(data);
		localStorage.setItem("access_token", data.access_token);
	} catch (err) {
		console.log(err);
	}
};

export const updateRecentDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.put(`/doctor/${doctor._id}`, doctor);
		console.log(data);
		dispatch(updateDoctor(data));
	} catch (err) {
		console.log(err);
	}
};

export const updateStatusDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.patch(
			`/doctor/status/${doctor._id}`,
			doctor
		);
		console.log(data);
		dispatch(patchStatusDoctor(data));
	} catch (err) {
		console.log(err);
	}
};

export const updatePhotoDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.patch(
			`/doctor/photo/${doctor._id}`,
			doctor
		);
		dispatch(patchPhotoDoctor(data));
	} catch (err) {
		console.log(err);
	}
};

export const removeRecentDoctor = (doctor) => async (dispatch) => {
	try {
		const { data } = await axios.delete(`/doctor/${doctor._id}`);
		console.log(data);
		dispatch(fetchDataDoctor());
	} catch (err) {
		console.log(err);
	}
};
