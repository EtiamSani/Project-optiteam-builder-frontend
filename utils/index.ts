export async function fetchEmployee(){
    const reponse = await fetch('http://localhost:3001/employees')
    const result = await reponse.json();
    return result
}