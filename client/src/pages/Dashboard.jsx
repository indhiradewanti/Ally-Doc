import { Icon } from "@iconify/react";
import "../App.css";

export default function Dashboard() {
  return (
    <div>
      <div className="w-full carousel">
        <div id="slide1" className="relative w-full carousel-item">
          <img src="https://demo.joomlashine.com/joomla-templates/jsn_hospital/pro/hospital/images/joomlashine/sample/homepage/background-img.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="/#slide3" className="btn btn-circle mt-10">
              ❮
            </a>
            <div className="text-left text-gray-700 -ml-80">
              <h1 className="font-bold text-left text-4xl she -mt-10">WELCOME TO</h1>
              <h1 className="font-bold text-left text-4xl she mt-5">ALLYDOC</h1>
              <h2 className="text-left text-4xl mt-10 caslon">Connect securely anytime, <br/>anywhere with 24/7 doctors available just for you</h2>
            </div>
            <a href="/#slide2" className="btn btn-circle mt-10">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="relative w-full carousel-item">
          <img src="https://demo.joomlashine.com/joomla-templates/jsn_hospital/pro/hospital/images/joomlashine/sample/homepage/s2.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="/#slide1" className="btn btn-circle mt-10">
              ❮
            </a>
            <div className="mx-4 text-center text-white">
              <h1 className="font-bold text-6xl mb-4 cigra">FRIENDLY DOCTORS</h1>
              <h2 className=" text-4xl mb-12 caslon">and highly specialized</h2>
            </div>
            <a href="/#slide3" className="btn btn-circle mt-10">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="relative w-full carousel-item">
          <img src="https://demo.joomlashine.com/joomla-templates/jsn_hospital/pro/hospital/images/joomlashine/sample/homepage/s1.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="/#slide2" className="btn btn-circle mt-10 -mr-20">
              ❮
            </a>
            <div className="text-left text-gray-700 -ml-96">
              <h1 className="font-bold text-left text-6xl uppercase cigra">More than 100 <br/> medical doctors</h1>
              <h2 className="text-left text-4xl caslon">And professors are highly qualified doctors</h2>
            </div>
            <a href="/#slide1" className="btn btn-circle mt-10">
              ❯
            </a>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container -mt-60 mx-10">
          <div className="flex flex-wrap">
            <div className="p-3 -mb-20 lg:w-1/3">
              <div className="h-full bg-brown bg-opacity-75 px-8 pt-16 rounded-lg overflow-hidden text-center relative">
                <h1 className="title-font font-bold text-4xl text-white mb-3 meg">Why Choose AllyDoc?</h1>
                <p className="leading-relaxed mb-3">
                  AllyDoc is a Telemedicine platform where users can get medical advice from doctors. We stringently verify our online doctors to ensure they are fully licensed so that the care we provide will always be of the highest
                  quality. Team-AllyDoc consists of eminent doctors, researchers and programmers who work round the clock to innovate, create and implement the best web technologies for the use of doctors, users and hospitals.
                </p>
              </div>
            </div>
            <div className="p-2 lg:h-80 lg:w-1/3 mt-20">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <div className="flex flex-row justify-center">
                  <h1 className="title-font sm:text-2xl text-xl mx-auto font-medium text-gray-900 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </h1>
                </div>
                <p className="leading-relaxed mb-3">Our Live Chat feature allows you to “chat” with our qualified and fully registered Doctors, Pharmacists and Nutritionists anytime, anywhere</p>
              </div>
            </div>
            <div className="p-2 lg:h-80 lg:w-1/3 mt-20 ">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <div className="flex flex-row justify-center">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    <Icon icon="mdi:stethoscope" className="h-20 w-20" />
                  </h1>
                </div>
                <p className="leading-relaxed mb-3">Advice from best doctors and top medical experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-xl mx-auto text-center mt-40">
        <div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">Services</h2>
        <p className="font-light text-gray-600 mb-6 leading-relaxed">you can choose whatever services you like</p>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative bd-nude border-2">
                <div className="text-black  absolute my-auto w-full h-full object-cover object-center items-center grid justify-items-stretch">
                  <div className="tracking-widest text-sm title-font font-medium text-nude justify-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    <p className="leading-relaxed mt-10">Chat</p>
                  </div>
                </div>
                <div className="px-8 py-10 relative z-10 w-full border-4 bd-nude1 bg-nude1 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-xl title-font font-medium text-white mb-1">CHATTING</h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3 text-nude">Shooting Stars</h1>
                  <p className="leading-relaxed text-white">Start chatting with our healthcare professionals and they will provide you with advice to your medical condition .</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative bd-nude border-2">
                <div className="text-black  absolute my-auto w-full h-full object-cover object-center items-center grid justify-items-stretch">
                  <div className="tracking-widest text-sm title-font font-medium text-nude justify-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p className="leading-relaxed mt-10">Call</p>
                  </div>
                </div>
                <div className="px-8 py-10 relative z-10 w-full border-4 bd-nude1 bg-nude1 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-xl title-font font-medium text-white mb-1">CALLING</h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3 text-nude">Shooting Stars</h1>
                  <p className="leading-relaxed text-white">Start chatting with our healthcare professionals and they will provide you with advice to your medical condition .</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex flex-wrap relative bd-nude border-2">
                <div className="text-black  absolute my-auto w-full h-full object-cover object-center items-center grid justify-items-stretch">
                  <div className="tracking-widest text-sm title-font font-medium text-nude justify-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="leading-relaxed mt-10">Video call</p>
                  </div>
                </div>
                <div className="px-8 py-10 relative z-10 w-full border-4 bd-nude1 bg-nude1 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-xl title-font font-medium text-white mb-1">VIDEO CALLS</h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3 text-nude">Shooting Stars</h1>
                  <p className="leading-relaxed text-white">Start video calling with our healthcare professionals and they will provide you with advice to your medical condition .</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
