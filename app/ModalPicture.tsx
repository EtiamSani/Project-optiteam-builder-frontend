import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editEmployeePicture } from '@/utils'
import React from 'react'



const ModalPicture = ({ }) => {
    const handlePictureChange = () => {
        const fileInput = document.getElementById('picture') as HTMLInputElement;
        // Récupérez le fichier sélectionné par l'utilisateur
        const file = fileInput.files?.[0];
        if (file) {
            console.log(file)
          // Vous n'avez pas besoin de stocker la photo de profil dans l'état
          // Passez simplement le fichier à la fonction handleEditEmployee lors de la soumission
          editEmployeePicture(file);
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