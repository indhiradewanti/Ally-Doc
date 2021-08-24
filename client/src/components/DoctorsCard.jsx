import { useHistory } from "react-router";

export default function DoctorCard({ doctor }) {
  const history = useHistory();

  const toDoctorDetail = () => {
    history.push(`/doctors/${doctor._id}`);
  };

  const toChat = () => {
    history.push(`/chat`);
  };

  return (
    <div class="flex justify-center transition-transform transform hover:scale-110">
      <div class="p-3 new-bg rounded-xl max-w-lg hover:shadow">
        <div class="flex justify-between w-full">
          <div class="ml-2">
            <div class="p-3">
              <h3 class="text-2xl caslon">{doctor.username}</h3>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              {doctor.status === "online" ? (
                <div class="avatar online">
                  <div class="rounded-full w-24 h-24">
                    <img src={doctor.photo} />
                  </div>
                </div>
              ) : (
                <div class="avatar offline">
                  <div class="rounded-full w-24 h-24">
                    <img src={doctor.photo} />
                  </div>
                </div>
              )}
              <div class="px-10 my-5">
                <span class="text-gray-400 block font-bold">{doctor.specialist}</span> <span class="font-bold text-black text-xl">{doctor.price ? (doctor.price).toLocaleString('id-ID', {style: 'currency',currency: 'IDR'}) : ""}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between">
            <button onClick={toDoctorDetail} className="btn btn-outline1 hidden sm:inline-block text-white transition-transform transform hover:scale-110 hover:text-indigo-700 w-32 mt-5 vogue">Details</button>
            <button onClick={toChat} className="btn btn-outline1 hidden sm:inline-block text-white transition-transform transform hover:scale-110 hover:text-indigo-700 w-32 mt-5 vogue">View Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ">
    //   <div className="flex flex-row">
    //     <div className="flex flex-col">
    //       <img
    //         alt="mountain"
    //         className="w-40 rounded-full ring-2 ring-white border-4 border-yellow-500"
    //         src={doctor.photo}
    //       />
    //     </div>
    //     <div className="flex flex-col justify-center ml-5">
    //       <h4 className="text-xl text-gray-800 font-semibold mb-2">{doctor.username}</h4>
    //       <p className="text-gray-800 font-semibold mb-3">
    //         status : {doctor.status}
    //       </p>
    //       <p className="text-gray-800 mt-1">{doctor.specialist}</p>
    //       <p className="text-gray-800 mt-1">{doctor.price}</p>
    //     </div>
    //   </div>
    //   <div className="flex mt-8 mb-5  flex-row justify-around">
    //     <div className="flex flex-col">
    //       <button onClick={toDoctorDetail} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40">
    //         Doctor Detail
    //       </button>
    //     </div>
    //     <div className="flex flex-col">
    //       <button onClick={toChat} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-40">
    //         CHAT
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
