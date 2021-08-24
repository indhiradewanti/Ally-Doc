import { useHistory } from "react-router";

export default function DoctorCard({ doctor }) {
  const history = useHistory();

  const toDoctorDetail = () => {
    history.push(`/doctors/${doctor._id}`);
  };

  const toChat = () => {
    history.push(`/payment/${doctor._id}`);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <img
            alt="mountain"
            className="w-40 rounded-full ring-2 ring-white border-4 border-yellow-500"
            src={doctor.photo}
          />
        </div>
        <div className="flex flex-col justify-center ml-5">
          <h4 className="text-xl text-gray-800 font-semibold mb-2">
            {doctor.username}
          </h4>
          <p className="text-gray-800 font-semibold mb-3">
            status : {doctor.status}
          </p>
          <p className="text-gray-800 mt-1">{doctor.specialist}</p>
          <p className="text-gray-800 mt-1">{doctor.price}</p>
        </div>
      </div>
      <div className="flex mt-8 mb-5  flex-row justify-around">
        <div className="flex flex-col">
          <button
            onClick={toDoctorDetail}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40"
          >
            Doctor Detail
          </button>
        </div>
        <div className="flex flex-col">
          <button
            onClick={toChat}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-40"
          >
            CHAT
          </button>
        </div>
      </div>
    </div>
  );
}
