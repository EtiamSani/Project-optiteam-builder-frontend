import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { deleteSkill, editEmployee, fetchSkills, saveSkills} from '@/utils'
import React, { useEffect, useState } from 'react'
import { SaveSkillsProps } from '@/types'
import { Badge } from '@/components/ui/badge'

interface ModalProps {
    onClose: () => void; // Définissez le type de onClose comme une fonction qui ne renvoie rien (void)
    
  }
  
  const ModalSkills: React.FC<ModalProps> = () => {
    
    const resetModal = () => {
      setSkillsData({
          name: "",
        });
      };
      

    const handleSaveSkills = async (skillsData: SaveSkillsProps) => {
        try {
            console.log("save console", skillsData)
          await saveSkills(skillsData); 
          
          resetModal();
        } catch (error) {
          console.error('Error adding employee:', error);
        }
      };
      
      
    const [skillsData, setSkillsData] = useState({
        name: "",
      });
      const [getSkills, setGetSkills] = useState([])
      const [filteredSkills, setFilteredSkills] = useState([]);

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setSkillsData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handleDeleteSkill = (skillId: any) => {
        deleteSkill(skillId)
        console.log(`Suppression de la compétence avec l'ID ${skillId}`);
        setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
      };

      useEffect(() => {
        // Utilisez useEffect pour récupérer la liste des employés au chargement initial
        const fetchData = async () => {
          try {
            const skills = await fetchSkills();
            setGetSkills(skills);
            setFilteredSkills(skills);
          } catch (error) {
            console.error('Error fetching skills:', error);
          }
        };
    
        fetchData();
      }, [skillsData]); 

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
              Compétence
            </Label>
            <Input id="name" value={skillsData.name} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={async () => {handleSaveSkills(skillsData)}}>Ajouter</Button>
        </DialogFooter>
        <DialogDescription>
            <h4 className='text-lg mb-5 font-bold text-black'>Les compétences disponibles {''}</h4>
            <div>
    {Array.isArray(filteredSkills) ? (
      filteredSkills.map((skill) => (
        <Badge key={skill.id} variant="outline" className='ml-2 mb-2 cursor-pointer' onDoubleClick={() => handleDeleteSkill(skill.id)}>
          {skill.name}
        </Badge>
      ))
    ) : (
      ''
    )}
  </div>
            
          </DialogDescription>
      </DialogContent>
  )
}

export default ModalSkills