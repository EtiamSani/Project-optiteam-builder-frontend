import { fetchEmployee } from "@/utils"
import EmployeeSection from "./EmployeeSection"
import { EmployeeProps } from "@/types";


export default async function Home() {
  const AllEmployee = await fetchEmployee();
  console.log(AllEmployee)
  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1>
      </div> 
      {AllEmployee.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee}/>
      ))}
      
        
    </main>
  )
}
