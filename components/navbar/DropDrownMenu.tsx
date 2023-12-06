
"use client"
import { Button } from "@/components/ui/button"
import { CgMenuMotion } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRef } from "react";
import { IoDiamondSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";


const DropDrownMenu = () => {
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000";
  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {/* <Button variant="outline">Open</Button> */}
      <div ref={dropdownRef}>
      <CgMenuMotion className='text-5xl text-white'/>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          Paramètre équipe <IoDiamondSharp className='ml-2 text-blue-500' />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="/home">
        <DropdownMenuItem>
          Mon équipe
        </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          New Team
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="ml-8">
        <Button onClick={handleLogout}>
        Déconnection
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DropDrownMenu