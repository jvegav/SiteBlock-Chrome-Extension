import blockit_logo from './assets/logo_blockit.png'
import './App.css'
import { useEffect, useState } from 'react';

import useAlert from './hooks/useAlert';
import Alert from './components/Alert';

function App() {
 
  const [ tabs, setTabs] = useState([])

  const {alert, showAlert, hideAlert} = useAlert();

  const[newURL, setNewURL] =  useState("")


  useEffect(() => {
    chrome.storage.local.get(['blockedURLS'], function(result) {
      if(result.blockedURLS) {
        setTabs(result.blockedURLS)
      }
    })
  },[])

  function blockSites (value) {
    chrome.runtime.sendMessage({ action: "toggleBlocking",value });
    showAlert({show:true, text: 'Sites Blocked', type: 'success'})
    
    setTimeout(()=>{
      hideAlert();
    },2000)
  }

  function unblockSites (value) {
    
    chrome.runtime.sendMessage({ action: "toggleBlocking",value });
    showAlert({show:true, text: 'Sites UnBlocked', type: 'success'})
    
    setTimeout(()=>{
      hideAlert();
    },2000)
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
       
        <img src={blockit_logo} className="logo blockit w-[150px] h-[150px]" alt="BlockIt logo" />
        
      </div>


      <h1 className='font-mono'>BlockIt</h1>

      {alert.show && <Alert {...alert}/>}


      <div className="card pt-16">
        <button  id='myButton' className='button' onClick={() => blockSites(true)}>
          Block Sites
        </button>
        <button  id='myButton' className='button ml-3' onClick={() => unblockSites(false)}>
          UnBlock Sites
        </button>
      </div>



      <div className='pb-8'>
        <p className='text-sm font-mono pb-3 justify-items-start'> Write the URL ('youtube.com')</p>
        <form id="blockForm" onSubmit={addURL}>
          <div className='pb-4'>
            <input value={newURL} type="text" id="url" onChange={e => setNewURL(e.target.value)} placeholder='URL Here'required className='justify-center items-center text-center rounded-lg h-10 w-full '/>
          </div>

          <button  className = 'button-2'type="submit">Add URL</button>
        </form>
      </div>


      
      <ul className='list-disc font-mono' >
        {tabs.map((tab) => (
          <li className='text-sm font-bold mt-2' key={tab.id}>
            {tab.url}
            <button className='button-delete' onClick={() => deleteURL(tab.id)}>
               DELETE
            </button>
            
            
          </li>

        ))}
      </ul>

    </>
  )
}

export default App
