import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';

function App() {
 
  const [ tabs, setTabs] = useState(['https://youtube.com'])

  function changeInfo(tab)  {
        if (tab) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id},
                
                func: () => {
                  document.body.innerHTML = `<div id = "principal">
              <h1> No puedes entrar lo siento ve a estudiar </h1>
          </div>`;
                  
                }
            });
        } else {
            console.error('No active tab found');
        }
};

const onClick = () => {

}


const onSumbit = (event) => {
    event.preventDefault()
    const url = event.target.url.value 
    if(url) {
      setTabs(prevTabs => [...prevTabs,url])
      event.target.url.value
    }
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
        <button  id='myButton' onClick={onClick}>
          Block Sites
        </button>
      </div>
      <div className='pb-8'>
        <form id="blockForm" onSubmit={onSumbit}>
          <div className='pb-4'>
          <input type="text" id="url" placeholder="Enter URL to block" required className='justify-center items-center text-center rounded-lg h-10 '/>
          </div>
          <button  className = 'button-2'type="submit">Add URL</button>
        </form>
      </div>
      
      <ul id="blockedList" >
        {tabs.map((tab, index) => (
          <li className='text-xl font-bold' key={index}>{tab}</li>
        ))}
      </ul>

    </>
  )
}

export default App
