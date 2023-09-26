"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import {FiBriefcase} from 'react-icons/fi'
import {RiDeleteBin7Line} from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import { EditEmployeeProps, EmployeeProps } from "@/types"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog } from "@/components/ui/dialog"
import ModalEditEmployee from "../modals/ModalEditEmployee"
import ModalPicture from "../modals/ModalPicture"
import ModalAddSkills from "../modals/ModalAddSkills"
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import { AddEmployeeToTeam, fetchEmployee } from "@/utils"
import ModalFactory from "../modalFactory/ModalFactory"


interface EmployeeCardProps {
  employee: EmployeeProps;
  onDeleteEmployee: (employee: EmployeeProps) => void;
  onUpdateEmployee: (updatedEmployee: EmployeeProps,employeeId:number ) => void;
}

const EmployeeSection = ({ employee, onDeleteEmployee, onUpdateEmployee, updateProfilePicture, handleUpdateAddEmployeeToTeam, updateEmployeeInTeam  }: EmployeeCardProps) => {
 
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const storedTeamId = localStorage.getItem('teamId');
  const teamId = parseInt(storedTeamId, 10);

  const modalFactory = new ModalFactory();
  
  function closeModal(): void {
    throw new Error("Function not implemented.")
  }

  const handleEditEmployeeClick = (employeeId: number) => {
    localStorage.setItem('selectedEmployeeId', employeeId.toString());
    setSelectedEmployeeId(employeeId);
  };

  const handleUpdateEmployee = (updatedEmployee: EditEmployeeProps, employeeId : number) => {
    onUpdateEmployee(updatedEmployee, employeeId); // Appelez la fonction onUpdateEmployee avec les données mises à jour
    updateEmployeeInTeam(updatedEmployee);
  };

  const handleAddEmployeeToTeam = (employeeId : number, teamId: number) => {
    console.log(employeeId)
    AddEmployeeToTeam(teamId,employeeId)
    handleUpdateAddEmployeeToTeam(employee)
  }
  
  return (
    <div className='ml-5'>
        <Card className='w-[390px] h-[80px] mb-2 hover:bg-[#ffebb7]' key={employee.id}>
          <div className="flex items-center">
          <Dialog>
          <DialogTrigger>
            <Avatar className="my-5 ml-4">
              <AvatarImage src={`http://localhost:3001/${employee.profilepicture}`} />
              <AvatarFallback>{employee.firstname}</AvatarFallback>
            </Avatar>
              </DialogTrigger>
            {/* <ModalPicture employeeId={employee.id} onUpdateProfilePicture={updateProfilePicture}/> */}
            {modalFactory.createEmployeeProfilePicture(
            employee.id,
            updateProfilePicture
          ).render()}
            </Dialog>
              <div className="flex">
                <div className="m-auto">
                  <div className="ml-5 font-bold w-[140px]">
                    {employee.firstname} {employee.lastname}
                  </div>
                  <div className="ml-5 text-sm">
                    {employee.job}
                  </div>
                </div>
                <div className="m-auto flex ml-8">
                  <button onClick={() => handleAddEmployeeToTeam(employee.id,teamId)}>
                  <AiOutlineUsergroupAdd className='text-2xl ml-2'/>
                  </button>
                  <Dialog>
                      <DialogTrigger>
                  <FiBriefcase className='text-2xl ml-2' />
                  </DialogTrigger>
                    <ModalAddSkills firstname={employee.firstname.toString()} lastname={employee.lastname.toString()}  id={employee.id} name={""}/>
                  </Dialog>
                  <button onClick={() => handleEditEmployeeClick(employee.id)}>
                    <Dialog>
                      <DialogTrigger>
                  <BsPencil className='text-2xl ml-2' />
                    </DialogTrigger>
                    <ModalEditEmployee  employeeId={employee.id} onUpdateEmployee={handleUpdateEmployee}/>
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