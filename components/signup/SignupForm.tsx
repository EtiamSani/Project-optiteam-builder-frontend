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
import PasswordValidator from '@/components/signup/PasswordValidator'
import { Checkbox } from '@/components/ui/checkbox'

const SignupForm = ({isTeamInputVisible,teamData,handleTeamInputChange,handleTeamSubmit,userData,handleUserInputChange,handleGoogleLoginAndAuth,handleSignUp,clientId}:any) => {
  return (
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
  )
}

export default SignupForm