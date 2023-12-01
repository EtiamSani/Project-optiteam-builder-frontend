import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>page
        <Button>
        <Link href="/sign-in">
        Se connecter
      </Link>
        </Button>
    </div>
  )
}

export default page