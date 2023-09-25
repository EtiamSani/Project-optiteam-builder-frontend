

export function calculatePersonalityCounts(teamWithEmployees: any[]) {
    let extravertsCount = 0;
    let introvertsCount = 0;
  
    teamWithEmployees.forEach((emp) => {
      if (emp.employee.personality === 'extravertie') {
        extravertsCount++;
      } else if (emp.employee.personality === 'introvertie') {
        introvertsCount++;
      }
    });
  
    return { extravertsCount, introvertsCount };
  }
  
  export function getMessage(extravertsCount: number, introvertsCount: number, totalEmployees: number) {
    if (extravertsCount > totalEmployees / 2) {
      return 'Trop d\'extravertis dans l\'équipe';
    } else if (introvertsCount > totalEmployees / 2) {
      return 'Trop d\'introvertis dans l\'équipe';
    } else if (totalEmployees === 0) {
      return 'Vous n\'avez pas d\'employés dans votre équipe';
    } else {
      return 'Équilibre entre extravertis et introvertis dans l\'équipe';
    }
  }
  