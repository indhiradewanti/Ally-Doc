import "../App.css";
import logo from "../assets/logo.PNG";

export default function Navbar() {
  return (
    <header class="min-h-screen bg-gray-100">
      <nav class="flex items-center justify-between p-6 h-20 bg-white shadow-xl">
        <div class="hover:cursor-pointer hover:shadow-lg">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <ul>
          <li class="space-x-5 text-xl">
            <a href="#" class="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold">
              Home
            </a>
            <a href="#" class="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold">
              About
            </a>
            <a href="#" class="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold">
              Services
            </a>
            <a href="#" class="hidden sm:inline-block text-gray-700 hover:text-indigo-700 vogue font-bold">
              Products
            </a>
          </li>
          <div class="sm:hidden space-y-1 hover:cursor-pointer">
            <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
            <span class="w-10 h-1 bg-gray-600 rounded-full block"></span>
          </div>
        </ul>
      </nav>
    </header>
  );
}
