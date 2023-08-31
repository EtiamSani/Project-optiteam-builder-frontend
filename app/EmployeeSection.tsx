"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {FiBriefcase} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import { EmployeeProps } from "@/types"

interface EmployeeCardProps {
  employee: EmployeeProps;
}

const EmployeeSection = ({employee}: EmployeeCardProps) => {
  const {lastname, firstname, job, personality, teamId, profilepicture} = employee
  return (
    <div className='ml-5'>
      

        <Card className='w-[345px] h-[80px] mb-2 hover:bg-[#F1B92A]'>
          <div className="flex items-center">
          <Avatar className="my-5 ml-4">
            <AvatarImage src={`http://localhost:3001/${profilepicture}`} />
            <AvatarFallback>{firstname}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex">
              <div className="my-4">
            <div className="ml-5 font-bold">
              {firstname} {lastname}
            </div>
            <div className="ml-5 text-sm">
              {job}
            </div>
            </div>
            <div className="my-7 flex ml-5">
            <IoIosAddCircleOutline className='text-2xl ml-2'/>
            <FiBriefcase className='text-2xl ml-2'/>
            <RiDeleteBin7Line className='text-2xl ml-2'/>
            </div>
            </div>
          </div>
          </div>
        </Card>
      </div>
    
  )
}

export default EmployeeSection