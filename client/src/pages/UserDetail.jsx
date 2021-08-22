export default function UserDetail() {
  return (
    <div className="containers mx-40 my-20 h-screen">
      <div className="grid grid-cols-4 bg-white gap-2 justify-center h-3/4 p-4 rounded-xl">
        <div className="col-span-1 shadow-xl ">
                <div className="flex w-full h-full relative">
                    <img src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png" className="w-44 h-44 m-auto" alt=""/>
                </div>
        </div>
        <div className="col-span-3 shadow-xl p-4 space-y-2">
                  <h1 className="text-center text-2xl mb-10 font-semibold">User Profile</h1>
            <div className="flex justify-center">
                  <div className="flex flex-col space-y-2">
                        <p className="pb-1">Email :</p>
                        <p className="pb-1">Name :</p>
                        <p className="pb-2">Spesialis :</p>
                        <p className="pb-2">Tinggi badan :</p>
                        <p className="pb-1">Berat badan :</p>
                        <p className="pb-2">Umur :</p>
                        <p className="pb-2">Gender :</p>
                        <p className="pb-1">No. Telp :</p>
                        <p className="pb-2">Payment :</p>
                  </div>
                  <div className="flex flex-col ml-10 space-y-3">
                        <div className="border rounded-xl py-0 px-2">
                              katemaderson@gmail.com
                        </div>
                        <div className="border rounded-xl px-2">
                              Kate Maderson
                        </div>
                        <div className="border rounded-xl px-2">
                              Dr.Umum
                        </div>
                        <div className="border rounded-xl px-2">
                              156 cm
                        </div>
                        <div className="border rounded-xl px-2">
                              56 kg
                        </div>
                        <div className="border rounded-xl px-2">
                              56 tahun
                        </div>
                        <div className="border rounded-xl px-2">
                              Perempuan
                        </div>
                        <div className="border rounded-xl px-2">
                              0812731283
                        </div>
                         <div className="border rounded-xl px-2">
                              6386127361236
                        </div>        
                  </div>
            </div>
        </div>
    </div>
    </div>
  );
}
