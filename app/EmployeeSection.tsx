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


interface EmployeeCardProps {
  employee: EmployeeProps;
  onDeleteEmployee: (employee: EmployeeProps) => void;
  onEditEmployee: (employee: EditEmployeeProps) => void;
}
const EmployeeSection = ({ employee, onDeleteEmployee, onEditEmployee }: EmployeeCardProps) => {

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
        <Card className='w-[345px] h-[80px] mb-2 hover:bg-[#F1B92A]' key={employee.id}>
          <div className="flex items-center">
            <Avatar className="my-5 ml-4">
              <AvatarImage src={`http://localhost:3001/${employee.profilepicture}`} />
              <AvatarFallback>{employee.firstname}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex">
                <div className="my-4">
                  <div className="ml-5 font-bold w-[100px]">
                    {employee.firstname} {employee.lastname}
                  </div>
                  <div className="ml-5 text-sm">
                    {employee.job}
                  </div>
                </div>
                <div className="my-7 flex ml-8">
                  <IoIosAddCircleOutline className='text-2xl ml-2' />
                  <FiBriefcase className='text-2xl ml-2' />
                  <button onClick={() => handleEditEmployeeClick(employee.id)}>
                    <Dialog>
                      <DialogTrigger>
                  <BsPencil className='text-2xl ml-2' />
                    </DialogTrigger>
                    <ModalEditEmployee onClose={closeModal}  />
                  </Dialog>
                  </button>
                  <button>
                    <RiDeleteBin7Line className='text-2xl ml-2 mb-1' onClick={() => onDeleteEmployee(employee)} />
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