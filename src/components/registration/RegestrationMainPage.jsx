/* eslint-disable */
import React, {useState, useEffect} from 'react'
import Particles from "react-tsparticles";
import Header from './Header';
import NavBar from './NavBar';
import CompleteSignUp from './CompleteSignUp';
import PatientInfo from './PatientInfo';
import DoctorInfo from './DoctorInfo';
import { loadFull } from "tsparticles";
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RegestrationMainPage() {
    const [doctorSignUp, setDctorSignUp] = useState(false)
    const [userSignUp, setUserSignUp] = useState(false)
    const [isPatientDoc, setIsPatientDoc] = useState(false)
    const { user, logout } = useAuth0()
    const navigate = useNavigate()
    

    useEffect(() => {
      const fetchTasks = async() => {
      const doc_pat = await axios.get(`https://patientbooking.azurewebsites.net/api/user/${user?.email}`);
  
        return doc_pat.data;
      }
      fetchTasks()
      .then(data => {
        console.log("INSIDE THEN")
        console.log(data)
        setIsPatientDoc(data)
        data?.is_patient ? navigate('/PatientMainPage') : navigate('/MainPage')})
      .catch(err => setIsPatientDoc("err"))
     

    }, [])

    const particlesInit = async (main) => {
        await loadFull(main);
      };
  return (
    <div>
        <NavBar />
        <Header  user = {user}/>
        <Particles 
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#212529",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              resize: true,
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffff5f",
              distance: 150,
              enable: true,
              opacity: 0.5,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
          },
        }}
      />
      <CompleteSignUp doctorSignUp={doctorSignUp} setDoctorSignUp={() => setDctorSignUp(!doctorSignUp)} userSignUp={userSignUp} setUserSignUp={() => setUserSignUp(!userSignUp)}/>
      <DoctorInfo doctorSignUp={doctorSignUp} user={user} css_style={"doctor_container"} regData={null}/>
      <PatientInfo userSignUp={userSignUp} user={user} css_style={"patient_container"}/>
    </div>
  )
}
