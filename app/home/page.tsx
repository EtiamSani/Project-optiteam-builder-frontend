"use client"
import { deleteEmployee,fetchEmployee, fetchTeam, fetchTeamWithEmployees } from "@/app/actions"
import EmployeeSection from "../../components/sections/employees/EmployeeSection"
import { EmployeeProps } from "@/types";
import ButtonGroup from "../../components/sections/employees/ButtonGroup";
import { useEffect, useState } from "react";
import TeamSection from "../../components/sections/team/TeamSection";
import MessageWithIcon from "../../components/sections/team/WarningMessage";
import { calculatePersonalityCounts, getMessage } from "@/utils/teamUtils";


  
export default function Home() {
  const [allEmployees, setAllEmployees] = useState<EmployeeProps[]>([]);
  const [teamWithEmployees, setTeamWithEmployees] = useState<EmployeeProps[]>([]);
  const [team, setTeam] = useState(false)
  const [teamId, setTeamId] = useState<number | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [message, setMessage] = useState ('')


  const updateTeamId = (newTeamId: number) => {
    setTeamId(newTeamId);
  };

  const updateEmployeeCount = (count : any) => {
    setEmployeeCount(count);
  };
  
  

  useEffect(() => {
    const storedTeamId = localStorage.getItem('teamId');
    const teamId = parseInt(storedTeamId, 10);
    setTeamId(teamId);
    const fetchData = async (teamId : number) => {
      try {
        const employees = await fetchEmployee();
        setAllEmployees(employees);
        if(teamId){
        const teamWithEmployees = await fetchTeamWithEmployees(teamId)
        setTeamWithEmployees(teamWithEmployees.employees)
        }
        const team = await fetchTeam()  
        if (team) {
          setTeam(true)
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData(teamId);
  }, [teamId,employeeCount]); 

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
    setTeamWithEmployees((prevTeamWithEmployees) =>
      prevTeamWithEmployees.map((teamWithEmployee) => {
        if (teamWithEmployee.employee.id === updatedEmployee.id) {
          teamWithEmployee.employee = updatedEmployee;
        }
        return teamWithEmployee;
      })
    );
  };



useEffect(() => {
  const { extravertsCount, introvertsCount } = calculatePersonalityCounts(teamWithEmployees);
  const totalEmployees = teamWithEmployees.length;
  const newMessage = getMessage(extravertsCount, introvertsCount, totalEmployees);
  setMessage(newMessage);
  setEmployeeCount(teamWithEmployees.length);
  
}, [teamWithEmployees]);
  

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center mt-20 font-bold text-4xl text-[#F1B92A]">
        <h1>Mon équipe</h1> 
      </div> 
      <MessageWithIcon message={message} />
      {/* Ceci doit etre un Composant Server */}
      <ButtonGroup onAddEmployee={handleAddEmployee} team={team} onUpdateTeamId={updateTeamId} updateEmployeeCount={updateEmployeeCount}/>
      <div className="flex flex-row">
      <div className="flex flex-col">

      {/* Ceci doit etre un Composant Server */}  
      {allEmployees.map((employee: EmployeeProps) => (
        <EmployeeSection key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee} onUpdateEmployee={handleUpdateEmployee} updateProfilePicture={updateProfilePicture}
        handleUpdateAddEmployeeToTeam={handleUpdateAddEmployeeToTeam} updateEmployeeInTeam={updateEmployeeInTeam} 
        />
      ))}
      </div>
      
      <div className="ml-[100px] flex flex-wrap">
        {/* Ceci doit etre un Composant Server */}
      {teamWithEmployees.map((employeeTeam: EmployeeProps) => (
        <TeamSection key={employeeTeam.id} employee={employeeTeam} handleDeleteEmployeeFromTeamUpdater={handleDeleteEmployeeFromTeamUpdater} 
        />
      ))}
      </div>
      </div>  
    </main>
  )
}
