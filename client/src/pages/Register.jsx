import RegisterForm from "../components/registerForm";
import bg from "../assets/bg.jpg";

export default function Register() {
  return (
    <div className="bg-no-repeat backdrop-blur-3xl bg-cover bg-center relative flex h-full items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className=" bg-base-300 opacity-10 inset-0 z-0"></div>
      <div className="p-12  mx-auto rounded-2xl w-100 grid bg-white  shadow-xl w-11/12 md:w-9/12 lg:w-1/2 mt-40 mb-20">
        <div className="w-full pt-1 pb-5">
          <div className="new-bg text-white overflow-hidden rounded-full w-20 h-20 -mt-24 mx-auto shadow-lg flex justify-center items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl vogue">Register</h1>
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
