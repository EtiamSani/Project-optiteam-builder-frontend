"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { calculatePersonalityCounts, getMessage } from "@/utils/teamUtils";


export const HomeClientComponent = ({ teamWithEmployees}:any) => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const { extravertsCount, introvertsCount } = calculatePersonalityCounts(teamWithEmployees);
        const totalEmployees = teamWithEmployees.length;
        const newMessage = getMessage(extravertsCount, introvertsCount, totalEmployees);
        setMessage(newMessage);
        setEmployeeCount(totalEmployees);
      }, [teamWithEmployees]);
    

      return {
        employeeCount,
        message,
      };
}

