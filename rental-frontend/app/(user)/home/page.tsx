import RoomCard from '@/components/room-card'
import axios from 'axios'
import React from 'react'

const UserHome =async () => {
    const {data}  = await axios.get('http://localhost:8080/rooms')
  return (
    <div className='flex flex-col gap-2 m-4 bg-pink-50 rounded-md'>   
        {data.map((item,id)=>{
            return (
                <RoomCard key={id} id={id} item={item}/>  
            )
        })}
    </div>
  )
}

export default UserHome