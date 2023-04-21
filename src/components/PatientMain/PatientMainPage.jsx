/* eslint-disable */
import React, { useState } from 'react'
import TaskView from './tasksFolder/TaskView'
import HeaderBar from './HeaderBar'

// import AboutView from './AboutSection/AboutView'
// import SearchedTaksView from './SearchedTasks/SearchedTasksView'
import TodayView from '../mainPage/TodayTasks/TodayView'
import SideBar from '../mainPage/SideBar'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import CalendarView from '../mainPage/CalendarView'
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

function PatientMainPage (props) {
  const [option, setOption] = useState();
  const [options, setOptions] = useState({ all: true, completed: false, error: false, today: false, calendarView: false})
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState({});
  const { user, logout } = useAuth0()
  const [searchedResult, setSearchedResult] = useState('')
  const [doctoId, setDoctorId] = useState();
  const [patientInfo, SetPatientInfo] = useState(null);
  const [patientAppt, setPatientAppt] = useState(null);

  const onSearchResult = (result) => {
    setSearchedResult(result)
    if (result){
      const placeholder = options;
      Object.keys(placeholder).forEach(menu => {
        placeholder[menu] = false
      })
      setOptions({...placeholder})
    }
  }

  const changeOpt = (opt) => {
    const placeholder = options;
    Object.keys(placeholder).forEach(key => {
      if (opt === key) {
        placeholder[key] = true
      } else {
        placeholder[key] = false
      }
    })
    setOptions({...placeholder});
  }

  //API calls used by all classes

  const getCall = async() => {
    console.log("Hdsfdsdsf")
    const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);
    setTasks(taskResp.data?.appointments)

    const patientInfoReq = await axios.get(`http://localhost:5000/api/user/${user.email}`);
    console.log(patientInfoReq?.data?.data?.ohip_number)
    console.log(patientInfoReq?.data?.data)
    console.log(`http://localhost:5000/api/patient/${patientInfoReq?.data?.data?.ohip_number}/appointment`)
    
    const patientAppointment = await axios.get(`http://localhost:5000/api/patient/${patientInfoReq?.data?.data?.ohip_number}/appointment`)
      setPatientAppt(patientAppointment.data?.appointments)

    console.log("APPT")
    console.log(taskResp.data?.appointments)
    
    
  }


  useEffect(() => {
  
    const fetchTasks = async() => {
    const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);

      console.log("TASK RESP")
      console.log(taskResp.data?.appointments)


    const patientAppointment = await axios.get(`http://localhost:5000/api/patient/${patientInfo?.ohip_number}/appointment`)
      setPatientAppt(patientAppointment.data?.appointments)

    return taskResp.data?.appointments;
    }
    fetchTasks()
    .then(data => {
      console.log("check 2")
      console.log(data)
      setTasks(data)})
    // .catch(err => setTasks("err"))
    setIsLoading(false)

    setTasks([])
    
  }, [])
  
//Get Patient Info


  useEffect(() => {
   
    const fetchTasks = async() => {
      const patientInfo = await axios.get(`http://localhost:5000/api/user/${user.email}`);
    
      console.log(patientInfo.data)

      const doctoId = patientInfo?.data.data?.doctor_id;
      const OHIP = patientInfo?.data.data?.ohip_number
      SetPatientInfo(patientInfo.data)
      console.log("DOCO ID");
      
      setDoctorId(doctoId)
      const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);

      console.log("APPT")
      console.log(taskResp.data?.appointments)
      setTasks(taskResp.data?.appointments)
      
      const patientAppointment = await axios.get(`http://localhost:5000/api/patient/${OHIP}/appointment`)
      setPatientAppt(patientAppointment.data?.appointments)

      return patientInfo.data;
    }
    fetchTasks()
    // .then(data => {
    //   console.log("Test123")
    //   SetPatientInfo(data)
    //   }
    //   )
    
 
  }, [])

  const deleteTask = async (id) => {
    
  }


  const completeTask =  async (id, isComplete) => {

    
  }

  return (
    <div className='mainpagecontainer'>
      <HeaderBar onSearch={onSearchResult}/>
      <div className = "tasks-container">
        <SideBar options={options} changeOpt={changeOpt} searchedResult={searchedResult} isPatient={true}/>
        <div style={{flex: 1, overflow: 'auto'}}>
        {/* {isLoading ?
        <img style={{ width: '80%', height: '80%' }} src={require('../../Images/Turtle_Loading.gif')} alt="loading-gif" /> : null } */}
        {(options?.all & !isLoading)? <TaskView tasks={patientAppt} setTasks={setPatientAppt} getCall={getCall} deleteTask={deleteTask} completeTask={completeTask} doc_id={doctoId} patientInfo={patientInfo}/> : null}
        {(options?.calendarView & !isLoading) ? <CalendarView tasks={tasks} setTasks={setTasks} /> : null}
        </div>
        
      </div>
    </div>
  )
}


export default PatientMainPage
