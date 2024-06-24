import React from 'react'

export default function Blocked({blocked}) {
    if(blocked){
        return (
            <div className='pt-6'>
                <p className='text-red-700 underline text-lg font-mono text-center'>Blocked</p>
            </div>
          )
    } else {
        return (
            <div className='pt-6'>
                <p className='text-green-600 underline text-lg font-mono text-center'>Unblocked</p>
            </div>
          )
    }
  
}
