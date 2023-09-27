import { AddEmployeeProps, EditEmployeeProps, SaveSkillsProps } from "@/types";
let storedEmployeeId: string | null = null;
if (typeof window !== "undefined") {
  storedEmployeeId = localStorage.getItem('selectedEmployeeId');
  
}

export async function fetchEmployee() {
    try {
      const response = await fetch(`${process.env.API_URL}/employees`, {
        cache: 'no-cache'
      });
  
      if (!response.ok) {
        throw new Error('Échec de la requête.');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des employés :', error);
      throw error; 
    }
  }


export async function deleteEmployee(id: number) {
    try {
      await fetch(`${process.env.API_URL}/employees/${id}`, {
        method: 'DELETE',
      });     
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  export async function handleSubmit (employeeData : AddEmployeeProps, e:any) {
    e.preventDefault();
      try {
        const response = await fetch(`${process.env.API_URL}/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });

      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire :", error);
      }
    }

    export async function editEmployee (employeeData : EditEmployeeProps, employeeId: number) {
      
        try {
           
          const response = await fetch(`${process.env.API_URL}/employees/${employeeId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          });

        } catch (error) {
          console.error("Erreur lors de la soumission du formulaire :", error);
        }
      }

      export async function editEmployeePicture (file: File, employeeId: number) {
      
        try {
          const formData = new FormData(); 
          formData.append("file", file);
          const response = await fetch(`${process.env.API_URL}/employees/${employeeId}/profile-picture`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data.profilepicture)
          if (data.profilepicture) {
            return data.profilepicture;
          }

        } catch (error) {
          console.error("Erreur lors de la soumission du formulaire :", error);
        }
      }

      export async function saveSkills (skillsData : SaveSkillsProps) {
        try {   
          const response = await fetch(`${process.env.API_URL}/skills`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: skillsData.name, 
            }),
          });

        } catch (error) {
          console.error("Erreur lors de la soumission du des compétences :", error);
        }
      }

      export async function fetchSkills() {
        try {
          const response = await fetch(`${process.env.API_URL}/skills`, {
            cache: 'no-cache'
          });
      
          if (!response.ok) {
            throw new Error('Échec de la requête.');
          }
      
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Erreur lors de la récupération des compétences :', error);
          throw error; 
        }
      }

      export async function deleteSkill(skillId: any) {
        try {
          const response = await fetch(`${process.env.API_URL}/skills/${skillId}`, {
            method: 'DELETE',
          });
          
      
          if (response.status === 204) {
            console.log('Employee deleted successfully.');
            await fetchEmployee();
            
          } else {
            console.error('Failed to delete employee.');
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      export async function addSkillsToEmployee(skillId: number,employeeId: number) {
        console.log(skillId,employeeId)
        try {
          const response = await fetch(`${process.env.API_URL}/employees/${employeeId}/skill/${skillId}`, {
            method: 'POST',
          });
          
      
          if (response.status === 201) {
            console.log('Employee deleted successfully.');
            await fetchEmployee();
            
          } else {
            console.error('Failed to add skill.');
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      export async function fetchSkillsOfEmployee(employeeId : number) {
        // console.log(employeeId)
        try {
          const response = await fetch(`${process.env.API_URL}/employees/${employeeId}`, {
            cache: 'no-cache'
          });
      
          if (!response.ok) {
            throw new Error('Échec de la requête.');
          }
      
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Erreur lors de la récupération des compétences des employees :', error);
          throw error; 
        }
      }

      export async function deleteSkillFromEmployee(skillId: any) {
        try {
          const response = await fetch(`${process.env.API_URL}/employees/skill/${skillId}`, {
            method: 'DELETE',
          });
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      export async function createTeam (team : any) {
      
        try {   
          const response = await fetch(`${process.env.API_URL}/team`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: team.name, 
            }),
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.error("Erreur lors de la soumission de l'équipe :", error);
        }
      }

      export async function fetchTeamWithEmployees(teamId : number) {
        try {
          const response = await fetch(`${process.env.API_URL}/team/${teamId}`, {
            cache: 'no-cache'
          });
      
          if (!response.ok) {
            throw new Error('Échec de la requête.');
          }
      
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Erreur lors de la récupération des employés :', error);
          throw error; 
        }
      }

      export async function AddEmployeeToTeam(teamId: number,employeeId: number) {
        try {
          const response = await fetch(`${process.env.API_URL}/team/${teamId}/employee/${employeeId}`, {
            method: 'POST',
          });
          
      
          if (response.status === 201) {
            console.log('Employee deleted successfully.');
            await fetchEmployee();
            
          } else {
            console.error('Failed to add skill.');
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      export async function deleteEmployeeFromTeam(id: number) {
        try {
          const response = await fetch(`${process.env.API_URL}/team/employee/${id}`, {
            method: 'DELETE',
          });
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      export async function fetchTeam() {
        try {
          const response = await fetch(`${process.env.API_URL}/team`, {
            cache: 'no-cache'
          });
      
          if (!response.ok) {
            throw new Error('Échec de la requête.');
          }
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Erreur lors de la récupération des équipes :', error);
          throw error; 
        }
      }

      
    


