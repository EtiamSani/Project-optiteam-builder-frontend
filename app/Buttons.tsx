import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

const Buttons = () => {
  return (
    <div className='ml-5'>
    <div className='mb-3'>
      <Button size="lg" variant="yellow">Ajouter employé <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </div>
      <div>
      <Button size="lg" variant="yellow">Ajouter des compétences <IoIosAddCircleOutline className='text-2xl ml-2'/></Button>
      </div>
      <div>
        <h3 className="text-md font-bold ml-4 my-5">Employers</h3>
        </div>
        </div>
  )
}

export default Buttons