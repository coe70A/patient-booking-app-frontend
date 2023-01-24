/* eslint-disable react/prop-types */
import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react'

import MainPage from './components/mainPage/MainPage'

// Encapsulate your components that require auth with this
const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args)
  return <Component />
}

// Lets user's navigate back to where they left off after authenticating
const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  )
}

function App () {
  return (
    <div className="App">
        <Router>
          {/* TODO: Add these vars in a config file */}
          <Auth0ProviderWithRedirectCallback
            domain='dev-musip85d.us.auth0.com'
            clientId='A38rLwbbBcetjaBQR9lsey888fmQwfny'
            redirectUri={window.location.origin}
          >
            <Routes>
              <Route exact path="/" element={<ProtectedRoute component={MainPage} />} />
            </Routes>
          </Auth0ProviderWithRedirectCallback>
        </Router>
    </div>
  )
}

export default App
