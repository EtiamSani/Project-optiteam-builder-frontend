import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editEmployee, saveSkills} from '@/utils'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EditEmployeeProps, SaveSkillsProps } from '@/types'
import {selectItems} from '../constants/index'

interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
    
  }
  
  const Modal: React.FC<ModalProps> = ({ onClose}) => {
    
    const resetModal = () => {
      setSkillsData({
          name: "",
        });
      };
      

    const handleSaveSkills = async (skillsData: SaveSkillsProps) => {
        try {
            console.log("save console", skillsData)
          await saveSkills(skillsData); 
          onClose();
          resetModal();
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };
      
      
    const [skillsData, setSkillsData] = useState({
        name: "",
      });

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setSkillsData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handlePersonalityChange = (selectedPersonality: any) => {
        console.log('Clicked on personality:', selectedPersonality);
        setSkillsData((prevState) => ({
          ...prevState,
          personality: selectedPersonality,
        }));
      };

  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter des compétences</DialogTitle>
          <DialogDescription>
            Rajouter des nouvel compétences
          </DialogDescription>
          <div className="grid w-full max-w-sm items-center gap-1.5">
    </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input id="name" value={skillsData.name} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={async () => {handleSaveSkills(skillsData)}}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default Modal