import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card'
import { EmployeeProps } from '@/types';
import React from 'react'


interface EmployeeCardProps {
    employee: EmployeeProps;
    
  }

  

const TeamSection = ({ employee }: EmployeeCardProps) => {
  const { firstname, lastname, job, profilepicture, skills , personality} = employee.employee;
 //#f1b92a7c
  return (
    <div>
        <Card className='w-[350px] h-[280px] mb-2 ml-5' >
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
                  <Badge key={item.skill.id} variant="outline" className='ml-2 mb-2 cursor-pointer'>
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
         <div className='text-md text-black font-bold ml-2'>Personalité : <span className='font-normal'>{personality}</span></div>
        </Card>
           
    </div>
  )
}

export default TeamSection
