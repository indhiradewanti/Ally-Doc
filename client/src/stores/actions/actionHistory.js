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

export const fetchDataHistory = (access_token) => async (dispatch) => {
	try {
		dispatch(loadingHistory(true));
		const patientData = await axios({
			method: "GET",
			url: "/history",
			headers: {
				access_token,
			},
		});
		dispatch(loadingHistory(false));
		dispatch(allHistory(patientData.data));
	} catch (err) {
		console.log(err);
		dispatch(errorHistory(err));
	}
};

export const createDataHistory = (historyData) => async (dispatch) => {
	try {
		const { data } = await axios.post(`/history`, historyData);
		console.log(data);
		dispatch(fetchDataHistory());
	} catch (err) {
		console.log(err);
	}
};

export const patchStatusHistory = (history) => async (dispatch) => {
	try {
		const access_token = localStorage.getItem("access_token");
		const { data } = await axios.patch(
			`/history/${history._id}`,
			{
				status: "completed",
			},
			{ headers: { access_token } }
		);
		console.log(data);
		dispatch(fetchDataHistory());
	} catch (err) {
		console.log(err);
	}
};
