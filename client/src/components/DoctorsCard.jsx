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
    <div className="flex justify-center transition-transform transform hover:scale-110">
      <div className="p-3 new-bg rounded-xl max-w-lg hover:shadow">
        <div className="flex justify-between w-full">
          <div className="ml-2">
            <div className="p-3">
              <h3 className="text-2xl caslon">{doctor.username}</h3>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
              {doctor.status === "online" ? (
                <div className="avatar online">
                  <div className="rounded-full w-24 h-24">
                    <img src={doctor.photo} />
                  </div>
                </div>
              ) : (
                <div className="avatar offline">
                  <div className="rounded-full w-24 h-24">
                    <img src={doctor.photo} />
                  </div>
                </div>
              )}
              <div className="px-10 my-5">
                <span className="text-gray-400 block font-bold">{doctor.specialist}</span> <span className="font-bold text-black text-xl">{doctor.price ? (doctor.price).toLocaleString('id-ID', {style: 'currency',currency: 'IDR'}) : ""}</span>
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
  );
}
