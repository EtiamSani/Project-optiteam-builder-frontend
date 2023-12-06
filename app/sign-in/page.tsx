"use client"

import React, { useState } from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createTeam, googleAuth, signin, signup } from '@/app'
import { useRouter } from 'next/navigation';
import SigninForm from '@/components/signin/SigninForm'
import SignupForm from '@/components/signup/SignupForm'



const page = () => {
  const router = useRouter();
  const [isTeamInputVisible, setTeamInputVisible] = useState(false);
  const [teamData, setTeamData] = useState({
    name: "",
  });
  const [userData, setUserData] = useState({
    username:"",
    password: "",
    email:"",
    teamId: ""
  })

  const handleGoogleLoginAndAuth = async (credentialResponse: any) => {
    try {
      const googleTokenFromApi = await googleAuth(credentialResponse); // Attend que googleAuth renvoie le token

      console.log('RETURN FROM API', googleTokenFromApi);
    

      if (googleTokenFromApi) {
        router.push('/home');
      }
    } catch (error) {
      console.error('Login Failed', error);
    }
  }
  

  const handleTeamSubmit = (teamData : any) => {
    setTeamInputVisible(true);
    console.log(teamData)
    handleSaveTeam(teamData)
  }

  const handleTeamInputChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setTeamData(value)
  };

  const handleUserInputChange = (e: { target: { value: string; id: string } }) => {
    const { value, id } = e.target;
  // Créez un nouvel objet userData avec le champ "password" mis à jour
  setUserData((prevUserData) => ({
    ...prevUserData,
    [id]: value,
    password: id === 'password' ? value : prevUserData.password,
  }));
  };

  const handleSaveTeam = async (teamData: any) => {
    try {
      const response = await createTeam(teamData); 
      if (response && response.id) {
        const teamId = response.id;
        localStorage.setItem('teamId', teamId); 
        setUserData({ ...userData, teamId })

      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleSignUp = async (userData : any ) => {
    try {
      console.log(userData)
      const response = await signup(userData);
      console.log(userData)
    } catch (error) {
      console.error('Error signup:', error);
    }
  }
  
  const handleLogin = async (userData :any) => {
    try{
      const response = await signin(userData)  
    if (response.acces_token) {
      console.log('Router useEffect')
      router.push('/home');
    }
      
    }catch(error) {
      console.error('Error login:', error);
    }
  }

  const clientId: string = process.env.OAUTH_GOOGLE_ID
  return (
    <Tabs defaultValue="account" className="w-[400px] mx-auto mt-[150px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="account">Connexion</TabsTrigger>
      <TabsTrigger value="password">Inscription</TabsTrigger>
    </TabsList>
    <SigninForm userData={userData} handleUserInputChange={handleUserInputChange} handleLogin={handleLogin} handleGoogleLoginAndAuth={handleGoogleLoginAndAuth} />
    <SignupForm isTeamInputVisible={isTeamInputVisible} teamData={teamData} handleTeamInputChange={handleTeamInputChange} handleTeamSubmit={handleTeamSubmit} userData={userData} handleUserInputChange={handleUserInputChange} handleGoogleLoginAndAuth={handleGoogleLoginAndAuth} handleSignUp={handleSignUp} clientId={clientId}/>
  </Tabs>
  )
}

export default page