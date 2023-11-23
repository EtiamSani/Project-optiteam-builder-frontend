
import React from 'react'
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
  TabsContent,
} from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator'
import { PiSignInBold } from 'react-icons/pi'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Checkbox } from '@/components/ui/checkbox'

const clientId: string = process.env.OAUTH_GOOGLE_ID
const SigninForm = ({userData, handleUserInputChange,handleLogin,handleGoogleLoginAndAuth}:any) => {
  return (
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
            <Checkbox id="terms"/>
            <Label htmlFor="terms" className='font-normal'>Se souvenir de moi</Label>
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
  )
}

export default SigninForm