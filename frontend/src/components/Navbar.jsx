/* import { NavLink } from "react-router-dom"; */

const Navbar = (props) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 px-10 py-4">
      <div className="flex flex-wrap items-center justify-between mb-10">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/src/assets/aisensum.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AiSENSUM
          </span>
        </a>
      </div>
      {props.children}
    </nav>
  );
};

export default Navbar;
