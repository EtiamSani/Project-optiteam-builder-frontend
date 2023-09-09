import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { addSkillsToEmployee, deleteSkill, deleteSkillFromEmployee, fetchSkills, fetchSkillsOfEmployee } from '@/utils';
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
    const [filteredSkills, setFilteredSkills] = useState([]);

    useEffect(() => {
        // Utilisez useEffect pour récupérer la liste des employés au chargement initial
        const fetchData = async () => {
          try {
            const skills = await fetchSkills();
            setGetSkills(skills);

            const skillsOfEmployee = await fetchSkillsOfEmployee(id);
            
            setGetEmployeeSkills(skillsOfEmployee.skills);
            setFilteredSkills(skillsOfEmployee.skills);
            
          } catch (error) {
            console.error('Error fetching skills:', error);
          }
        };
    
        fetchData();
      }, [id,getSkills,getEmployeeSkills ]); 

      const handleAddSkillToEmployee = async (employeeId: number ,skillId: number) => {
        await addSkillsToEmployee(employeeId, skillId)

        // Mettez à jour getEmployeeSkills avec les nouvelles compétences
        const skillsOfEmployee = await fetchSkillsOfEmployee(id);
        console.log(skillsOfEmployee.skills.id)
        setGetEmployeeSkills(skillsOfEmployee.skills);

        setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
      };

      const handleDeleteSkill = (skillId: any) => {
        deleteSkillFromEmployee(skillId)
        console.log(`Suppression de la compétence avec l'ID ${skillId}`);
        setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
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
                                {Array.isArray(filteredSkills) ? (
                    filteredSkills.map((employeeSkill) => (
                        <Badge key={employeeSkill.id} variant="outline" className='ml-2 mb-2 cursor-pointer' onDoubleClick={() => handleDeleteSkill(employeeSkill.id)}  >
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