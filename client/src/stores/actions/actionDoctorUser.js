import axios from "../../url/axios.js";

export const ActionTypeUserDoctor = {
	allUserDoctor: "ALL_USER_DOCTOR",
	filterUserDoctor: "FILTER_USER_DOCTOR",
};

// export const allChat = (payload) => {
//     return {
//         type: ActionTypeChat.allChat,
//         payload
//     }
// }

// export const filter = (payload) => {
//     return {
//         type: ActionTypeDoctor.filterChat,
//         payload
//     }
// }

// export const userDoctor = (payload) => async (dispatch) => {
//     try {
//         const id = localStorage.getItem('UserId')
//         const {data} = await axios.get(`/user/${id}`)
//         console.log(data)
//         const obj = {
//             UserId: id,
//             UserName: data.username,
//             UserGender: data.gender,
//             UserPhoto: data.display_picture,
//             DoctorId: payload._id,
//             DoctorName: payload.username,
//             DoctorPhoto: payload.photo,
//             DoctorSpecialist: payload.specialist
//         }
//         dispatch(allChat(obj))
//     } catch (err) {
//         console.log(err)
//     }
// }

export const allUserDoctors = (payload) => async (dispatch) => {
	try {
		dispatch({
			type: ActionTypeUserDoctor.allUserDoctor,
			payload,
		});
	} catch (err) {
		console.log(err);
	}
};

export const filter = (payload) => async (dispatch) => {
	try {
		dispatch({
			type: ActionTypeUserDoctor.filterUserDoctor,
			payload,
		});
	} catch (err) {
		console.log(err);
	}
};
