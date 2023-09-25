import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editEmployee} from '@/utils'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EditEmployeeProps } from '@/types'
import {selectItems} from '../../constants/index'

interface ModalProps {
    onClose: () => void; // type de onClose comme une fonction qui ne renvoie rien (void)
    employeeId : number
    onUpdateEmployee: (employeeData: EditEmployeeProps, employeeId: number) => void;
  }
  
  const Modal: React.FC<ModalProps> = ({ employeeId , onUpdateEmployee}) => {
    
    const [editMessage, setEditMessage] = useState(false);
    
    const resetModal = () => {
        setEmployeeData({
          
          lastname: "",
          firstname: "",
          job: "",
          personality: "",
          
        });
      };
      

    const handleEditEmployee = async (employeeData: EditEmployeeProps, employeeId: number) => {
      
        try {
          await editEmployee(employeeData, employeeId); 
          onUpdateEmployee(employeeData, employeeId);
          setEditMessage(true);
          setTimeout(() => {
            setEditMessage(false);
          }, 1000);
          resetModal();
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };
      
      
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
          <DialogTitle>Modifier un employé</DialogTitle>
          {editMessage && 
      <div className='text-green-600 m-auto font-bold bg-green-300 p-2 rounded-md'> L'employer a bien été mis a jour</div>}
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
                Personalité
              </Label>
              <Select onValueChange={handlePersonalityChange}>
                  <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="La personnalité" />
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
        <Button type="submit" variant="yellow" onClick={async () => {handleEditEmployee(employeeData, employeeId)}}>Modifier</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default Modal