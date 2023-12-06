import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { deleteSkill, fetchSkills, saveSkills} from '@/app'
import React, { useEffect, useState } from 'react'
import { SaveSkillsProps } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface ModalProps {
    onClose: () => void; 
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
      const [isLoading, setIsLoading] = useState(false);

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setSkillsData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handleDeleteSkill = async (skillId: any) => {
        setIsLoading(true);
        try {
          await deleteSkill(skillId)
          setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));

        } catch(error) {
          console.error('Erreur lors de la suppression de la compétence:', error);
        } finally {
        setIsLoading(false);
        setDeleteMessage(true);
        setTimeout(() => {
          setDeleteMessage(false);
        }, 1000);
  };
      }
        
      useEffect(() => {
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
              <div className="max-h-[120px] overflow-y-auto">
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
              {isLoading && 
                   <div className=" bg-white">
                   <div className="flex justify-center items-center h-full">
                     <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
                   </div>
                   </div>               
                  }
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