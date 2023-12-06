import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTeam} from '@/app'
import React, { useState } from 'react'
import { SaveSkillsProps } from '@/types'



interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
  }
  
  const ModalSkills: React.FC<ModalProps> = ({onUpdateTeamId}) => { 
    const [addMessage, setAddMessage] = useState(false);
    const resetModal = () => {
        setTeamData({
          name: "",
        });
      };
      

    const handleSaveTeam = async (teamData: SaveSkillsProps) => {
        try {
          const response = await createTeam(teamData); 
          if (response && response.id) {
            const teamId = response.id;
            console.log("teamID c" , teamId)
            localStorage.setItem('teamId', teamId); 
            onUpdateTeamId(teamId)
            
          }
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
          
          {addMessage && 
          <div className='text-green-600 m-auto font-bold bg-green-300 p-2 rounded-md'> Votre équipe a bien été créée !</div>}
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
          </DialogDescription>
      </DialogContent>
  )
}

export default ModalSkills