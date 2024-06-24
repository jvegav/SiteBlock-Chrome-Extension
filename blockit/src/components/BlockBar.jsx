import React from 'react'

export default function BlockBar ({blockSites, unblockSites})  {
  return (
    <div className="card pt-7">
        <button  id='myButton' className='button' onClick={() => blockSites(true)}>
          Block Sites
        </button>
        <button  id='myButton' className='button-unblock ml-3' onClick={() => unblockSites(false)}>
          Unblock Sites
        </button>
      </div>
  )
}