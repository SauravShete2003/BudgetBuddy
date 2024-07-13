import React from 'react'
import './Signup.css'
function Signup() {
  return (
    <div className='signup-container'>
      <h1 className='signup-heading'>User Registration</h1>
      <form className='signup-from'>
        <input 
        type='text'
        placeholder='Enter Name'
        className='input-box'
        />
        <input
        type='text'
        placeholder='Enter Email'
         className='input-box'
        />
        <input
        type='password'
        placeholder='Enter Password'
        className='input-box'
        />
       <input
        type='text'
        placeholder='Address'
        className='input-box'
        />
        <button type='button'>Register</button>
      </form>
    </div>
  )
}

export default Signup
