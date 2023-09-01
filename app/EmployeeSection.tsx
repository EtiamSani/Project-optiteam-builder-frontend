"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {FiBriefcase} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import { EmployeeProps } from "@/types"
import { deleteEmployee } from "@/utils"

interface EmployeeCardProps {
  employee: EmployeeProps;
  onDeleteEmployee: (employee: EmployeeProps) => void;
}
const EmployeeSection = ({ employee, onDeleteEmployee }: EmployeeCardProps) => {
  // const {id,lastname, firstname, job, personality, teamId, profilepicture} = employee
  
  


  
  
  return (
    <div className='ml-5'>
     
        <Card className='w-[345px] h-[80px] mb-2 hover:bg-[#F1B92A]' key={employee.id}>
          <div className="flex items-center">
            <Avatar className="my-5 ml-4">
              <AvatarImage src={`http://localhost:3001/${employee.profilepicture}`} />
              <AvatarFallback>{employee.firstname}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex">
                <div className="my-4">
                  <div className="ml-5 font-bold">
                    {employee.firstname} {employee.lastname}
                  </div>
                  <div className="ml-5 text-sm">
                    {employee.job}
                  </div>
                </div>
                <div className="my-7 flex ml-5">
                  <IoIosAddCircleOutline className='text-2xl ml-2' />
                  <FiBriefcase className='text-2xl ml-2' />
                  <button>
                    <RiDeleteBin7Line className='text-2xl ml-2' onClick={() => onDeleteEmployee(employee)} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
    
    </div>
  )
}

export default EmployeeSection