import React, {useEffect, useState, useRef} from 'react'
import "./regestration.css"
import { FaStethoscope } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";
import { Calendar } from 'primereact/calendar';
import Button from 'react-bootstrap/Button';

function DoctorInfo(props) {
    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyDBg83-05jKeRrmQ6LqDtNI3AM_Dmsm5rI",
        onPlaceSelected: (place) => console.log(place),
      });

      const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState();

    const [email, setEmail] = useState(props.user?.email)
    const [clinicName, setClinicName] = useState(null)
    const [street, setStreet] = useState(null)
    const [postal, setPostal] = useState(null)
    const [phoneNum, setPhoneNum] = useState(null)
    const [submit, setSubmit] = useState(false)
    
    
    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    useEffect(() => {
      if(clinicName && street && postal && phoneNum)
        setSubmit(true)
      else
        setSubmit(false)
    })

  return (
    <div className="doctor_container" id ="doctor-info">
        <div style={{textAlign: "center"}}>
            <h1>Doctor Information <FaStethoscope /> </h1> 
        </div>
        <Form>
        <fieldset disabled = {props.doctorSignUp ? false : true}>
        <div className="inner_patient_container"  >
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder={props.user?.email} value={email} disabled={true}/>
        </Form.Group>
      

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}/>
        </Form.Group>
      </div>

      <div className="inner_patient_container" >
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Cilinic Name: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Clinic Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)}/>
        </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Street: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Street Name" value={street} onChange={(e) => setStreet(e.target.value)}/>
        </Form.Group>
        </div>


        <div className="inner_patient_container" >
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Postal Code: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Postal Code" value={postal} onChange={(e) => setPostal(e.target.value)} />
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


        <Button variant="primary" type="submit" disabled={!submit}>
        Submit
        </Button>

      </fieldset>
      </Form>
      
    </div>
  )
}

export default DoctorInfo
