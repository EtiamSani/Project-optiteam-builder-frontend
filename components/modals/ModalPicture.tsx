import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { editEmployeePicture } from '@/app/actions'
import React, { useState } from 'react'

interface ModalPictureProps {
  employeeId: number;
}

const ModalPicture = ({employeeId, onUpdateProfilePicture}: ModalPictureProps) => {
  const [uploadMessage, setUploadMessage] = useState(false);
    const handlePictureChange = () => {
        const fileInput = document.getElementById('picture') as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
          editEmployeePicture(file, employeeId).then((newProfilePictureUrl) => {
            console.log(newProfilePictureUrl)
            onUpdateProfilePicture(employeeId, newProfilePictureUrl);
            setUploadMessage(true)
          });
        }
      };
  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une photo</DialogTitle>
          {uploadMessage && 
      <div className='text-green-600 m-auto font-bold bg-green-300 p-2 rounded-md'> La photo à bien été mis à jour</div>}
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