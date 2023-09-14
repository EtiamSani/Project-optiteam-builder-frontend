import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTeam, deleteSkill, editEmployee, fetchSkills, saveSkills} from '@/utils'
import React, { useEffect, useState } from 'react'
import { SaveSkillsProps } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
    
  }
  
  const ModalSkills: React.FC<ModalProps> = () => {

    const [deleteMessage, setDeleteMessage] = useState(false);
    const [addMessage, setAddMessage] = useState(false);
    
    const resetModal = () => {
        setTeamData({
          name: "",
        });
      };
      

    const handleSaveTeam = async (teamData: SaveSkillsProps) => {
        try {
        
          await createTeam(teamData); 
          setAddMessage(true);
        setTimeout(() => {
          setAddMessage(false);
        }, 1000);
          resetModal();
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };
      
      
    const [teamData, setTeamData] = useState({
        name: "",
      });
      

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setTeamData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer une équipe</DialogTitle>
          {deleteMessage && 
          <div className='text-red-600 m-auto font-bold bg-red-300 p-2 rounded-md'> La compétence a bien été effacé !</div>}
          {addMessage && 
          <div className='text-green-600 m-auto font-bold bg-green-300 p-2 rounded-md'> La compétence a bien été ajouté !</div>}
          <div className="grid w-full max-w-sm items-center gap-1.5">
    </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Label htmlFor="name">
              Nom
            </Label>
            <Input id="name" value={teamData.name} onChange={handleInputChange} className="col-span-3" />
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={async () => {handleSaveTeam(teamData)}}>Ajouter</Button>
        </DialogFooter>
        <DialogDescription>

        
            <div>
        </div>  
          </DialogDescription>
      </DialogContent>
  )
}

export default ModalSkills