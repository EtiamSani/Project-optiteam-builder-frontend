"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createTeam, signin, signup } from '@/utils'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [isTeamInputVisible, setTeamInputVisible] = useState(false);
  const [teamData, setTeamData] = useState({
    name: "",
  });
  const [userData, setUserData] = useState({
    username:"",
    password: "",
    email:""
  })

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
    setUserData((prevUserData) => ({ ...prevUserData, [id]: value })); // Conservez les autres valeurs dans userData
  };

  const handleSaveTeam = async (teamData: any) => {
    try {
      const response = await createTeam(teamData); 
      if (response && response.id) {
        const teamId = response.id;
        localStorage.setItem('teamId', teamId); 
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleSignUp = async (userData : any ) => {
    try {
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
 
  return (
    <Tabs defaultValue="account" className="w-[400px] mx-auto mt-[150px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="account">Connexion</TabsTrigger>
      <TabsTrigger value="password">Inscription</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Te revoilà !</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={userData.email} onChange={handleUserInputChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" >Mot de passe</Label>
            <Input id="password" type="password" value={userData.password} onChange={handleUserInputChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="yellow" onClick={() => handleLogin(userData)}>Connecter</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Inscrivez-vous</CardTitle>
        </CardHeader>

        {!isTeamInputVisible && (
        <>
        <CardContent className='space-y-2'>
              <div className="space-y-1">
                <Label htmlFor="name">Nom de l'équipe</Label>
                <Input id="name" value={teamData.name} onChange={handleTeamInputChange}/>
              </div>
            </CardContent><CardFooter>
                <Button variant="yellow" onClick={() => handleTeamSubmit(teamData)}>Valider</Button>
              </CardFooter>
              </>
        )}
        {isTeamInputVisible && (

        <>
        <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Pseudo</Label>
                <Input id="username" value={userData.username} onChange={handleUserInputChange}/>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData.email} onChange={handleUserInputChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={userData.password} onChange={handleUserInputChange}/>
              </div>
            </CardContent>
              <CardFooter>
                <Button variant="yellow" onClick={() => handleSignUp(userData)}>S'inscriree</Button>
              </CardFooter>
              </>
        )}
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default page