export default function ProfileUser({detailUser}) {
  return (
    <>
      <h1 className="text-center text-2xl mb-10 font-semibold">User Profile</h1>
      <div className="flex justify-center">
        <div className="flex flex-col space-y-2">
          <p className="pb-1">Email :</p>
          <p className="pb-1">Name :</p>
          <p className="pb-2">Tinggi badan :</p>
          <p className="pb-1">Berat badan :</p>
          <p className="pb-2">Umur :</p>
          <p className="pb-2">Gender :</p>
          <p className="pb-1">No. Telp :</p>
        </div>
        <div className="flex flex-col ml-10 space-y-3">
          <div className="border rounded-xl py-0 px-2">{detailUser.email}</div>
          <div className="border rounded-xl px-2">{detailUser.username}</div>
          <div className="border rounded-xl px-2">{detailUser.height}</div>
          <div className="border rounded-xl px-2">{detailUser.weight}</div>
          <div className="border rounded-xl px-2">{detailUser.age}</div>
          <div className="border rounded-xl px-2">{detailUser.gender}</div>
          <div className="border rounded-xl px-2">
            {detailUser.phone_number}
          </div>
        </div>
      </div>
    </>
  );
}
