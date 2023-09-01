import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

const Buttons = () => {
  return (
    <div className='ml-5'>
      <Dialog>
    <div className='mb-3'>
    <DialogTrigger asChild>
      <Button size="lg" variant="yellow">Ajouter employé <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </DialogTrigger>
      </div>
      <div>
      <Button size="lg" variant="yellow">Ajouter des compétences <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Employers</h3>
        </div>
        </div>
  )
}

export default Buttons