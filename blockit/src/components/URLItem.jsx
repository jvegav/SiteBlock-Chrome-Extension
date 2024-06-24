import React from 'react'

const URLItem = ({id, url, keyUnique, deleteURL}) => {
  return (
    <li className='text-sm font-bold mt-2' key={keyUnique}>
            {url}
            <button className='button-delete' onClick={() => deleteURL(id)}>
               DELETE
            </button>
    </li>
  )
}

export default URLItem