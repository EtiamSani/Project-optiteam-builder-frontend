"use client"

import React from 'react'
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

const page = () => {
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
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pasword">Mot de passe</Label>
            <Input id="username" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="yellow">Connecter</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Inscrivez-vous</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Pseudo</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">Nom de l'équipe</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Email</Label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Mot de passe</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="yellow">S'inscriree</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default page