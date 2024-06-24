import React from 'react'
import URLItem from './URLItem'

export default function List({tabs,deleteURL}) {

  return ( <>
    <p className="text-lg font-bold font-mono pb-3 justify-items-start text-center">
    List of URL's
    </p>
    <ul className='list-disc font-mono' >
        {tabs.length === 0 && "No Hay URLS"}
        {tabs.map((tab) => (
          <URLItem
          id={tab.id}
          url={tab.url}
          keyUnique={tab.id}
          deleteURL={deleteURL}/>

        ))}
      </ul>
      </>
  )
}

