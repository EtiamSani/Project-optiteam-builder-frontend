
"use client"
import { useEffect, useState } from "react";
import DropDrownMenu from "./DropDrownMenu";
import Image from 'next/image'
import GetStartedButton from "./GetStartedButton";
import Link from "next/link";

const Navbar = () => {
 
 
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);
 

  return (
    <nav className="bg-[#f0c454] p-6 flex ">
        <div className="flex content-center items-center space-x-[1350px]">
              <div className="text-white font-bold text-2xl mr-10 cursor-pointer"> <Link href="/">OptiTeam Builder.</Link></div>
              <div className="mr-[90px] cursor-pointer">
                {token ?  <DropDrownMenu/> : <GetStartedButton/>}
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
