export default function DoctorDetail() {
  return (
    <div className="containers mx-40 my-30">
      <div class="shadow-xl mt-40">
        <div class="flex flex-row justify-center items-center">
            <div>
                <img src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png" class="w-44 h-44 m-auto" alt=""/>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div class="flex mt-10">
                <div class="flex-col">
                  Name :
                </div>
                <div class="flex-col ml-5">
                      Cut Aisyah Ilmy
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div class="flex">
                <div class="flex-col">
                      Spesialis : 
                </div>
                <div class="flex-col ml-5">
                      Dokter umum
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div class="flex">
                <div class="flex-col">
                      Pengalaman : 
                </div>
                <div class="flex-col ml-5">
                      2 tahun
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div class="flex mb-5">
                <div class="flex-col">
                      Alamat praktek : 
                </div>
                <div class="flex-col ml-5">
                      Jalan hacktiv8 bulan purnama blok sapphire 88
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
