import React from 'react';
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

function MessageWithIcon({ message }) {
  let icon = null;

  switch (message) {
    case 'Trop d\'extravertis dans l\'équipe':
      icon = <FaExclamationCircle className='text-red-800' />;
      break;
    case 'Trop d\'introvertis dans l\'équipe':
      icon = <FaExclamationCircle className='text-red-800'/>;
      break;
    case 'Équilibre entre extravertis et introvertis dans l\'équipe':
      icon = <FaCheckCircle className='text-green-800'/>;
      break;
    default:
      icon = <FaInfoCircle />;
  }

  return (
    <div className="flex justify-center mt-2">
    <div className='text-2xl mx-2'>{icon}</div>
      <p>{message}</p>
    </div>
  );
}

export default MessageWithIcon;
