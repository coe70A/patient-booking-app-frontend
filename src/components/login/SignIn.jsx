import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import '../../Stylings/login.css'
import { Link } from 'react-router-dom'

function SignIn (props) {
  return (
        <div className='login-background'>
          <div className="login-container">
            <BsPersonCircle size={80} style={{ marginBottom: '30px', marginTop: '40px' }}/>

            <div className="field-container">
              <p style={{ marginBottom: '10px', marginRight: '140px' }}>Name: </p>
              <BsPersonCircle size={20}/>
              <input type='text' name='name' placeholder='Name'/>
            </div>

            <div className="field-container">
            <p style={{ marginBottom: '10px', marginRight: '140px' }}>Userame: </p>
              <BsPersonCircle size={20}/>
              <input type='text' name='username' placeholder='Username'/>
            </div>

            <div className='field-container'>
              <p style={{ marginBottom: '10px', marginRight: '140px' }}>Password: </p>
              <FaLock size={20} />
              <input type='password' name='username' placeholder="Password"/>
            </div>

            <div>
              <Link className="login-signin" to="/" >log in</Link>
            </div>

          </div>
        </div>
  )
}

export default SignIn
