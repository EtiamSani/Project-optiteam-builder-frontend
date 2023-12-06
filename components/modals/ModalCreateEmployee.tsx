import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleSubmit } from '@/app'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {selectItems} from '../../constants/index'


interface ModalProps {
    onClose: () => void; 
    onAddEmployee: (newEmployee: Employee) => void;
    setEmployeeCount: (prevCount: number) => void;
  }
  interface Employee {
    lastname: string;
    firstname: string;
    job: string;
    personality: string;
  }

  const Modal: React.FC<ModalProps> = ({ onClose, onAddEmployee, updateEmployeeCount, employeeCount}) => {
    
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

    const defaultUserId = localStorage.getItem('userId');
    
    const resetModal = () => {
        setEmployeeData({
          lastname: "",
          firstname: "",
          job: "",
          personality: "",
          userId:defaultUserId
        });
      };
      

      const [employeeData, setEmployeeData] = useState({
        lastname: "",
        firstname: "",
        job: "",
        personality:"", 
        userId:defaultUserId
      });
      
    const handleAddEmployee = async (e:any) => {
      // const userId = localStorage.getItem('userId')
      // console.log('userId dans le modal', userId)
        try {
          console.log('employee data avant la fonction',employeeData)
          await handleSubmit(employeeData, e); 
          setAllEmployees((prevEmployees) => [...prevEmployees, employeeData]);
          resetModal();
          updateEmployeeCount(1);
          console.log('handle add employee declenché')
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };

      const handleAddEmployeeFilter = async () => {
        onAddEmployee(employeeData); 
      }
      
      
  

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setEmployeeData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handlePersonalityChange = (selectedPersonality: any) => {
        setEmployeeData((prevState) => ({
          ...prevState,
          personality: selectedPersonality,
        }));
      };

  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un employé</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            {['lastname', 'firstname', 'job'].map((field) => (
              <div key={field} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field} className="text-right">
                  {field === 'lastname' ? 'Nom' : field === 'firstname' ? 'Prénom' : 'Métier'}
                </Label>
                <Input id={field} value={employeeData[field]} onChange={handleInputChange} className="col-span-3" />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job" className="text-right">
              Personnalité
            </Label>
            <Select onValueChange={handlePersonalityChange}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisissez" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                {selectItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
                 ))}
                </SelectGroup>
                </SelectContent>
            </Select>
            </div>
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={(e) => { handleAddEmployee(e); handleAddEmployeeFilter(); }}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default Modal