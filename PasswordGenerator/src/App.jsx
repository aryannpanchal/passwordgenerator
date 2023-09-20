// importing required hooks
import {  useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")
  
  
  // useRef hook
  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

      if (numberAllowed) str += "0123456789"
      if (characterAllowed) str+= "!@#$%^&*(){}?><:~`"

      for (let i = 1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(()=> {
    // highlight text once copied
    passwordRef.current?.select();
    // copy to clipboard functionality
    window.navigator.clipboard.writeText(password)
  },[password])

   
  useEffect(()=> {passwordGenerator()},[length, numberAllowed, characterAllowed, passwordGenerator])


   

  return (
    <>
   
      <h1 className=' text-4xl text-center my-12'>PASSWORD GENERATOR</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 flex text-orange-900 font-semibold'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        
        
      
        />
   
      <button 
      onClick={copyPasswordToClipboard}
      className=" outline-none bg-700 px-3 py-0.5 shrink-0 text-slate-600 sm:text-xl   font-semibold">
            copy
        </button>
        </div>
        
        <div className='sm:flex sm:justify-center sm:items-center gap-7'>
        <div className='text-center justify-center items-center'>
          <input
          type='range'
          min={4}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}

          />
          <label className='font-semibold text-center sm:items-center md:flex  text-slate-600 sm:text-xl'>Length: {length}</label>
        
        </div>
   <div className='flex gap-x-1 items-center'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev)=> !prev)}} />
            <label htmlFor="numberInput"
             className='font-semibold  text-slate-600 sm:text-xl  '>Add Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={characterAllowed}
          id="characterInput"
          onChange={() => {
            setCharacterAllowed((prev)=> !prev)}} />
            <label htmlFor="characterInput"
             className='font-semibold text-slate-600 sm:text-xl'>Add Character</label>
          </div>
        
      </div>
    
    </>
  )
}

export default App
