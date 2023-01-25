import React, {useEffect, useState, useRef} from 'react'
import "./regestration.css"
import { FaStethoscope } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";
import { Calendar } from 'primereact/calendar';

function DoctorInfo(props) {
    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyDBg83-05jKeRrmQ6LqDtNI3AM_Dmsm5rI",
        onPlaceSelected: (place) => console.log(place),
      });

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
    <div className="doctor_container" id ="doctor-info">
        <div style={{textAlign: "center"}}>
            <h1>Doctor Information <FaStethoscope /> </h1> 
        </div>
        <Form>
        <fieldset disabled = {props.doctorSignUp ? false : true}>
        <div className="inner_patient_container" id ="patient-info" >
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Doctor Id: *</Form.Label>
                <Form.Control type="text" placeholder="5-digit numerical id" />
        </Form.Group>
      </div>

      <div className="inner_patient_container" id ="patient-info" >
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Cilinic Name: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Clinic Name" />
        </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Street: *</Form.Label>
                <Form.Control type="text" placeholder="Postal Codes" />
        </Form.Group>
        </div>


        <div className="inner_patient_container" id ="patient-info" >
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Postal Code: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Postal Code" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
                <Form.Label> City: * </Form.Label>
                <Form.Control type="email" ref={bootstrapRef} />
            </Form.Group>
            </div>

            <label>Date of Birth: *</label>
        <div class="p-inputgroup">
        <Calendar value={date} onChange={(e) => setDate(e.value)} disabled={!props.doctorSignUp}></Calendar>
        </div>

      </fieldset>
      </Form>
      
    </div>
  )
}

export default DoctorInfo
