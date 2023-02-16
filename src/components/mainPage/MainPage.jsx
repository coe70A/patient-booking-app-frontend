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
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useAuth0()
  const [wether, setWether] = useState([]); // prevents multiple renders of the weather class
  const [searchedResult, setSearchedResult] = useState('')
  const [doctoId, setDoctorId] = useState();

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
    let doc_id = sessionStorage.getItem("doctor_id")
    const taskResp = await fetch(`http://localhost:5000/api/doctor/${doc_id}/appointment`);

    console.log("TASK RESP")
    console.log(taskResp.data)

    // setTasks(taskResp.data);

    // fetchTasks()
    // .then(resp => resp.json())
    // .then(data => setTasks(data))
    // .catch(err => setTasks("err"))
  }

  // Delete Task
  const deleteTask = async (id) => {
    // const res = await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' })
    // const data = await res.json()
    // if(data?.code.toString() === '200'){
    //   setTasks(tasks.filter((task) => task.id !== id ))
    // }
  }


  const completeTask =  async (id, isComplete) => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       is_completed: isComplete

  //     })
  // };
  // await fetch(`http://localhost:5000/api/tasks/${id}`, requestOptions)
  //     //.then(response => response.json())
  //     .catch(err => console.log(err))
  //     getCall()
  //     //setTasks([...tasks, {is_completed: isComplete}])
    
  }

  useEffect(() => {
    
    setDoctorId(sessionStorage.getItem("doctor_id"))
  })

  useEffect(() => {
    let doc_id = (sessionStorage.getItem("doctor_id"))
    const fetchTasks = async() => {
    const taskResp = await axios.get(`http://localhost:5000/api/doctor/${doc_id}/appointment`);

      console.log("TASK RESP")
      console.log(taskResp.data?.appointments)
      return taskResp.data?.appointments;
    }
    fetchTasks()
    .then(data => {
      console.log("INSIDE THEN")
      console.log(data)
      setTasks(data)})
    // .catch(err => setTasks("err"))
    setIsLoading(false)

    setTasks([])
  }, [])
  

  return (
    <div className='mainpagecontainer'>
      <HeaderBar onSearch={onSearchResult}/>
      <div className = "tasks-container">
        <SideBar options={options} changeOpt={changeOpt} searchedResult={searchedResult}/>
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
