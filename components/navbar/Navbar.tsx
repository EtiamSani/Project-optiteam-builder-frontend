import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#F1B92A] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">OptiTeam Builder <span>🤝</span></div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                À propos
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
