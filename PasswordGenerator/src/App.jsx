import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import Button from '../components/button';

function App() {
  const [length, setLength] = useState(7);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook, used here to reference other field whose value we want but is not connected
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed){
      str += "123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+-=[]{}|;:',.<>/?`~"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }
  ,
  [charAllowed, length, numAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()   //select karne ka effect dikhaega, jaha pe ref hai, waha pe kaam karega
    window.navigator.clipboard.writeText(password)  //bina ref ka kam kargaya, kyuki password mei same value stored hai
                                        //passwordRef.current.value   if using reference
  }, 
  [password])   //jis bhi chiz se related ho by any chance, usko dependency mei daalo

  useEffect(() => {
    passwordGenerator()
  }, 
  [length, charAllowed, numAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700'>
        <div className="flex shadow-lg rounded-sm overflow-hidden mb-4 my-3">
          <input 
          type="text"
          value={password} 
          className='outline-none w-full py-1 px-3 my-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <Button Text="Copy" onClick={copyPasswordToClipboard}/>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 px-2 py-2'>
            <input 
            type="range"
            min={5}
            max={40}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />
            <label>
              Length: {length}
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numAllowed}
            id="numInput"
            onChange={(e) => {setNumAllowed((prev) => !prev);}}   //(prev) => !prev
            />
            <label htmlFor='numnput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(e) => {setCharAllowed((prev) => !prev)}}
          />
          <label htmlFor='charAllowed'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
