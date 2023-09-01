

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
    


