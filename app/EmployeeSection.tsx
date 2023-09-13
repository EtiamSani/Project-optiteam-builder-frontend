"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {FiBriefcase} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import { EditEmployeeProps, EmployeeProps } from "@/types"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog } from "@/components/ui/dialog"
import ModalEditEmployee from "./ModalEditEmployee"
import ModalPicture from "./ModalPicture"
import ModalAddSkills from "./ModalAddSkills"


interface EmployeeCardProps {
  employee: EmployeeProps;
  onDeleteEmployee: (employee: EmployeeProps) => void;
}
const EmployeeSection = ({ employee, onDeleteEmployee }: EmployeeCardProps) => {

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  
  function closeModal(): void {
    throw new Error("Function not implemented.")
  }

  const handleEditEmployeeClick = (employeeId: number) => {
    console.log(employeeId)
    localStorage.setItem('selectedEmployeeId', employeeId.toString());
    setSelectedEmployeeId(employeeId);
  };

  return (
    <div className='ml-5'>
        <Card className='w-[350px] h-[80px] mb-2 hover:bg-[#F1B92A]' key={employee.id}>
          <div className="flex items-center">
          <Dialog>
              <DialogTrigger>
            <Avatar className="my-5 ml-4">
              <AvatarImage src={`http://localhost:3001/${employee.profilepicture}`} />
              <AvatarFallback>{employee.firstname}</AvatarFallback>
            </Avatar>
              </DialogTrigger>
            <ModalPicture employeeId={employee.id}/>
            </Dialog>
              <div className="flex">
                <div className="m-auto">
                  <div className="ml-5 font-bold w-[100px]">
                    {employee.firstname} {employee.lastname}
                  </div>
                  <div className="ml-5 text-sm">
                    {employee.job}
                  </div>
                </div>
                <div className="m-auto flex ml-8">
                  <IoIosAddCircleOutline className='text-2xl ml-2' />
                  <Dialog>
                      <DialogTrigger>
                  <FiBriefcase className='text-2xl ml-2' />
                  </DialogTrigger>
                    <ModalAddSkills firstname={employee.firstname.toString()} lastname={employee.lastname.toString()} profilepicture={employee.profilepicture.toString()} id={employee.id} name={""}/>
                  </Dialog>
                  <button onClick={() => handleEditEmployeeClick(employee.id)}>
                    <Dialog>
                      <DialogTrigger>
                  <BsPencil className='text-2xl ml-2' />
                    </DialogTrigger>
                    <ModalEditEmployee  employeeId={employee.id} onClose={function (): void {
                    throw new Error("Function not implemented.")
                  } }/>
                  </Dialog>
                  </button>
                  <button>
                    <RiDeleteBin7Line className='text-2xl ml-2 mb-1' onClick={() => onDeleteEmployee(employee)} />
                  </button>
                </div>
              </div>
          </div>
        </Card>
    </div>
  )
}

export default EmployeeSection