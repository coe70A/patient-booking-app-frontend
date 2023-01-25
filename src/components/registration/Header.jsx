import React from 'react'
import Typed from "react-typed";
import "./regestration.css"
function Header(props) {
  return (
    <div id="home" className="main-header">
      <h1 className="who_am_i" style={{color: 'white'}}> WELCOME {props.user?.name?.toUpperCase()}</h1>
      <Typed
        className ="typed_text" 
        style={{color:'White'}}
        strings={[
            "Patient Appointment Booking App(PAA)",
            "Fast & Easy Online Booking",
            "Simple Scheduling",
            "30 000 users love our App",
            "",]}
            typeSpeed={40}
            backSpeed={50}
            loop
      />
    </div>
  )
}

export default Header
