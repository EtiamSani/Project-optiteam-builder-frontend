import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleSubmit } from '@/utils'
import React, { useState } from 'react'
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

const Modal = () => {

      
    const [employeeData, setEmployeeData] = useState({
        lastname: "",
        firstname: "",
        job: "",
        personality:"",
        teamId: 1
        
      });

      const handleInputChange = (e: { target: { id: any; value: any } }) => {
        const { id, value } = e.target;
        setEmployeeData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

      const handlePersonalityChange = (selectedPersonality: any) => {
        console.log('Clicked on personality:', selectedPersonality);
        setEmployeeData((prevState) => ({
          ...prevState,
          personality: selectedPersonality,
        }));
      };

      const selectItems = [
        { value: 'extravertie', label: 'Extravertie' },
        { value: 'introverti', label: 'Introverti' },
        { value: 'ambiverti', label: 'Ambiverti' },
      ];


  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un employé</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
          <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Photo</Label>
      <Input id="picture" type="file" />
    </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input id="lastname" value={employeeData.lastname} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Prénom
            </Label>      
            <Input id="firstname" value={employeeData.firstname} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="job" className="text-right">
              Métier
            </Label>
            <Input id="job" value={employeeData.job} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div>
            <Select onValueChange={handlePersonalityChange}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="La personnalité" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
                ))}
                </SelectGroup>
                </SelectContent>
            </Select>
            </div>
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow" onClick={(e) => handleSubmit(employeeData , e)}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default Modal