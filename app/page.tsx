"use client"
import { deleteEmployee,fetchEmployee, fetchTeamWithEmployees } from "@/utils"
import EmployeeSection from "./EmployeeSection"
import { EmployeeProps } from "@/types";
import Buttons from "./Buttons";
import { useEffect, useState } from "react";
import TeamSection from "./TeamSection";

  
export default function Home() {
  const [allEmployees, setAllEmployees] = useState<EmployeeProps[]>([]);
  const [teamWithEmployees, setTeamWithEmployees] = useState<EmployeeProps[]>([]);

  const teamId = 1
  useEffect(() => {
    const fetchData = async (teamId : number) => {
      try {
        const employees = await fetchEmployee();
        console.log(employees)
        setAllEmployees(employees);
        const teamWithEmployees = await fetchTeamWithEmployees(teamId)
        setTeamWithEmployees(teamWithEmployees.employees)
        console.log(teamWithEmployees.employees)
        
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData(teamId);
  }, [teamId]); 

  const handleDeleteEmployee = async (employeeToDelete: EmployeeProps) => {
    try {
      await deleteEmployee(employeeToDelete.id)
      const updatedEmployees = allEmployees.filter((e) => e.id !== employeeToDelete.id);
      setAllEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddEmployee = (newEmployee: EmployeeProps) => {
    newEmployee.profilepicture = 'public/profil-default.png';
    setAllEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1>
      </div> 
      <Buttons onAddEmployee={handleAddEmployee}/>
      <div className="flex flex-row">
      <div className="flex flex-col">
        
      {allEmployees.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee} 
        />
      ))}
      </div>
      {teamWithEmployees.map((employeeTeam: EmployeeProps) => (
        <TeamSection key={employeeTeam.id} employee={employeeTeam} 
        />
      ))}
      </div>
      

      
      
      
        
    </main>
  )
}
