export default function Login() {
  return (
    <div className="bg-no-repeat bg-cover bg-center relative login-bg-image">
      <div className="absolute login-color opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen mx-0 flex flex-row justify-center">
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-center text-gray-800">
                Sign In{" "}
              </h3>
              <p className="text-gray-500 text-center">
                Please sign in to your account.
              </p>
            </div>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="mail@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <p>
                Don't have any accounts yet ?{" "}
                <span className="text-yellow-400 hover:text-yellow-600 ">
                  <a href="#">Register here !</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
