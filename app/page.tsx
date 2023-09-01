"use client"
import { fetchEmployee } from "@/utils"
import EmployeeSection from "./EmployeeSection"
import { EmployeeProps } from "@/types";
import Buttons from "./Buttons";
import { useEffect, useState } from "react";
  
export default function Home() {
  const [allEmployees, setAllEmployees] = useState<EmployeeProps[]>([]);

  useEffect(() => {
    // Utilisez useEffect pour récupérer la liste des employés au chargement initial
    const fetchData = async () => {
      try {
        const employees = await fetchEmployee();
        console.log(allEmployees)
        setAllEmployees(employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, []); // Le tableau vide [] assure que cela s'exécute une seule fois au chargement initial.

  const handleDeleteEmployee = async (employeeToDelete: EmployeeProps) => {
    try {
      // Supprimez l'employé du serveur ici à l'aide de deleteEmployee
      // ...
      // Après la suppression réussie, mettez à jour le state allEmployees
      const updatedEmployees = allEmployees.filter((e) => e.id !== employeeToDelete.id);
      setAllEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  
  // const AllEmployee = await fetchEmployee();
  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1>
      </div> 
      <Buttons/>
      {allEmployees.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee}/>
      ))}
      
        
    </main>
  )
}
