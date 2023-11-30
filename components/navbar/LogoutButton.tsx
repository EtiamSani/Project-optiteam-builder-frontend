"use client"
import { Button } from "@/components/ui/button"


function LogoutButton() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "http://localhost:3000";
      };

      const ifToken = () => {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        console.log(token, 'token dans nav')
        return token;
     } 

     return (
        ifToken() ? <Button className='text-white' onClick={handleLogout}>Déconnecter</Button> : null
      );
    }

export default LogoutButton
