import React, {useState, useEffect} from 'react'
import "./regestration.css"
import personIcon from "../../Images/personIcon.png"
import AppLabels from '../../helpers/AppLabels';
import Form from 'react-bootstrap/Form';
function CompleteSignUp(props) {
  const labels = AppLabels()
  useEffect(() => {
    props.doctorSignUp && props.userSignUp ? props.setUserSignUp() : null
  })
  return (
    <div className="about_container" id="sign-up">
        <div>
          <img src={personIcon} alt="person icon"/>
        </div>
        <div className="about_text">
            <h1> Complete Sign up </h1>
            <p> {labels?.REGISTRATION_PROMPT} </p>
        </div>
        <div>
          <Form>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Doctor"
              checked={props.doctorSignUp}
              onChange={() => props.setDoctorSignUp()}
            />

            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Patient"
              checked={props.userSignUp}
              onChange={() => props.setUserSignUp()}
            />
          </Form>

        </div>
    </div>
  )
}

export default CompleteSignUp
