import React, {useEffect, useState} from 'react'
import "./regestration.css"
import { RiSurgicalMaskFill } from 'react-icons/ri';
import Form from 'react-bootstrap/Form';
import { Calendar } from 'primereact/calendar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function PatientInfo(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(null);

    const [email, setEmail] = useState(props.user?.email)
    const [ohipNum, setOhipNum] = useState(null)
    const [doctorId, setDoctorId] = useState("41821634-df00-47fd-bb8a-e9cf5c45ad92")
    const [submit, setSubmit] = useState(false)
    const [phoneNum, setPhoneNum] = useState(null)

    const [isError, setIsError] = useState(false);
    const navigate = useNavigate()
    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    useEffect(() => {
      if(ohipNum !== null && doctorId !== null && phoneNum !== null && date !== null)
        setSubmit(true) //submit button activated
      else
        setSubmit(false)
    })

  const registerPatient = async () => {
    const reqBody = {
      "email": email,
      "first_name": props.user?.name,
      "last_name": props.user?.name,
      "phone": phoneNum,
      "birthday": "09/01/2023", // TODO: Add birthday
      "ohip_number": ohipNum,
      "doctor_id": doctorId
    }  

    const req = await axios.post(`http://localhost:5000/api/patient/register`, reqBody)

    if (req.status === 200) {
      console.log(req)
      sessionStorage.setItem("patient_doctor_id", req.data.doctor_id);
      console.log('Succesfully registered patient... Navigating to main page')
      navigate('/PatientMainPage')
    }
    
    console.log('Request failed')
    setIsError(true)
  }

  
  return (
    <div className={props.css_style} >
        <div style={{textAlign: "center"}}>
            <h1>Patient Information <RiSurgicalMaskFill /> </h1> 
        </div>
        <Form onSubmit={(event) => event.preventDefault()}>
        <fieldset disabled = {props.userSignUp ? false : true}>
        <div className="inner_patient_container" id ="patient-info">
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}} >
                <Form.Label>Email address: *</Form.Label>
                {/* <Form.Control type="email" value={email} placeholder={email} disabled={flase}/>  */}
                <Form.Control type="email" value={email} placeholder={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cnt1">
                <Form.Label>OHIP NUMBER: *</Form.Label>
                <Form.Control type="text" placeholder="XXXX-XXX-XX" value={ohipNum} onChange={(e) => setOhipNum(e.target.value)}/>
        </Form.Group>

      </div>
      <div className="inner_patient_container" >
        <Form.Group className="mb-3" controlId="cnt2" style={{marginRight: '3rem'}}>
                <Form.Label>Doctor ID: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Doctor Id" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cnt3">
                <Form.Label>Phone Number: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" value={phoneNum} onChange={(e) => {setPhoneNum(e.target.value)}}/>
        </Form.Group>  
    </div>
      <label>Date of Birth: *</label>
        <div class="p-inputgroup">
        <Calendar value={date} onChange={(e) => setDate(e.value)} disabled={!props.userSignUp}></Calendar>
        </div>

        <Button variant="primary" type="submit" disabled={!submit} onClick={() => registerPatient()}>
          Submit
        </Button>

        {isError ? 'Encountered error logging in' : null}

      </fieldset>
      </Form>

    </div>
  )
}

export default PatientInfo
