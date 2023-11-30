import { AddEmployeeProps, EditEmployeeProps, SaveSkillsProps } from "@/types";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";
let storedEmployeeId: string | null = null;
if (typeof window !== "undefined") {
  storedEmployeeId = localStorage.getItem('selectedEmployeeId');
  
}

export async function fetchEmployee() {
    try {
      const userId = localStorage.getItem('userId')
      const response = await fetch(`${process.env.API_URL}/employees/${userId}`, {
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
        console.log('employee data recu',employeeData)
        const userIdAsNumber = parseInt(employeeData.userId, 10);
        employeeData.userId = userIdAsNumber;
      
        const response = await fetch(`${process.env.API_URL}/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
           employeeData
          )
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
      console.log(team)
        try {   
          const response = await fetch(`${process.env.API_URL}/team`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: team, 
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
      
          const result = response.json();
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

      export async function signup(userData:any) {
        console.log(userData)
        try {
          const response = await fetch(`${process.env.API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             username: userData.username, 
             email : userData.email,
             password: userData.password,
             teamId: userData.teamId
            }),
          });
          if (response.ok) {
            const responseData = await response.json();
            const token = responseData.acces_token; 
            console.log('rep du token', token)
            localStorage.setItem('userId', token.id);
          } else {
            console.error('Erreur lors de la création de compte.');
            throw new Error('Erreur lors de la création de compte.');
          }
        } catch (error) {
          console.error('Erreur lors la création de compte :', error);
          throw error; 
        }
      }

      export async function signin(userData:any) {
        console.log(userData)
        try {
          const response = await fetch(`${process.env.API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             email : userData.email,
             password: userData.password
            }),
          });
          if (response.ok) {
            const responseData = await response.json();
            const token = responseData.acces_token; 
           
            
            
            localStorage.setItem('accessToken', token);
            console.log('token mis dans localstorage !', token)
            return responseData
          } else {
            console.error('Erreur lors de la création de compte.');
            throw new Error('Erreur lors de la création de compte.');
          }
        } catch (error) {
          console.error('Erreur lors la création de compte :', error);
          throw error; 
        }
      }

  export async function googleAuth(credentialResponse : any): Promise<any>{
          const apiUrl = 'http://localhost:3001/auth/login/google'; // Remplacez par l'URL correcte de votre serveur

          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: credentialResponse.credential, teamId: localStorage.getItem('teamId') }),
            });
        
            if (!response.ok) {
              throw new Error('Échec de la requête');
            }
        
            const apiResponse = await response.json();
            const googleToken = apiResponse.acces_token;
            localStorage.setItem('accessToken', googleToken);
            console.log('token mis dans localstorage !', googleToken);
            const decodedToken = jwtDecode(googleToken)
            console.log(decodedToken)
            const userId = decodedToken.userId
            const teamId = decodedToken.teamId
            localStorage.setItem('userId', userId)
            localStorage.setItem('teamId', teamId)

            return googleToken;
          } catch (error) {
            console.error('Erreur lors de la récupération du token :', error);
            throw error; 
          }
      }