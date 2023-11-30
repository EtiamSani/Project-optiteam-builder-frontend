
"use client"
import DropDrownMenu from "./DropDrownMenu";

const Navbar = () => {
  const ifToken = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    return token;
 } 
 

  return (
    <nav className="bg-[#F1B92A] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">OptiTeam Builder <span>🤝</span></div>
          {ifToken() ?  <DropDrownMenu/> : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
