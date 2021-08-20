export default function DoctorsList() {
  return (
    <article>
      <div className="my-5">
        <h1 class="mt-12 text-center text-4xl text-yellow-500 font-bold">
          Our Doctors List
        </h1>
        <h5 className="text-center mt-4 text-yellow-400">
          We are here to help you feel better
        </h5>
        <section class="container px-8 py-14 mx-auto">
          <div class="grid gap-10 mb-8 grid-cols-3">
            <div class="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ">
              <div class="flex flex-row">
                <div class="flex flex-col">
                  <img
                    alt="mountain"
                    class="w-45 rounded-full ring-2 ring-white border-4 border-yellow-500"
                    src="https://picsum.photos/seed/picsum/200"
                  />
                </div>
                <div class="flex flex-col justify-center ml-5">
                  <h4 class="text-xl font-semibold mb-2">Nama dokter</h4>
                  <p class="text-gray-800 font-semibold mb-3">
                    status : online
                  </p>
                  <p class="text-gray-800 mt-1">spesialis dokter</p>
                  <p class="text-gray-800 mt-1">harga dokter</p>
                </div>
              </div>
              <div class="flex mt-8 mb-5  flex-row justify-around">
                <div class="flex flex-col">
                  <div class="border border-yellow-500 text-grey px-5 py-2">
                    2 tahun
                  </div>
                </div>
                <div class="flex flex-col">
                  <button class="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40">
                    CHAT
                  </button>
                </div>
              </div>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ">
              <div class="flex flex-row">
                <div class="flex flex-col">
                  <img
                    alt="mountain"
                    class="w-45 rounded-full ring-2 ring-white border-4 border-yellow-500"
                    src="https://picsum.photos/seed/picsum/200"
                  />
                </div>

                <div class="flex flex-col justify-center ml-5">
                  <h4 class="text-xl font-semibold mb-2">Nama dokter</h4>
                  <p class="text-gray-800 font-semibold mb-3">
                    status : online
                  </p>
                  <p class="text-gray-800 mt-1">spesialis dokter</p>
                  <p class="text-gray-800 mt-1">harga dokter</p>
                </div>
              </div>

              <div class="flex mt-8 mb-5  flex-row justify-around">
                <div class="flex flex-col">
                  <div class="border border-yellow-500 text-grey px-5 py-2">
                    2 tahun
                  </div>
                </div>
                <div class="flex flex-col">
                  <button class="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40">
                    CHAT
                  </button>
                </div>
              </div>
            </div>
            <div class="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ">
              <div class="flex flex-row">
                <div class="flex flex-col">
                  <img
                    alt="mountain"
                    class="w-45 rounded-full ring-2 ring-white border-4 border-yellow-500"
                    src="https://picsum.photos/seed/picsum/200"
                  />
                </div>

                <div class="flex flex-col justify-center ml-5">
                  <h4 class="text-xl font-semibold mb-2">Nama dokter</h4>
                  <p class="text-gray-800 font-semibold mb-3">
                    status : online
                  </p>
                  <p class="text-gray-800 mt-1">spesialis dokter</p>
                  <p class="text-gray-800 mt-1">harga dokter</p>
                </div>
              </div>

              <div class="flex mt-8 mb-5  flex-row justify-around">
                <div class="flex flex-col">
                  <div class="border border-yellow-500 text-grey px-5 py-2">
                    2 tahun
                  </div>
                </div>
                <div class="flex flex-col">
                  <button class="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40">
                    CHAT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
