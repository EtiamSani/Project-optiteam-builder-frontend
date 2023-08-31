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
  const {lastname, firstname, job, personality, teamId} = employee
  return (
    <div className='ml-5'>
      <div className='mb-3'>
      <Button size="lg" variant="yellow">Ajouter employé <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </div>
      <div>
      <Button size="lg" variant="yellow">Ajouter des compétences <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </div>
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Employers</h3>

        <Card className='w-[295px] h-[80px]'>
          <div className="flex items-center">
          <Avatar className="my-5 ml-4">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex">
              <div className="my-4">
            <div className="ml-5 font-bold">
              {firstname}
            </div>
            <div className="ml-5 text-sm">
              UI/UX designer
            </div>
            </div>
            <div className="my-7 flex ml-2">
            <IoIosAddCircleOutline className='text-2xl ml-2'/>
            <FiBriefcase className='text-2xl ml-2'/>
            <RiDeleteBin7Line className='text-2xl ml-2'/>
            </div>
            </div>
          </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EmployeeSection