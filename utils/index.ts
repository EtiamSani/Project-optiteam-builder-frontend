import { AddEmployeeProps, EditEmployeeProps, EmployeeProps } from "@/types";
let storedEmployeeId: string | null = null;
if (typeof window !== "undefined") {
  storedEmployeeId = localStorage.getItem('selectedEmployeeId');
  
}

export async function fetchEmployee() {
    try {
      const response = await fetch('http://localhost:3001/employees', {
        cache: 'no-cache'
      });
  
      if (!response.ok) {
        throw new Error('Échec de la requête.');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des employés :', error);
      throw error; // Vous pouvez choisir de gérer l'erreur ici ou de la remonter à l'appelant
    }
  }


export async function deleteEmployee(id: number) {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
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

  export async function handleSubmit (employeeData : AddEmployeeProps, e:any) {
    e.preventDefault();
      try {
        // Effectuez une requête POST vers l'URL de l'API (localhost:3001/employees)
        const response = await fetch("http://localhost:3001/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });
  
        if (response.ok) {
          // La requête a réussi, vous pouvez gérer la réponse ici
        } else {
          // La requête a échoué, gérer les erreurs ici
        }
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire :", error);
      }
    }

    export async function editEmployee (employeeData : EditEmployeeProps) {
      
        try {
          console.log("get local",storedEmployeeId)
          
          const response = await fetch(`http://localhost:3001/employees/${storedEmployeeId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          });
    
          if (response.ok) {
            // La requête a réussi, vous pouvez gérer la réponse ici
          } else {
            // La requête a échoué, gérer les erreurs ici
          }
        } catch (error) {
          console.error("Erreur lors de la soumission du formulaire :", error);
        }
      }
  
    


