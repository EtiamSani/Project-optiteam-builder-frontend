import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
import { GrGroup, GrUser } from "react-icons/gr";
import ModalFactory from "../../modalFactory/ModalFactory";
import SearchBar from "./SearchBar";

interface ButtonGroupProps {
  onAddEmployee: () => void;
  team: boolean; 
  onUpdateTeamId: () => void; 
  updateEmployeeCount: () => void; 
}

const ButtonGroup = ({
  onAddEmployee,
  team,
  onUpdateTeamId,
  updateEmployeeCount,
}: ButtonGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSkillsOpen, setIsModalSkillsOpen] = useState(false);

  const modalFactory = new ModalFactory();

  const CreateTeamButton = (
    <Button size="lg" variant="yellow" onClick={() => setIsModalOpen(true)}>
      Créer une équipe <GrGroup className="text-2xl ml-2" />
    </Button>
  );

  const DisabledCreateTeamButton = (
    <Button
      size="lg"
      variant="red"
      onClick={() => setIsModalOpen(true)}
      className="cursor-not-allowed"
      disabled
    >
      Créer une équipe <GrGroup className="text-2xl ml-2" />
    </Button>
  );

  const buttonToRender = team ? DisabledCreateTeamButton : CreateTeamButton;

  const addEmployeeButtonWithTrigger = (
    <DialogTrigger asChild>
      <Button size="lg" variant="yellow" onClick={() => setIsModalOpen(true)}>
        Ajouter employé <GrUser className="text-2xl ml-2" />
      </Button>
    </DialogTrigger>
  );

  const addSkillsButtonWithTrigger = (
    <DialogTrigger asChild>
      <Button
        size="lg"
        variant="yellow"
        onClick={() => setIsModalSkillsOpen(true)}
      >
        Ajouter des compétences{" "}
        <AiOutlineTool className="text-3xl ml-2 text-black" />
      </Button>
    </DialogTrigger>
  );

  return (
    <div className="ml-5">
      <Dialog>
        <div className="mb-3">
          <DialogTrigger asChild>{buttonToRender}</DialogTrigger>
          {isModalOpen &&
            modalFactory.createCreateTeamModal(onUpdateTeamId).render()}
        </div>
      </Dialog>

      <Dialog>
        <div className="mb-3">
          {addEmployeeButtonWithTrigger}
          {isModalOpen &&
            modalFactory
              .createAddEmployeeModal(onAddEmployee, updateEmployeeCount)
              .render()}
        </div>
      </Dialog>

      <Dialog>
        {addSkillsButtonWithTrigger}
        {isModalSkillsOpen && modalFactory.createAddSkillsModal().render()}
      </Dialog>

      <div>
        <h3 className="text-md font-bold ml-4 my-5">Liste des employés</h3>
        <SearchBar/>
      </div>
    </div>
  );
};

export default ButtonGroup;
