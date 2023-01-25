import React, {useEffect, useState} from 'react'
import "./regestration.css"
import { RiSurgicalMaskFill } from 'react-icons/ri';
import Form from 'react-bootstrap/Form';
import { Calendar } from 'primereact/calendar';
function PatientInfo(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState();
    
    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
  return (
    <div className="patient_container" id ="patient-info">
        <div style={{textAlign: "center"}}>
            <h1>Patient Information <RiSurgicalMaskFill /> </h1> 
        </div>
        <Form>
        <fieldset disabled = {props.userSignUp ? false : true}>
        <div className="inner_patient_container" id ="patient-info">
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Email address: *</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cnt1">
                <Form.Label>OHIP NUMBER: *</Form.Label>
                <Form.Control type="text" placeholder="XXXX-XXX-XX" />
        </Form.Group>

      </div>
      <div className="inner_patient_container" id ="patient-info">
        <Form.Group className="mb-3" controlId="cnt2" style={{marginRight: '3rem'}}>
                <Form.Label>Doctor ID: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Doctor Id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cnt3">
                <Form.Label>Phone Number: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" />
        </Form.Group>  
    </div>
      <label>Date of Birth: *</label>
        <div class="p-inputgroup">
        <Calendar value={date} onChange={(e) => setDate(e.value)} disabled={!props.userSignUp}></Calendar>
        </div>

      </fieldset>
      </Form>
      
    </div>
  )
}

export default PatientInfo
