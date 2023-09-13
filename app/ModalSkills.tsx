import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { deleteSkill, editEmployee, fetchSkills, saveSkills} from '@/utils'
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
      setSkillsData({
          name: "",
        });
      };
      

    const handleSaveSkills = async (skillsData: SaveSkillsProps) => {
        try {
            console.log("save console", skillsData)
          await saveSkills(skillsData); 
          setAddMessage(true);
        setTimeout(() => {
          setAddMessage(false);
        }, 1000);
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
        setDeleteMessage(true);
        setTimeout(() => {
          setDeleteMessage(false);
        }, 1000);
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
            <Input id="name" value={skillsData.name} onChange={handleInputChange} className="col-span-3" />
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={async () => {handleSaveSkills(skillsData)}}>Ajouter</Button>
        </DialogFooter>
        <DialogDescription>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-md text-black'>Les compétences disponibles</AccordionTrigger>
              <AccordionContent>
              {Array.isArray(filteredSkills) ? (
                filteredSkills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className='ml-2 mb-2 cursor-pointer' onDoubleClick={() => handleDeleteSkill(skill.id)}>
                    {skill.name}
                  </Badge>
                ))
              ) : (
                ''
              )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
            <div>
    
  </div>
            
          </DialogDescription>
      </DialogContent>
  )
}

export default ModalSkills