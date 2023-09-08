import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { addSkillsToEmployee, fetchSkills, fetchSkillsOfEmployee } from '@/utils';
import React, { useEffect, useState } from 'react'

interface ModalAddSkillsProps {
    firstname: string;
    lastname: string;
    profilepicture: string
    id: number
  }

const ModalAddSkills = ({ firstname, lastname, profilepicture, id }: ModalAddSkillsProps) => {

    const [getSkills, setGetSkills] = useState([])
    const [getEmployeeSkills, setGetEmployeeSkills] = useState([])

    useEffect(() => {
        // Utilisez useEffect pour récupérer la liste des employés au chargement initial
        const fetchData = async () => {
          try {
            const skills = await fetchSkills();
            setGetSkills(skills);

            const skillsOfEmployee = await fetchSkillsOfEmployee(id);
            console.log(skillsOfEmployee.skills)
            setGetEmployeeSkills(skillsOfEmployee.skills);
            
          } catch (error) {
            console.error('Error fetching skills:', error);
          }
        };
    
        fetchData();
      }, []); 

      const handleAddSkillToEmployee = (employeeId: number ,skillId: number) => {

          console.log(`ID ${skillId} employee id ${skillId}`);
        addSkillsToEmployee(employeeId, skillId)
        
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
                            <Badge key={skill.id} variant="outline" className='ml-2 mb-2 cursor-pointer' onDoubleClick={() => handleAddSkillToEmployee(skill.id, id)} >
                                {skill.name}
                            </Badge>
                            ))
                        ) : (
                            ''
                        )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
            <AccordionTrigger className='text-md text-black'>Les compétences de {firstname} {lastname} </AccordionTrigger>
              <AccordionContent>
                                {Array.isArray(getEmployeeSkills) ? (
                    getEmployeeSkills.map((employeeSkill) => (
                        <Badge key={employeeSkill.id} variant="outline" className='ml-2 mb-2 cursor-pointer'  >
                        {employeeSkill.skill.name}
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