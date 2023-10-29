import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsCheck2Circle } from 'react-icons/bs';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';
import { Button } from './ui/button';
import { AiOutlineMail } from 'react-icons/ai';

const PasswordValidator = ({userData, handleUserInputChange, handleSignUp}:any) => {
  const [type, setType] = useState("password");
  const [validationRules, setValidationRules] = useState([
    {
      label: "At least one lowercase letter",
      regex: /(?=.*[a-z])/,
      validated: false,
    },
    {
      label: "At least one uppercase letter",
      regex: /(?=.*[A-Z])/,
      validated: false,
    },
    { label: "At least one number", regex: /(?=.*[0-9])/, validated: false },
    {
      label: "At least one special character",
      regex: /(?=.*[!@#\$%\^&*])/,
      validated: false,
    },
    { label: "At least 8 characters", regex: /(?=.{8,})/, validated: false },
  ]);
  const [overallValidation, setOverallValidation] = useState(false);

  useEffect(() => {
    // Check if all validation rules are met
    const allValid = validationRules.every((rule) => rule.validated);
    setOverallValidation(allValid);
  }, [validationRules]);

  const handleChange = (value: string) => {
    
    const updatedValidationRules = validationRules.map((rule) => ({
      ...rule,
      validated: rule.regex.test(value),
    }));
    setValidationRules(updatedValidationRules);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="password">Mot de passe</Label>
      <div className="relative">
        <Input
          id="password"
          type={type}
          value={userData.password}
          onChange={(e) => {
            handleChange(e.target.value); 
            handleUserInputChange(e); 
          }}
        />
        <span
          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setType(type === "password" ? "text" : "password")}
        >
          {type === "password" ? <LiaEyeSlash /> : <LiaEyeSolid />}
        </span>
      </div>
      <main className="mt-4 space-y-2">
        {validationRules.map((rule, index) => (
          <div
            key={index}
            className={`flex items-center ${
              rule.validated ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="mr-2">
              {rule.validated ? <BsCheck2Circle /> : <FaRegCircleXmark />}
            </span>
            {rule.label}
          </div>
        ))}
      <div className='flex flex-col m-auto'>
      <Button
        variant={overallValidation ? "yellow" : "red"}
        onClick={() => handleSignUp(userData)}
      >
        <AiOutlineMail className="mr-2 text-lg" /> S'inscrire
      </Button>
      </div>
      </main>
    </div>
  );
};

export default PasswordValidator;
