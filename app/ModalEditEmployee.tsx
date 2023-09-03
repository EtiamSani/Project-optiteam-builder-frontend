import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editEmployee} from '@/utils'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EditEmployeeProps } from '@/types'
import {selectItems} from '../constants/index'

interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
    
  }
  
  const Modal: React.FC<ModalProps> = ({ onClose}) => {
    
    const resetModal = () => {
        setEmployeeData({
          profilepicture:'',
          lastname: "",
          firstname: "",
          job: "",
          personality: "",
          teamId: 1
        });
      };
      

    const handleEditEmployee = async (employeeData: EditEmployeeProps) => {
        try {
            console.log("Edit console", employeeData)
          // Effectuez ici l'ajout de l'employé (par exemple, en utilisant une API)
          // Une fois l'employé ajouté avec succès, fermez le modal en mettant isModalOpen à false
          await editEmployee(employeeData); // Appelez handleSubmit directement
          onClose();
          // Réinitialisez les données du formulaire, si nécessaire.
          resetModal();
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };
      
      
    const [employeeData, setEmployeeData] = useState({
        lastname: "",
        firstname: "",
        job: "",
        profilepicture:"",
        personality:"",
        teamId: 1
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
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
          <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Photo</Label>
      <Input id="picture" type="file" />
    </div>
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
        <Button type="submit" variant="yellow" onClick={async () => {handleEditEmployee(employeeData)}}>Modifier</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default Modal