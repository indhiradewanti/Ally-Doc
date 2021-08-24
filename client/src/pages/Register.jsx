import RegisterForm from "../components/registerForm";

export default function Register() {
  return (
    <div className="bg-no-repeat bg-cover bg-center relative login-bg-image">
      <div className="absolute login-color opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen mx-0 flex flex-row justify-center">
        <div className="flex justify-center self-center z-10 w-1/3 my-14">
          <div className="p-12 bg-white mx-auto rounded-2xl w-full">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-center text-gray-800">
                Register{" "}
              </h3>
              <p className="text-gray-500 text-center">
                Fill the forms below.
              </p>
            </div>
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
