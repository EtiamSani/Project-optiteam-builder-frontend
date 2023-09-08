import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { fetchSkills } from '@/utils';
import React, { useEffect, useState } from 'react'

interface ModalAddSkillsProps {
    firstname: string;
    lastname: string;
    profilepicture: string
  }

const ModalAddSkills = ({ firstname, lastname, profilepicture }: ModalAddSkillsProps) => {

    const [getSkills, setGetSkills] = useState([])

    useEffect(() => {
        // Utilisez useEffect pour récupérer la liste des employés au chargement initial
        const fetchData = async () => {
          try {
            const skills = await fetchSkills();
            setGetSkills(skills);
            
          } catch (error) {
            console.error('Error fetching skills:', error);
          }
        };
    
        fetchData();
      }, [getSkills]); 

      const handleAddSkillToEmployee = (skillId: any) => {
        
        console.log(`ID ${skillId}`);
        
      };

  return (
    <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle >Ajouter des compétences à <span className='text-[#F1B92A]'>{firstname} {lastname}</span></DialogTitle>
    </DialogHeader>
    <div className='flex flex-col m-auto '>
    <Avatar className="w-20 h-20">
              <AvatarImage src={`http://localhost:3001/${profilepicture}`} />
            </Avatar>
            </div>
    <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-md text-black'>Les compétences disponibles</AccordionTrigger>
              <AccordionContent>
                {Array.isArray(getSkills) ? (
                            getSkills.map((skill) => (
                            <Badge key={skill.id} variant="outline" className='ml-2 mb-2 cursor-pointer' onDoubleClick={() => handleAddSkillToEmployee(skill.id)} >
                                {skill.name}
                            </Badge>
                            ))
                        ) : (
                            ''
                        )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
   
  </DialogContent>
  )
}

export default ModalAddSkills