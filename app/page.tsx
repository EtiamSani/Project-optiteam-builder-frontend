

import { Button } from "@/components/ui/button"
import EmployeeSection from "./EmployeeSection"




export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1 >Mon équipe</h1>
      </div> 
      
      <EmployeeSection/>
      
        
    </main>
  )
}
