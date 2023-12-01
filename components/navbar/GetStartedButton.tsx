import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const GetStartedButton = () => {
  return (
    <div className='flex space-x-2'>
    <Button variant="ghost">
        <Link href="/pricing">Nos offres </Link>
    </Button>
    <Button>
        <Link href="/sign-in">Commencer ! </Link>
    </Button>
    </div>
  )
}

export default GetStartedButton