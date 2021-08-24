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

export const userDoctor = (payload) => async (dispatch) => {
    try {
        const id = localStorage.getItem('UserId')
        const {data: user} = await axios.get(`/user/${id}`)
        const {data: doctor} = await axios.get(`/user/${payload}`)
        console.log(doctor)
        const obj = {
            UserId: id,
            UserName: user.username,
            UserGender: user.gender,
            UserPhoto: user.display_picture,
            DoctorId: payload,
            DoctorName: doctor.username,
            DoctorPhoto: doctor.photo,
            DoctorSpecialist: doctor.specialist
        }
        console.log(obj)
        dispatch(allUserDoctors(obj))
    } catch (err) {
        console.log(err)
    }
}

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