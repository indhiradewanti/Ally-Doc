import axios from "../../url/axios.js";

export const ActionTypeHistory = {
	allHistory: "ALL_HISTORY",
	patchHistory: "PATCH_HISTORY",
	loadingHistory: "LOADING_HISTORY",
	errorHistory: "ERROR_HISTORY",
};

export const allHistory = (payload) => {
	return {
		type: ActionTypeHistory.allHistory,
		payload,
	};
};

export const loadingHistory = (payload) => {
	return {
		type: ActionTypeHistory.loadingHistory,
		payload,
	};
};

export const errorHistory = (payload) => {
	return {
		type: ActionTypeHistory.errorHistory,
		payload,
	};
};

export const fetchDataHistory = () => async (dispatch) => {
	try {
		dispatch(loadingHistory(true));
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.get(`/history`, {
			headers: { access_token },
		});
		console.log(data);
		dispatch(loadingHistory(false));
		dispatch(allHistory(data));
	} catch (err) {
		console.log(err);
		dispatch(errorHistory(err));
	}
};

export const createDataHistory = () => async (dispatch) => {
	try {
		const { data } = await axios.post(`/history`);
		console.log(data);
		dispatch(fetchDataHistory());
	} catch (err) {
		console.log(err);
	}
};

export const patchStatusHistory = (history) => async (dispatch) => {
	try {
		const { data } = await axios.patch(`/history/${history._id}`);
		console.log(data);
		dispatch(fetchDataHistory());
	} catch (err) {
		console.log(err);
	}
};
