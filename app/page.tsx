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
    const storedTeamId = localStorage.getItem('teamId');
    const teamId = parseInt(storedTeamId, 10);
    console.log(teamId)
    const fetchData = async (teamId : number) => {
      try {
        const employees = await fetchEmployee();
        setAllEmployees(employees);
        const teamWithEmployees = await fetchTeamWithEmployees(teamId)
        setTeamWithEmployees(teamWithEmployees.employees)
        
        
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

  const handleUpdateEmployee = (updatedEmployee: EmployeeProps, employeeId : number) => {
    updatedEmployee.id = employeeId
    // maj de la liste des employés en remplaçant l'employé mis à jour
    setAllEmployees((prevEmployees) => {
    // le profilepicture actuel de l'employé dans l'état
    const currentEmployee = prevEmployees.find((employee) => employee.id === employeeId);
    if (currentEmployee) {
      updatedEmployee.profilepicture = currentEmployee.profilepicture;
    }
    return prevEmployees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee));
  });

};

const handleUpdateAddEmployeeToTeam = (newEmployee: EmployeeProps) => {
  
  const updatedEmployee = {
    ...newEmployee, 
    employee: {     
      id: newEmployee.id,
      lastname: newEmployee.lastname,
      firstname: newEmployee.firstname,
      profilepicture: newEmployee.profilepicture,
      job: newEmployee.job,
      personality: newEmployee.personality,
      skills: newEmployee.skills || [],
    },
  };
  setTeamWithEmployees((prevTeamWithEmployees) => [...prevTeamWithEmployees, updatedEmployee]);
}

  const handleDeleteEmployeeFromTeamUpdater = (employeeToDeleteFromTeam : any) => {
    const updatedTeamWithEmployees = teamWithEmployees.filter((e) => e.id !== employeeToDeleteFromTeam.id);
    setTeamWithEmployees(updatedTeamWithEmployees);
  }

  const updateProfilePicture = (employeeId: number, newProfilePictureUrl: any) => {
    setAllEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, profilepicture: newProfilePictureUrl }
          : employee
      )
    );
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
        <EmployeeSection key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee} onUpdateEmployee={handleUpdateEmployee} updateProfilePicture={updateProfilePicture}
        handleUpdateAddEmployeeToTeam={handleUpdateAddEmployeeToTeam}
        />
      ))}
      </div>
      <div className="ml-[100px] flex flex-wrap">
      {teamWithEmployees.map((employeeTeam: EmployeeProps) => (
        <TeamSection key={employeeTeam.id} employee={employeeTeam} handleDeleteEmployeeFromTeamUpdater={handleDeleteEmployeeFromTeamUpdater} 
        />
      ))}
      </div>
      </div>  
    </main>
  )
}
