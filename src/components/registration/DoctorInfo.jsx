import React, {useEffect, useState, useRef} from 'react'
import "./regestration.css"
import { FaStethoscope } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";
import { Calendar } from 'primereact/calendar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function DoctorInfo(props) {
    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: "AIzaSyDBg83-05jKeRrmQ6LqDtNI3AM_Dmsm5rI",
        onPlaceSelected: (place) => console.log(place),
      });
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState();
    
    const [email, setEmail] = useState(props.user?.email)
    const [clinicName, setClinicName] = useState(props.regData !== null? props.regData?.clinic_id : null)
    const [street, setStreet] = useState(props.regData?.street_name)
    const [postal, setPostal] = useState(props.regData?.postal_code)
    const [phoneNum, setPhoneNum] = useState(props.regData?.phone)
    const [submit, setSubmit] = useState(false)
    const [tmp_data, setTmp_data] = useState();
    const [isError, setIsError] = useState(false)


    const [em, setEm] = useState(); // This is just to test
    
    
    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    useEffect(() => {
      console.log(props.regData)
    })

    useEffect(() => {
      if(clinicName !== null && street !== null && postal !== null && phoneNum !== null)
        setSubmit(true)
      else
        setSubmit(false)
    },[clinicName,street,phoneNum,postal])

    const registerDoctor = async () => {
      const reqBody = {
        "email": email,
        "first_name": props.user?.name,
        "last_name": props.user?.name,
        "phone": phoneNum,
        "birthday": "09/01/2023",
        "clinic": {
          "name": clinicName,
          "postal_code": postal,
          "province": "ON", // TODO: Add province and city
          "city": "Toronto",
          "country": "CA",
          "street_number": "123",
          "street_name": street
        }
      }    
      setTmp_data(reqBody)
      const req = await axios.post(`https://patientbooking.azurewebsites.net/api/doctor/register`, reqBody)

      if (req.status === 200) {
        sessionStorage.setItem("doctor_id", req.data.doctor_id);
        sessionStorage.setItem("regInfo", JSON.stringify(tmp_data))
        sessionStorage.getItem("regInfo")
        console.log('Succesfully registered doctor... Navigating to main page')
        // history.push('/MainPage?var1=value1&var2=value2');
        navigate(`/MainPage`)
      }
      
      console.log('Request failed')
      setIsError(true)
    }
    
    
    
  return (
    <div className={props.css_style} id ="doctor-info">
        <div style={{textAlign: "center"}}>
            <h1>Doctor Information <FaStethoscope /> </h1> 
        </div>
        <Form onSubmit={(event) => event.preventDefault()}>
        <fieldset disabled = {props.doctorSignUp ? false : true}>
        <div className="inner_patient_container"  >
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder={props.user?.email} value={em} onChange={(e) => setEm(e.target.value)} disabled={false}/>
        </Form.Group>
      

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number: *</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)}/>
        </Form.Group>
      </div>

      <div className="inner_patient_container" >
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginRight: '3rem'}}>
                <Form.Label>Clinic Name: *</Form.Label>
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
                <Form.Control ref={bootstrapRef} />
            </Form.Group>
            </div>

            <label>Date of Birth: *</label>
        <div class="p-inputgroup">
        <Calendar value={date} onChange={(e) => setDate(e.value)} disabled={!props.doctorSignUp}></Calendar>
        </div>



        <Button variant="primary" type="submit" disabled={!submit} onClick={() => submit ? registerDoctor(): null}>
        Submit
        </Button>

        {isError ? 'Encountered error logging in' : null}

      </fieldset>
      </Form>
      
    </div>
  )
}

export default DoctorInfo
