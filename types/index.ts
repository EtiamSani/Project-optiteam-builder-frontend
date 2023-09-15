export interface EmployeeProps {
    id:number
    lastname: String,
    firstname: String,
    job : String,
    personality: String
    profilepicture: String
}

export interface AddEmployeeProps {
    lastname: String,
    firstname: String,
    job : String,
    personality: String
    
}

export interface EditEmployeeProps {
    id: number
    lastname: String,
    firstname: String,
    job : String,
    personality: String
    
}

export interface SaveSkillsProps {
    name: String
}
