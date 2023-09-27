import React from "react";
import ModalCreateTeam from "../modals/ModalCreateTeam";
import ModalAddSkills from "../modals/ModalAddSkills";
import ModalSkills from "../modals/ModalSkills";
import ModalCreateEmployee from "../modals/ModalCreateEmployee";
import ModalPicture from "../modals/ModalPicture";

//Ici la classe de base pour les modales

class Modal {
    onClose: () => void;
    constructor(onClose:()=> void) {
        this.onClose = onClose;
    }

    render(): JSX.Element {
        throw new Error ('La Méthode render doit être implémentée dans les sous-classes')
    }
}

    // Sous-classe pour la modal de création d'équipe
    class CreateTeamModal extends Modal {
    onUpdateTeamId: (id: number) => void;
  
    constructor(onClose: () => void, onUpdateTeamId: (id: number) => void) {
      super(onClose);
      this.onUpdateTeamId = onUpdateTeamId;
    }
  
    render(): JSX.Element {
      return (
        <ModalCreateTeam
        onClose={this.onClose}
        onUpdateTeamId={this.onUpdateTeamId}
      />
      );
    }
  }

  class AddSkillsModal extends Modal {
    constructor(onClose: () => void) {
      super(onClose);
    }

    render(): JSX.Element {
      return (
        <ModalSkills
        onClose={this.onClose}
      />
      );
    }
  }

  class AddEmployeeModal extends Modal {
    onAddEmployee: any;
    updateEmployeeCount: any;
    constructor(onClose: () => void, onAddEmployee: any, updateEmployeeCount: any) {
      super(onClose);
      this.onAddEmployee = onAddEmployee;
      this.updateEmployeeCount = updateEmployeeCount;
    }
  
    render(): JSX.Element {
      return (
        <ModalCreateEmployee onClose={this.onClose} onAddEmployee={this.onAddEmployee} updateEmployeeCount={this.updateEmployeeCount}/>
      );
    }
  }

  class EmployeeProfilePicture extends Modal {
    employeeId: any
    onUpdateProfilePicture: any
    constructor(onClose: () => void,employeeId: any, onUpdateProfilePicture: any ) {
      super(onClose);
      this.employeeId = employeeId
      this.onUpdateProfilePicture = onUpdateProfilePicture
    }

    render(): JSX.Element {
      return (
        <ModalPicture  employeeId={this.employeeId} onUpdateProfilePicture={this.onUpdateProfilePicture}/>
      );
    }
  }



  class ModalFactory {
    createCreateTeamModal(onUpdateTeamId: (id: number) => void): CreateTeamModal {
      return new CreateTeamModal(this.onClose, onUpdateTeamId);
    }

    createAddSkillsModal() {
      return new AddSkillsModal(this.onClose);
    }

    createAddEmployeeModal(onAddEmployee: any, setEmployeeCount: any) {
      return new AddEmployeeModal(this.onClose, onAddEmployee, setEmployeeCount)
  }

    createEmployeeProfilePicture(employeeId: any, onUpdateProfilePicture: any){
      return new EmployeeProfilePicture(this.onClose ,employeeId,onUpdateProfilePicture)
    }
}

    export default ModalFactory;

