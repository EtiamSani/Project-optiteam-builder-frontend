import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleSubmit } from '@/utils'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import {selectItems} from '../../constants/index'
import { EmployeeProps } from '@/types'

interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
    onAddEmployee: (newEmployee: Employee) => void;
  }
  interface Employee {
    lastname: string;
    firstname: string;
    job: string;
    personality: string;
  
  }

  const Modal: React.FC<ModalProps> = ({ onClose, onAddEmployee, setEmployeeCount}) => {
    
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const resetModal = () => {
        setEmployeeData({
          lastname: "",
          firstname: "",
          job: "",
          personality: "",
        });
      };
      

    const handleAddEmployee = async (e:any) => {
        try {
          await handleSubmit(employeeData,e); // Appelez handleSubmit directement
          console.log("Employee added:", employeeData)
          setAllEmployees((prevEmployees) => [...prevEmployees, employeeData]);
          onClose();
          resetModal();
          setEmployeeCount((prevCount: number) => prevCount + 1);
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };

      const handleAddEmployeeFilter = async () => {
        onAddEmployee(employeeData); 
      }
      
      
    const [employeeData, setEmployeeData] = useState({
        lastname: "",
        firstname: "",
        job: "",
        personality:"", 
      });

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setEmployeeData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handlePersonalityChange = (selectedPersonality: any) => {
        console.log('Clicked on personality:', selectedPersonality);
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input id="lastname" value={employeeData.lastname} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Prénom
            </Label>      
            <Input id="firstname" value={employeeData.firstname} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="job" className="text-right">
              Métier
            </Label>
            <Input id="job" value={employeeData.job} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job" className="text-right">
              Personalité
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