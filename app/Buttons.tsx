import { Button } from '@/components/ui/button'
import { Dialog,DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Modal from './Modal'
import ModalSkills from './ModalSkills'

const Buttons = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSkillsOpen, setIsModalSkillsOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalSkillsOpen(false);
  };
  
  return (
    <div className="ml-5">
      <Dialog>
        <div className="mb-3">
          <DialogTrigger asChild>
            <Button size="lg" variant="yellow" onClick={() => setIsModalOpen(true)}>
              Ajouter employé <IoIosAddCircleOutline className="text-2xl ml-2" />
            </Button>
          </DialogTrigger>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
      </Dialog>
      <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="yellow" onClick={() => setIsModalSkillsOpen(true)}>
              Ajouter des compétences <IoIosAddCircleOutline className="text-2xl ml-2" />
            </Button>
          </DialogTrigger>
        {isModalSkillsOpen && <ModalSkills onClose={function (): void {
          throw new Error('Function not implemented.')
        } }/>}
        </Dialog>
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Employers</h3>
      </div>
    </div>
  );
};

export default Buttons