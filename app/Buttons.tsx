import { Button } from '@/components/ui/button'
import { Dialog,DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Modal from './Modal'

const Buttons = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
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
      {/* <Modal/> */}
      {isModalOpen && <Modal onClose={closeModal} />}
      </Dialog>
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Employers</h3>
        </div>
        </div>
  )
}

export default Buttons