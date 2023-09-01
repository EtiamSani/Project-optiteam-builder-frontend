

export async function fetchEmployee(){
    const reponse = await fetch('http://localhost:3001/employees')
    const result = await reponse.json();
    return result
}


export async function deleteEmployee(id: number) {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
      });
      fetchEmployee();
  
      if (response.status === 204) {
        console.log('Employee deleted successfully.');
      } else {
        console.error('Failed to delete employee.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }
    


