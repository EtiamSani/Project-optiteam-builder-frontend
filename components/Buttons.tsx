import { Button } from '@/components/ui/button'
import { Dialog,DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import { AiOutlineTool } from 'react-icons/ai'
import { GrGroup, GrUser } from 'react-icons/gr'
import Modal from './modals/ModalCreateEmployee'
import ModalSkills from './modals/ModalSkills'
import ModalCreateTeam from './modals/ModalCreateTeam'
import { fetchTeam } from '@/utils'

const Buttons =  ({onAddEmployee, team, onUpdateTeamId, setEmployeeCount}) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSkillsOpen, setIsModalSkillsOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalSkillsOpen(false);
  };

  const CreateTeamButton = (
    <Button size="lg" variant="yellow" onClick={() => setIsModalOpen(true)}>
      Créer une équipe <GrGroup className="text-2xl ml-2" />
    </Button>
  );
  
  const DisabledCreateTeamButton = (
    <Button size="lg" variant="red" onClick={() => setIsModalOpen(true)}  className='cursor-not-allowed' disabled>
      Créer une équipe <GrGroup className="text-2xl ml-2" />
    </Button>
  );
  
  const buttonToRender = team ? DisabledCreateTeamButton : CreateTeamButton;
  
  
  return (
    <div className="ml-5">

      <Dialog>
      <div className="mb-3">
      <DialogTrigger asChild>
            {buttonToRender}
            </DialogTrigger>
            {/* {isModalOpen && <ModalCreateTeam onClose={() => setIsModalOpen(false)}/>} */}
            {isModalOpen && (
  <ModalCreateTeam
    onClose={() => setIsModalOpen(false)}
    onUpdateTeamId={onUpdateTeamId} // Passez la fonction
  />
)}
            </div>
      </Dialog>

      <Dialog>
        <div className="mb-3">
          <DialogTrigger asChild>
            <Button size="lg" variant="yellow" onClick={() => setIsModalOpen(true)}>
              Ajouter employé <GrUser className="text-2xl ml-2" />
            </Button>
          </DialogTrigger>
        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onAddEmployee={onAddEmployee} setEmployeeCount={setEmployeeCount}/>}
        </div>
      </Dialog>
      <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="yellow" onClick={() => setIsModalSkillsOpen(true)}>
              Ajouter des compétences <AiOutlineTool className="text-3xl ml-2 text-black" />
            </Button>
          </DialogTrigger>
        {isModalSkillsOpen && <ModalSkills onClose={function (): void {
          throw new Error('Function not implemented.')
        } }/>}
        </Dialog>
        
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Liste des employés</h3>
      </div>
    </div>
  );
};

export default Buttons