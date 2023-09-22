import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card'
import { EmployeeProps } from '@/types';
import { deleteEmployeeFromTeam } from '@/utils';
import React, { useState } from 'react'


interface EmployeeCardProps {
    employee: EmployeeProps;
  }

const TeamSection = ({ employee, handleDeleteEmployeeFromTeamUpdater }: EmployeeCardProps) => {
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(employee)

  const handleDeleteEmployeeFromTeam = async (employee: any) => {
    setIsLoading(true);
    try{
      await deleteEmployeeFromTeam(employee.id) 
    } catch(error) {
      console.error('Erreur lors de la suppression de la compétence:', error);
    } finally {
      setIsLoading(false);
      setDeleteMessage(true);
      handleDeleteEmployeeFromTeamUpdater(employee)
      setTimeout(() => {
      setDeleteMessage(false);
      }, 1000);
    }
  }
  
  const { firstname, lastname, job, profilepicture, skills , personality} = employee.employee;
 //#f1b92a7c
  return (
    <div>
      <div>
      {isLoading && 
               <div className=" bg-[#F9FAFB]">
               <div className="flex justify-center items-center h-full">
                 <img className="h-16 w-16 bg-[#F9FAFB]" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
               </div>
               </div>               
              }
      {deleteMessage && 
          <div className='text-red-600 m-auto font-bold bg-red-300 p-2 rounded-md'> Employee a bien été supprimé de l'équipe !</div>}
          </div>
        <Card className='w-[350px] h-[280px] mb-5 ml-5 ' onDoubleClick={() => handleDeleteEmployeeFromTeam(employee)}>
          <div className='flex'>
        <Avatar className="my-5 ml-4 h-20 w-20">
            <AvatarImage src={`http://localhost:3001/${profilepicture}`} />
            <AvatarFallback>{firstname}</AvatarFallback>
        </Avatar>
        <div className='flex-row my-auto text-lg ml-5'>
         <div className='font-bold'>{firstname} {lastname}</div>   
         <div>{job}</div>
        </div>
          </div>
         
         <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-md text-black font-bold ml-2 mr-5'>Compétences</AccordionTrigger>
              <AccordionContent>
              <div className="max-h-[50px] overflow-y-auto">
              {Array.isArray(skills) ? (
                skills.map((item) => (
                  <Badge key={item.skill.id} variant="outline" className='ml-2 mb-2 bg-[#F1B92A] text-white border-[#F1B92A]'>
                    {item.skill.name}
                  </Badge>
                ))
              ) : (
                ''
              )}
                  </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
         <div className='text-md text-black font-bold ml-2'>Personnalité : <span className='font-normal'>{personality}</span></div>
        </Card>
           
    </div>
  )
}

export default TeamSection
