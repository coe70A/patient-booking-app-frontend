/* eslint-disable */
import React, { useState } from 'react'
import TaskView from './tasksFolder/TaskView'
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'
import AboutView from './AboutSection/AboutView'
import TodayView from './TodayTasks/TodayView'
import SearchedTaksView from './SearchedTasks/SearchedTasksView'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import CalendarView from './CalendarView'
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

function MainPage (props) {
  const [option, setOption] = useState();
  const [options, setOptions] = useState({ all: true, completed: false, error: false, today: false, calendarView: false})
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useAuth0()
  const [wether, setWether] = useState([]); // prevents multiple renders of the weather class
  const [searchedResult, setSearchedResult] = useState('')
  const [doctoId, setDoctorId] = useState();
  const [doctorInfo, SetDoctorInfo] = useState();
  // const params = new URLSearchParams(props.location.search);
  // const var1 = params.get('doctor_id');

  // console.log("DOCTOR: ", var1)


// console.log({var1})
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
    console.log(doctoId)
    const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);

    console.log("APPT")
    console.log(taskResp.data?.appointments)
    setTasks(taskResp.data?.appointments)
  }

  // Delete Task
  const deleteTask = async (id) => {
   
  }


  const completeTask =  async (id, isComplete) => {
  
  }

  // useEffect(() => {
  
  //   const fetchTasks = async() => {
  //   const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);

  //     console.log("TASK RESP")
  //     console.log(taskResp.data?.appointments)



  //   return taskResp.data?.appointments;
  //   }
  //   fetchTasks()
  //   .then(data => {
  //     console.log("check 2")
  //     console.log(data)
  //     setTasks(data)})
  //   // .catch(err => setTasks("err"))
  //   setIsLoading(false)

  //   setTasks([])
    
  // }, [])


  useEffect(() => {
   
    const fetchTasks = async() => {
      const DoctorInfo = await axios.get(`http://localhost:5000/api/user/${user.email}`);
    

      const doctoId = DoctorInfo?.data.data?.doctor_id;
      console.log(doctoId)
      SetDoctorInfo(DoctorInfo.data)
      console.log("DOCO ID");
      
      setDoctorId(doctoId)
      const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doctoId}/appointment`);

      console.log("APPT")
      console.log(taskResp.data?.appointments)
      setTasks(taskResp.data?.appointments)
      

      return taskResp.data?.appointments;
    }
    fetchTasks()
  }, [])


  return (
    <div className='mainpagecontainer'>
      <HeaderBar onSearch={onSearchResult} isPatient={false}/>
      <div className = "tasks-container">
        <SideBar options={options} changeOpt={changeOpt} searchedResult={searchedResult} isPatient={false}/>
        <div style={{flex: 1, overflow: 'auto'}}>
        {isLoading ?
        <img style={{ width: '80%', height: '80%' }} src={require('../../Images/Turtle_Loading.gif')} alt="loading-gif" /> : null }
        {(options?.all & !isLoading)? <TaskView tasks={tasks} setTasks={setTasks} getCall={getCall} deleteTask={deleteTask} completeTask={completeTask} doc_id={doctoId}/> : null}
        {/* {(options?.completed & !isLoading) ? <AboutView tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} getCall={getCall}/> : null} */}
        {(options?.today & !isLoading) ? <TodayView tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} getCall={getCall}/> : null}
        {(options?.calendarView & !isLoading) ? <CalendarView tasks={tasks} setTasks={setTasks} /> : null}
        {/* {(!options?.all & !options?.completed & !options?.today & !options?.calendarView & !isLoading) ? <SearchedTaksView searchedResult={searchedResult} tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} getCall={getCall}/>: null} */}
        </div>
        
      </div>
    </div>
  )
}


export default MainPage
