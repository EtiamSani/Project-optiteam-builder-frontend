import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { editEmployeePicture } from '@/utils'
import React from 'react'

interface ModalPictureProps {
  employeeId: number;
}

const ModalPicture = ({employeeId, onUpdateProfilePicture}: ModalPictureProps) => {
    const handlePictureChange = () => {
        const fileInput = document.getElementById('picture') as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
          
          // editEmployeePicture(file, employeeId);
          editEmployeePicture(file, employeeId).then((newProfilePictureUrl) => {
            console.log(newProfilePictureUrl)
            onUpdateProfilePicture(employeeId, newProfilePictureUrl);
          });
        }
      };
  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une photo</DialogTitle>
        </DialogHeader>
        <div>
            <Input id="picture" type="file" />
        </div>
        <DialogFooter>
        <Button type="submit" variant="yellow"  onClick={handlePictureChange}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
  )
}

export default ModalPicture