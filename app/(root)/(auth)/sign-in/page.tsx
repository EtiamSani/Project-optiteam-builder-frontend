"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { createTeam, googleAuth, signin, signup } from '@/utils'
import { useRouter } from 'next/navigation';
import {IoChevronForwardCircleOutline} from 'react-icons/io5'
import { Separator } from '@/components/ui/separator'
import { PiSignInBold } from 'react-icons/pi'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import PasswordValidator from '@/components/PasswordValidator'
import { Checkbox } from '@/components/ui/checkbox'



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
    // const { value, id } = e.target;
    // setUserData((prevUserData) => ({ ...prevUserData, [id]: value })); 
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
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Se souvenir de moi</Label>
          </div>
        </CardContent>
        <CardFooter className='w-full'>
          <div className='flex flex-col m-auto  items-center'>
            <div className='m-auto'>
              <Button variant="yellow" onClick={() => handleLogin(userData)}>Connecter <PiSignInBold className='text-2xl ml-2 '/></Button>
            </div>
            <div className='flex w-8 items-center justify-center'>
              <Separator className="my-4 mx-0" decorative={false} />
              <span className='m-2'>ou</span>
              <Separator className="my-4 mx-0" decorative={false} />
            </div>
            
            <div>
              <GoogleOAuthProvider clientId={clientId}> 
                    <div>
                        <GoogleLogin
                          useOneTap
                          shape='pill'
                          onSuccess={handleGoogleLoginAndAuth}
                        />
                    </div>
              </GoogleOAuthProvider>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Inscrivez-vous</CardTitle>
          {!isTeamInputVisible ? (
          <CardDescription>Commencer par donner un nom a votre équipe !</CardDescription>
            ): <CardDescription>Dites nous en plus sur vous</CardDescription>}
        </CardHeader>

        {!isTeamInputVisible && (
        <>
        <CardContent className='space-y-2'>
              <div className="space-y-1">
                <Label htmlFor="name">Nom de l'équipe</Label>
                <Input id="name" value={teamData.name} onChange={handleTeamInputChange}/>
              </div>
            </CardContent>
              <CardFooter>
                <div className='m-auto mt-2'>
                  <Button variant="yellow" onClick={() => handleTeamSubmit(teamData)}>Continuer<IoChevronForwardCircleOutline className="text-2xl ml-2"/></Button>
                </div>
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
                {/* <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={userData.password} onChange={handleUserInputChange}/> */}
                <PasswordValidator userData={userData} handleUserInputChange={handleUserInputChange} handleSignUp={handleSignUp}/>
              </div>
            </CardContent>
              <CardFooter>
                <div className='flex flex-col items-center m-auto'>
                {/* <Button variant="yellow" onClick={() => handleSignUp(userData)}> <AiOutlineMail className='mr-2 text-lg'/> S'inscrire</Button> */}
                <div className='flex items-center mr-20'>
                  <Separator className="my-4 " decorative={false} />
                  <span className='m-2'>ou</span>
                  <Separator className="my-4 " decorative={false} />
                </div>
                <GoogleOAuthProvider clientId={clientId}> 
                  <div>
                      <GoogleLogin
                        useOneTap
                        onSuccess={handleGoogleLoginAndAuth}
                        text='signup_with'
                        shape='pill'
                      />
                  </div>
                </GoogleOAuthProvider>
                </div>
              </CardFooter>
              </>
        )}
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default page