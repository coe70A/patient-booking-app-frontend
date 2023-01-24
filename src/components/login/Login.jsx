import React, { useState, useEffect } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import '../../Stylings/login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login (props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  // temp state remove status and learn how to update object state
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'pass' && !isLoading) {
      navigate('/MainPage')
    }
  }, [isLoading, status])

  const onSearch = (event) => {
    if (event.key === 'Enter') {
      if (userName === 'username' && password === 'password') {
        setIsLoading(false)
        setStatus('pass')
      } else {
        console.log('No')
      }
    }
  }
  return (
    <div className='login-background'>
      <div className="login-form-container">
        <BsPersonCircle size={80} className="user-profile-icon"/>

        <div className="field-container">
          <label htmlFor="password">Username</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
            </span>
            <InputText value={userName} placeholder='Username' name='username' onChange={(event) => setUserName(event.target.value)} />
          </div>
        </div>

        <div className='field-container'>
          <label htmlFor="password">Password</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
            </span>
            <InputText type='password' onKeyPress={onSearch} value={password} placeholder='Password' name='password' onChange={(event) => setPassword(event.target.value)}/>
          </div>
        </div>
        <div className="actions-container">
          <Button label="Log In" loading = {isLoading} />

          <Link className="login-signin" to="/signin">
              <Button label="Sign In" className='p-button-outlined' loading = {isLoading} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
