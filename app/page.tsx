import { fetchEmployee } from "@/utils"
import EmployeeSection from "./EmployeeSection"
import { EmployeeProps } from "@/types";
import Buttons from "./Buttons";


export default async function Home() {
  const AllEmployee = await fetchEmployee();
  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1>
      </div> 
      <Buttons/>
      {AllEmployee.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee}/>
      ))}
      
        
    </main>
  )
}
