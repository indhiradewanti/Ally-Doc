export default function DoctorDetail() {
  return (
    <div className="containers mx-40 my-30">
      <div className="shadow-xl mt-40">
        <div className="flex flex-row justify-center items-center">
            <div>
                <img src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png" className="w-44 h-44 m-auto" alt=""/>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex mt-10">
                <div className="flex-col">
                  Name :
                </div>
                <div className="flex-col ml-5">
                      Cut Aisyah Ilmy
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex">
                <div className="flex-col">
                      Spesialis : 
                </div>
                <div className="flex-col ml-5">
                      Dokter umum
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex">
                <div className="flex-col">
                      Pengalaman : 
                </div>
                <div className="flex-col ml-5">
                      2 tahun
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex mb-5">
                <div className="flex-col">
                      Alamat praktek : 
                </div>
                <div className="flex-col ml-5">
                      Jalan hacktiv8 bulan purnama blok sapphire 88
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
