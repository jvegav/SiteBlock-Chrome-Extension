import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
 
  const [ tabs, setTabs] = useState([])


  useEffect(() => {
    chrome.storage.local.get(['blockedURLS'], function(result) {
      if(result.blockedURLS) {
        setTabs(result.blockedURLS)
      }
    })
  },[])


  const[newURL, setNewURL] =  useState("")





  const onClick = () => {

  }


  function addURL(event){
    event.preventDefault()
    const updatedTabs = [...tabs, {id: crypto.randomUUID(),url:newURL}]
    setTabs(updatedTabs)
    setNewURL("")


    chrome.storage.local.set({blockedURLS :updatedTabs},function(){
      chrome.runtime.sendMessage({action : "updateBlockedURLS"})
    })
  }

  const deleteURL = (id) => {

    const newTabs = tabs.filter(tab => tab.id !== id)
    setTabs(newTabs)

    chrome.storage.local.set({blockedURLS :  newTabs}, function(){
      chrome.runtime.sendMessage({action : "updateBlockedURLS"})
    })
  }


  return (
    <>
      <div className='flex justify-center'>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>


      <h1>Vite + React</h1>


      <div className="card">
        <button  id='myButton' className='button' onClick={onClick}>
          Block Sites
        </button>
      </div>



      <div className='pb-8'>
        <form id="blockForm" onSubmit={addURL}>
          <div className='pb-4'>
            <input value={newURL} type="text" id="url" onChange={e => setNewURL(e.target.value)} required className='justify-center items-center text-center rounded-lg h-10 '/>
          </div>

          <button  className = 'button-2'type="submit">Add URL</button>
        </form>
      </div>


      
      <ul id="blockedList" >
        {tabs.map((tab) => (
          <li className='text-xl font-bold mt-2' key={tab.id}>
            {tab.url}
            
            <button className='button-delete' onClick={() => deleteURL(tab.id)}>
               Delete
            </button>
            
            
          </li>

        ))}
      </ul>

    </>
  )
}

export default App
