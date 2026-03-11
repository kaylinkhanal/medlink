'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const RoomCard = ({item, id}) => {
    const router = useRouter()
    const handleClick = (id) => {
      router.push(`/rooms/${id}`)

    }
  return (
    <div onClick={()=> handleClick(item._id)} key={id} className='shadow-md m-4  bg-white p-2 rounded-md' >
    <img src={item.image} alt={item.title} style={{width:'200px',height:'200px'}}/>
    <h3>{item.title}</h3>

    </div>
  )
}

export default RoomCard