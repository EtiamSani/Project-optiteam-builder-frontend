"use client"
import { deleteEmployee,fetchEmployee, fetchTeamWithEmployees } from "@/utils"
import EmployeeSection from "../../../components/sections/EmployeeSection"
import { EmployeeProps } from "@/types";
import Buttons from "../../../components/Buttons";
import { useEffect, useState } from "react";
import TeamSection from "../../../components/sections/TeamSection";
import MessageWithIcon from "@/components/WarningMessage";


  
export default function Home() {
  const [allEmployees, setAllEmployees] = useState<EmployeeProps[]>([]);
  const [teamWithEmployees, setTeamWithEmployees] = useState<EmployeeProps[]>([]);
 

  let teamId
  useEffect(() => {
    const storedTeamId = localStorage.getItem('teamId');
    teamId = parseInt(storedTeamId, 10);
    console.log(teamId)
    const fetchData = async (teamId : number) => {
      try {
        const employees = await fetchEmployee();
        setAllEmployees(employees);
        const teamWithEmployees = await fetchTeamWithEmployees(teamId)
        console.log(teamWithEmployees)
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

  const updateEmployeeInTeam = (updatedEmployee: any) => {
    console.log("updatedEmployee:", updatedEmployee);
  
    // Assurez-vous que l'ID est correctement transmis dans la structure de données.
    console.log("updatedEmployee.id:", updatedEmployee.id);
  
    setTeamWithEmployees((prevTeamWithEmployees) =>
      prevTeamWithEmployees.map((teamWithEmployee) => {
        console.log("teamWithEmployee.id:", teamWithEmployee.employee.id);
  
        // Assurez-vous que les conditions dans map sont satisfaites correctement.
        if (teamWithEmployee.employee.id === updatedEmployee.id) {
          console.log("Updating employee:", teamWithEmployee);
  
          // Mettez à jour directement l'employé dans le format souhaité.
          teamWithEmployee.employee = updatedEmployee;
        }
        return teamWithEmployee;
      })
    );
  };

  const [message, setMessage] = useState ('')
 // Définir le nombre total d'employés
const totalEmployees = teamWithEmployees.length;

// Compter le nombre d'extravertis et d'introvertis
let extravertsCount = 0;
let introvertsCount = 0;

teamWithEmployees.forEach((emp) => {
  console.log(emp.employee.personality);
  if (emp.employee.personality === 'extravertie') {
    extravertsCount++;
  } else if (emp.employee.personality === 'introvertie') {
    introvertsCount++;
  }
  console.log(extravertsCount)
});

 // Utilisez useEffect pour mettre à jour le message en fonction des résultats
 useEffect(() => {
  // Vérifier si l'une des catégories dépasse la moitié
  if (extravertsCount > totalEmployees / 2) {
    setMessage('Trop d\'extravertis dans l\'équipe');
  } else if (introvertsCount > totalEmployees / 2) {
    setMessage('Trop d\'introvertis dans l\'équipe');
  } else if (totalEmployees == 0) {
    setMessage('Vous n\'avez pas d\'employées dans votre équipe');
  } else {
    setMessage('Équilibre entre extravertis et introvertis dans l\'équipe');
  }
}, [extravertsCount, introvertsCount, totalEmployees]);


  

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1> 
      </div> 
      <MessageWithIcon message={message} />
      <Buttons onAddEmployee={handleAddEmployee}/>
      <div className="flex flex-row">
      <div className="flex flex-col">
        
      {allEmployees.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee} onUpdateEmployee={handleUpdateEmployee} updateProfilePicture={updateProfilePicture}
        handleUpdateAddEmployeeToTeam={handleUpdateAddEmployeeToTeam} updateEmployeeInTeam={updateEmployeeInTeam}
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
